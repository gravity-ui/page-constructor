import * as React from 'react';

import debounce from 'lodash/debounce';
import first from 'lodash/first';
import minBy from 'lodash/minBy';

import {SSRContext} from '../../context/ssrContext';
import {QAProps} from '../../models';
import {block, getQaAttrubutes} from '../../utils';

import './BalancedMasonry.scss';

const b = block('BalancedMasonry');

export interface BalancedMasonryProps extends QAProps {
    className: string;
    columnClassName: string;
    children: React.ReactNode[];
    breakpointCols: {
        [key: number]: number;
    };
}

const BalancedMasonry = (props: React.PropsWithChildren<BalancedMasonryProps>) => {
    const {className, columnClassName, children = [], breakpointCols, qa} = props;
    const qaAttributes = getQaAttrubutes(qa, 'column');
    const {isServer} = React.useContext(SSRContext);
    const getCurrentColumnsCount = React.useCallback(() => {
        const breakpoints = Object.entries(breakpointCols).sort(
            ([firstBreakpoint], [secondBreakpoint]) => {
                return Number(secondBreakpoint) - Number(firstBreakpoint);
            },
        );

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        let [, result] = first(breakpoints)!;

        if (isServer) {
            return result;
        }

        for (const [rawWidth, columnCount] of breakpoints) {
            const width = Number(rawWidth);

            if (document?.body.clientWidth <= width) {
                result = columnCount;
            }
        }

        return result;
    }, [breakpointCols, isServer]);

    const [columnCount, setColumnCount] = React.useState(getCurrentColumnsCount());
    const [columns, setColumns] = React.useState<React.ReactNode[][]>([]);
    const containerRef = React.useRef<HTMLDivElement>(null);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const balanceColumns = React.useCallback(
        debounce(() => {
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

                const minColumn = minBy(columnsMeta, 'height') || {id: 0, height: 0};
                const {id: columnId} = minColumn;

                localColumns[columnId].push(children[i]);

                minColumn.height += node.offsetHeight;
            }

            setColumns(localColumns);
        }, 300),
        [children, columnCount],
    );

    React.useEffect(() => {
        balanceColumns();
    }, [balanceColumns, children, columnCount]);

    React.useEffect(() => {
        const updateColumnCounter = () => setColumnCount(getCurrentColumnsCount());

        window.addEventListener('resize', updateColumnCounter, {passive: true});
        return () => window.removeEventListener('resize', updateColumnCounter);
    }, [setColumnCount, columns, getCurrentColumnsCount]);

    React.useEffect(() => {
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
        <div className={b(null, className)} data-qa={qa}>
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
                    data-qa={qaAttributes.column}
                >
                    {columnElements}
                </div>
            ))}
        </div>
    );
};

export default BalancedMasonry;
