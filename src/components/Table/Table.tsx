import React from 'react';

import {block} from '../../utils';
import {TableProps, Justify, LegendTableMarkerType, ClassNameProps} from '../../models';
import {YFMWrapper, HTML} from '../';

import './Table.scss';

const b = block('table');

export default class Table extends React.Component<TableProps & ClassNameProps> {
    render() {
        const {content, legend, marker = 'disk', className} = this.props;

        if (!content || !content.length || !content[0].length) {
            return null;
        }

        return (
            <div className={b(null, className)}>
                {this.renderTable(content, marker, legend)}
                {legend && this.renderLegend(legend, marker)}
            </div>
        );
    }

    private renderTable(content: string[][], marker: LegendTableMarkerType, legend?: string[]) {
        const justify = this.getDefaultJustify(content, this.props.justify);

        return (
            <div className={b('table')}>
                {content.map((row, i) => (
                    <div key={i} className={b('row')}>
                        {row.map((cell, j) => (
                            <div key={j} className={b('cell', {justify: justify[j]})}>
                                {legend && i && j ? (
                                    this.renderMarker(marker, cell)
                                ) : (
                                    <HTML>{cell}</HTML>
                                )}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        );
    }

    private renderMarker(type: LegendTableMarkerType, cell: string) {
        return <div className={b('marker', {type, index: String(cell)})} />;
    }

    private renderLegend(legend: string[], marker: LegendTableMarkerType) {
        return (
            <div className={b('legend')}>
                {legend.map((item, index) => (
                    <div key={item} className={b('legend-item')}>
                        {this.renderMarker(marker, String(index))}
                        <YFMWrapper
                            className={b('legent-item-text')}
                            content={item}
                            modifiers={{constructor: true}}
                        />
                    </div>
                ))}
            </div>
        );
    }

    private getDefaultJustify(content: string[][], justify?: Justify[]) {
        return justify || new Array(content[0].length).fill('center');
    }
}
