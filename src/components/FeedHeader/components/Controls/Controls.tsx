import React, {ReactNode, useState, useContext, useMemo} from 'react';

import {Icon, Button} from '@gravity-ui/uikit';
import {YCSelect} from '@yandex-data-ui/common';

import {Search} from '../../../Search/Search';

import {CustomSwitcher} from '../CustomSwitcher/CustomSwitcher';

import {LikesContext} from '../../../../contexts/LikesContext';

import {BlogMetrikaGoalIds} from '../../../../constants';
import metrika from '../../../../counters/metrika.js';
import {MetrikaCounter} from '../../../../counters/utils';

import {Save} from '../../../../icons/Save';

import {i18, Keyset} from '../../../../i18n';

import {block} from '../../../../utils/cn';

import {HandleChangeQueryParams, SetQueryType, Query} from '../../../../models/common';

import './Controls.scss';

const b = block('blog-feed-controls');

export type SelectItem = {
    title: string;
    value: string;
    icon?: ReactNode;
};

export type ControlsProps = {
    setIsFetching: (value: boolean) => void;
    tags?: SelectItem[];
    services?: SelectItem[];
    handleChangeQuery: HandleChangeQueryParams;
    queryParams: Query;
    setQuery?: SetQueryType;
};

const ICON_SIZE = 16;
const DEFAULT_PAGE = 1;

export const Controls: React.FC<ControlsProps> = ({
    setIsFetching,
    tags = [],
    services = [],
    handleChangeQuery,
    queryParams,
}) => {
    const {hasLikes} = useContext(LikesContext);

    const {
        savedOnly: savedOnlyInitial,
        search: searchInitial,
        tags: tagInitial,
        services: servicesInitial,
    } = queryParams || {};

    const [savedOnly, setSavedOnly] = useState<boolean>(savedOnlyInitial === 'true');
    const [search, setSearch] = useState<string>(searchInitial as string);

    const handleSavedOnly = () => {
        handleChangeQuery({savedOnly: savedOnly ? '' : 'true'});

        setSavedOnly(!savedOnly);
        setIsFetching(true);
    };

    const handleSearch = (searchValue: string) => {
        handleChangeQuery({search: searchValue, page: DEFAULT_PAGE});

        setSearch(searchValue);
        setIsFetching(true);
    };

    const handleTagSelect = (selectedTag: string) => {
        metrika.reachGoal(MetrikaCounter.CrossSite, BlogMetrikaGoalIds.tag, {
            theme: selectedTag,
        });

        const isEmptyTags = selectedTag === 'empty';

        handleChangeQuery({
            tags: isEmptyTags ? '' : selectedTag,
            page: DEFAULT_PAGE,
        });

        setIsFetching(true);
    };

    const handleServicesSelect = (selectedServices: string[]) => {
        const forMetrikaServices = services.filter((service) => {
            return selectedServices.includes(service.value);
        });

        const metrikaAsString = forMetrikaServices.map((service) => service.title).join(',');

        metrika.reachGoal(MetrikaCounter.CrossSite, BlogMetrikaGoalIds.service, {
            service: metrikaAsString,
        });

        const servicesAsString = selectedServices.join(',');

        handleChangeQuery({services: servicesAsString, page: DEFAULT_PAGE});

        setIsFetching(true);
    };

    const renderServicesSwitcher = () => (
        <CustomSwitcher
            initial={servicesInitial}
            defaultLabel={i18(Keyset.AllServices)}
            list={services}
        />
    );

    const renderTagsSwitcher = () => (
        <CustomSwitcher initial={tagInitial} defaultLabel={i18(Keyset.AllTags)} list={tags} />
    );

    const tagsItems = useMemo(
        () => [{value: 'empty', title: i18(Keyset.AllTags)}, ...tags],
        [tags],
    );

    const servicesItems = useMemo(
        () => (servicesInitial ? [...(servicesInitial as string).split(',')] : []),
        [servicesInitial],
    );

    return (
        <div className={b('header')}>
            <h1 className={b('header-item', {title: true})}>{i18(Keyset.TitleBlog)}</h1>
            <div className={b('header-item', {filters: true})}>
                <div className={b('filter-item')}>
                    <Search
                        className={b('search')}
                        placeholder={i18(Keyset.Search)}
                        initialValue={search && typeof search === 'string' ? search : ''}
                        onSubmit={handleSearch}
                    />
                </div>
                <div className={b('filter-item')}>
                    <YCSelect
                        className={b('select')}
                        popupClassName={b('popup')}
                        showSearch={false}
                        showItemIcon={true}
                        placeholder={i18(Keyset.AllTags)}
                        items={tagsItems}
                        size="promo"
                        value={tagInitial as string}
                        onUpdate={handleTagSelect}
                        renderSwitcher={renderTagsSwitcher}
                    />
                </div>

                {services.length > 0 ? (
                    <div className={b('filter-item')}>
                        <YCSelect
                            className={b('select')}
                            popupClassName={b('popup')}
                            items={services}
                            type="multiple"
                            value={servicesItems}
                            size="promo"
                            renderSwitcher={renderServicesSwitcher}
                            showSelectAll={true}
                            onUpdate={handleServicesSelect}
                        />
                    </div>
                ) : null}
                {hasLikes ? (
                    <div className={b('filter-item', {'width-auto': true})}>
                        <Button
                            view={'outlined'}
                            className={b('saved-only-button', {savedOnly})}
                            size="xl"
                            onClick={handleSavedOnly}
                        >
                            <Icon data={Save} size={ICON_SIZE} className={b('icon', {savedOnly})} />
                            {i18(Keyset.ActionSavedOnly)}
                        </Button>
                    </div>
                ) : null}
            </div>
        </div>
    );
};
