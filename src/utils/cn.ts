// eslint-disable-next-line local/no-bem-cn-lite
import blockOrigin from 'bem-cn-lite';

export const NAMESPACE = 'pc-';

export type CnBlock = ReturnType<typeof blockOrigin>;

export function block(name: string): CnBlock {
    return blockOrigin(`${NAMESPACE}${name}`);
}
