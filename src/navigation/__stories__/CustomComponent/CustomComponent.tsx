import React, {useRef} from 'react';

import {Popup} from '@gravity-ui/uikit';

import {Foldable, ToggleArrow} from '../../../components';
import {Col, Grid, Row} from '../../../grid';
import {NavigationDropdownItem} from '../../../models';
import {cn} from '../../../utils';
import {NavigationItemProps, NavigationLayout} from '../../models';

import {ItemListContent} from './components/ItemListContent/ItemListContent';

import './CustomComponent.scss';

const b = cn('dropdown-navigation-item');

type DCDropdownNavigationItemProps = Pick<
    NavigationItemProps,
    'onClick' | 'isActive' | 'hidePopup' | 'menuLayout'
> &
    NavigationDropdownItem;

export const CustomComponent: React.FC<DCDropdownNavigationItemProps> = (props) => {
    const {onClick, hidePopup, isActive, items, text, menuLayout} = props;
    const ref = useRef<HTMLDivElement>(null);

    return (
        <React.Fragment>
            <div ref={ref} className={b('control', {active: isActive})} onClick={onClick}>
                <span className={b('text')}>{text}</span>{' '}
                <ToggleArrow
                    className={b('arrow')}
                    type={'vertical'}
                    iconType="navigation"
                    open={isActive}
                />
            </div>
            {menuLayout === NavigationLayout.Desktop ? (
                <Popup
                    anchorRef={ref}
                    className={b('dropdown')}
                    contentClassName={b('dropdown-content-wrapper')}
                    open={isActive || false}
                    onClose={hidePopup}
                >
                    <Grid containerClass={b('dropdown-content-container')}>
                        <Row className={b('dropdown-content')}>
                            <Col>
                                <ItemListContent items={items} />
                            </Col>
                        </Row>
                    </Grid>
                </Popup>
            ) : (
                <Foldable isOpened={isActive || false}>
                    <Grid containerClass={b('foldable-content-container')}>
                        <ItemListContent items={items} mobile />
                    </Grid>
                </Foldable>
            )}
        </React.Fragment>
    );
};
