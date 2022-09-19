import React, {ReactNode, useContext, useState} from 'react';
import block from 'bem-cn-lite';

import {Icon, Button} from '@yandex-cloud/uikit';
import {YCSelect} from '@yandex-data-ui/common';

import {Search} from '../../../Search/Search';

import {CustomSwitcher} from '../CustomSwitcher/CustomSwitcher';

// import {setBlogQueryParams} from 'units/blog/utils'; TODO query

import {RouterContext} from '../../../../contexts/RouterContext';

import {BlogMetrikaGoalIds} from '../../../../constants';
import metrika from '../../../../counters/metrika.js';
import {MetrikaCounter} from '../../../../counters/utils';

import {Save} from '../../../../icons/Save';

import {i18, BlogKeyset} from '../../../../i18n';

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
    setQuery?: any;
};

const ICON_SIZE = 16;

export const Controls: React.FC<ControlsProps> = ({
    setIsFetching,
    tags = [],
    services = [],
    setQuery,
}) => {
    const router = useContext(RouterContext);

    const {
        savedOnly: savedOnlyInitial,
        search: searchInitial,
        tags: tagInitial,
        services: servicesInitial,
    } = router?.query || {};

    const [savedOnly, setSavedOnly] = useState<boolean>(savedOnlyInitial === 'true');
    const [search, setSearch] = useState<string>(searchInitial as string);

    const handleSavedOnly = () => {
        setQuery('savedOnly', savedOnly ? undefined : 'true');
        setSavedOnly(!savedOnly);
        setIsFetching(true);
    };

    const handleSearch = (searchValue: string) => {
        setQuery('search', searchValue);
        setSearch(searchValue);
        setIsFetching(true);
    };

    const handleTagSelect = (selectedTag: string) => {
        metrika.reachGoal(MetrikaCounter.CrossSite, BlogMetrikaGoalIds.tag, {
            theme: selectedTag,
        });
        setQuery('tags', ['empty', tagInitial].includes(selectedTag) ? undefined : selectedTag);

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
        setQuery('services', servicesAsString);
        setIsFetching(true);
    };

    const renderServicesSwitcher = () => (
        <CustomSwitcher
            initial={servicesInitial}
            defaultLabel={i18(BlogKeyset.AllServices)}
            list={services}
        />
    );

    const renderTagsSwitcher = () => (
        <CustomSwitcher initial={tagInitial} defaultLabel={i18(BlogKeyset.AllTags)} list={tags} />
    );

    return (
        <div className={b('header')}>
            <h1 className={b('header-item', {title: true})}>{i18(BlogKeyset.TitleBlog)}</h1>
            <div className={b('header-item', {filters: true})}>
                <div className={b('filter-item')}>
                    <Search
                        className={b('search')}
                        placeholder={i18(BlogKeyset.Search)}
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
                        placeholder={i18(BlogKeyset.AllTags)}
                        items={[{value: 'empty', title: i18(BlogKeyset.AllTags)}, ...tags]}
                        size="promo"
                        value={tagInitial as string}
                        onUpdate={handleTagSelect}
                        renderSwitcher={renderTagsSwitcher}
                    />
                </div>
                <div className={b('filter-item')}>
                    <YCSelect
                        className={b('select')}
                        popupClassName={b('popup')}
                        items={services}
                        type="multiple"
                        value={servicesInitial ? [...(servicesInitial as string).split(',')] : []}
                        size="promo"
                        renderSwitcher={renderServicesSwitcher}
                        showSelectAll={true}
                        onUpdate={handleServicesSelect}
                    />
                </div>
                <div className={b('filter-item', {'width-auto': true})}>
                    <Button
                        view={'outlined'}
                        className={b('saved-only-button', {savedOnly})}
                        size="xl"
                        onClick={handleSavedOnly}
                    >
                        <Icon data={Save} size={ICON_SIZE} className={b('icon', {savedOnly})} />
                        {i18(BlogKeyset.ActionSavedOnly)}
                    </Button>
                </div>
            </div>
        </div>
    );
};
