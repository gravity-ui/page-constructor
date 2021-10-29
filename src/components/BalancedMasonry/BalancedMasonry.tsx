import React, {useEffect, useState, useCallback, useRef, ReactNode, useContext} from 'react';
import _ from 'lodash';
import {block} from '../../utils';

import './BalancedMasonry.scss';
import {SSRContext} from '../../context/ssrContext';

const b = block('BalancedMasonry');

interface BalancedMasonryProps {
    className: string;
    columnClassName: string;
    children: ReactNode[];
    breakpointCols: {
        [key: number]: number;
    };
}

const BalancedMasonry: React.FC<BalancedMasonryProps> = (props) => {
    const {className, columnClassName, children = [], breakpointCols} = props;
    const {isServer} = useContext(SSRContext);
    const getCurrentColumnsCount = useCallback(() => {
        const breakpoints = Object.entries(breakpointCols).sort(
            ([firstBreakpoint], [secondBreakpoint]) => {
                return Number(secondBreakpoint) - Number(firstBreakpoint);
            },
        );

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        let [, result] = _.first(breakpoints)!;

        if (isServer) {
            return result;
        }

        for (const [rawWidth, columnCount] of breakpoints) {
            const width = Number(rawWidth);

            if (document.body.clientWidth <= width) {
                result = columnCount;
            }
        }

        return result;
    }, [breakpointCols, isServer]);

    const [columnCount, setColumnCount] = useState(getCurrentColumnsCount());
    const [columns, setColumns] = useState<React.ReactNode[][]>([]);
    const containerRef = useRef<HTMLDivElement>(null);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const balanceColumns = useCallback(
        _.debounce(() => {
            if (!containerRef.current) {
                return;
            }

            const localColumns: React.ReactNode[][] = [];
            const columnsMeta = [];

            for (let i = 0; i < columnCount; i++) {
                columnsMeta.push({id: i, height: 0});
                localColumns.push([]);
            }

            for (let i = 0; i < containerRef.current.children.length; i++) {
                const node = containerRef.current.children.item(i) as HTMLElement | null;

                if (!node) {
                    continue;
                }

                const minColumn = _.minBy(columnsMeta, 'height') || {id: 0, height: 0};
                const {id: columnId} = minColumn;

                localColumns[columnId].push(children[i]);

                minColumn.height += node.offsetHeight;
            }

            setColumns(localColumns);
        }, 300),
        [children, columnCount],
    );

    useEffect(() => {
        balanceColumns();
    }, [balanceColumns, children, columnCount]);

    useEffect(() => {
        const updateColumnCounter = () => setColumnCount(getCurrentColumnsCount());

        window.addEventListener('resize', updateColumnCounter);
        return () => window.removeEventListener('resize', updateColumnCounter);
    }, [setColumnCount, columns, getCurrentColumnsCount]);

    useEffect(() => {
        const currentRef = containerRef.current;
        const isResizeEventsSupported = 'ResizeObserver' in window;

        if (!currentRef || !isResizeEventsSupported) {
            return () => {};
        }

        const observer = new ResizeObserver(balanceColumns);

        for (let i = 0; i < currentRef.children.length; i++) {
            const node = currentRef.children.item(i) as HTMLElement | null;

            if (!node) {
                continue;
            }

            observer.observe(node);
        }

        return () => observer.disconnect();
    }, [balanceColumns, children]);

    return (
        <div className={b(null, className)}>
            <div className={b('hidden-container')} style={{width: `${100 / columnCount}%`}}>
                <div ref={containerRef} className={b('hidden-list')}>
                    {children}
                </div>
            </div>

            {columns.map((columnElements, index) => (
                <div
                    key={index}
                    className={columnClassName}
                    style={{width: `${100 / columnCount}%`}}
                >
                    {columnElements}
                </div>
            ))}
        </div>
    );
};

export default BalancedMasonry;
