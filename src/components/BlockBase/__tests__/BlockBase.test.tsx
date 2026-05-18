import {render, screen} from '@testing-library/react';

import {testCustomClassName} from '../../../../test-utils/shared/common';
import {qaIdByDefault} from '../../../components/Anchor/Anchor';
import {GridColumnSize, IndentValue} from '../../../grid';
import {ClassNameProps} from '../../../models';
import BlockBase, {BlockBaseFullProps} from '../BlockBase';

const qa = 'block-base-component';

const indentValues: IndentValue[] = ['0', 'xs', 's', 'm', 'l', 'xl'];

type ComponentProps = React.PropsWithChildren<BlockBaseFullProps & ClassNameProps>;

describe('BlockBase', () => {
    test('render component by default', async () => {
        render(<BlockBase qa={qa} />);
        const component = screen.getByTestId(qa);

        expect(component).toBeInTheDocument();
        expect(component).toBeVisible();
        expect(component).not.toBeDisabled();
    });

    test('add className', () => {
        testCustomClassName<ComponentProps>({
            component: BlockBase,
            props: {qa},
        });
    });

    test('should reset paddings', () => {
        render(<BlockBase qa={qa} resetPaddings={true} />);
        const component = screen.getByTestId(qa);

        expect(component).toHaveClass('pc-block-base_reset-paddings');
    });

    test.each(
        Object.values(GridColumnSize).filter((s) => s !== GridColumnSize.All) as GridColumnSize[],
    )('render with given "%s" visible size (string)', (size) => {
        render(<BlockBase qa={qa} visible={size} />);
        const component = screen.getByTestId(qa);

        expect(component).toHaveClass('d-none');
        expect(component).toHaveClass(`d-${size}-block`);
    });

    test('render with given "all" visible size (string)', () => {
        render(<BlockBase qa={qa} visible={GridColumnSize.All} />);
        const component = screen.getByTestId(qa);

        expect(component).toHaveClass('d-block');
    });

    test('render with object visible — hide on sm, show from md', () => {
        render(<BlockBase qa={qa} visible={{sm: false, md: true}} />);
        const component = screen.getByTestId(qa);

        expect(component).toHaveClass('d-none');
        expect(component).toHaveClass('d-md-block');
    });

    test('render with object visible — hide on lg and xl', () => {
        render(<BlockBase qa={qa} visible={{lg: false}} />);
        const component = screen.getByTestId(qa);

        expect(component).toHaveClass('d-block');
        expect(component).toHaveClass('d-lg-none');
    });

    test('should have anchor', () => {
        const anchor = {
            text: 'anchor',
            url: 'https://github.com/gravity-ui/',
        };
        render(<BlockBase anchor={anchor} />);
        const component = screen.getByTestId(qaIdByDefault);

        expect(component).toBeInTheDocument();
        expect(component).toHaveAttribute('id', anchor.url);
    });

    test.each(new Array<IndentValue>(...indentValues))(
        'render with given "%s" top indent',
        (indentValue) => {
            render(<BlockBase qa={qa} indent={{top: indentValue}} />);
            const component = screen.getByTestId(qa);

            expect(component).toHaveClass(`pc-block-base_indentTop_${indentValue}`);
        },
    );

    test.each(new Array<IndentValue>(...indentValues))(
        'render with given "%s" bottom indent',
        (indentValue) => {
            render(<BlockBase qa={qa} indent={{bottom: indentValue}} />);
            const component = screen.getByTestId(qa);

            expect(component).toHaveClass(`pc-block-base_indentBottom_${indentValue}`);
        },
    );
});
