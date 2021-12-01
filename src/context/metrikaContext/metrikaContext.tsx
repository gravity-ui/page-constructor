import React from 'react';
import {Metrika as MetrikaGoal} from '../../models';

export interface Pixel {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    trackStandard: (name: string, data: any) => void;
}

export interface Metrika {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    reachGoal: (counterName: string, ...args: any) => void;
    reachGoals: (goals: MetrikaGoal, counterName?: string) => void;
}

export interface MetrikaContextProps {
    metrika?: Metrika;
    pixel?: Pixel;
}

export const MetrikaContext = React.createContext<MetrikaContextProps>({});
