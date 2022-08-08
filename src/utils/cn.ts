import blockOrigin from 'bem-cn-lite';

export const NAMESPACE = 'bc-';

export type CnBlock = ReturnType<typeof blockOrigin>;

export function block(name: string): CnBlock {
    return blockOrigin(`${NAMESPACE}${name}`);
}
