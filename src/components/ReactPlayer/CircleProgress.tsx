import React, {useMemo} from 'react';

import {ClassNameProps} from '../../models';
import {block} from '../../utils';

import './CircleProgress.scss';

const b = block('CircleProgress');

export interface CircleProgressProps extends ClassNameProps {
    elapsedTime: number;
    baseColor?: string;
    circleColor?: string;
    strokeWidth?: number;
    radius?: number;
}

const CircleProgress = (props: CircleProgressProps) => {
    const {
        baseColor,
        elapsedTime,
        circleColor = '#262626',
        strokeWidth = 10,
        radius = 50,
        className,
    } = props;

    const circumference = useMemo(() => 2 * Math.PI * radius, [radius]);

    const baseCircle = useMemo(() => {
        if (!baseColor) {
            return null;
        }

        return (
            <circle
                cx="60"
                cy="60"
                r={radius}
                fill="none"
                stroke={baseColor}
                strokeWidth={strokeWidth}
            />
        );
    }, [baseColor, radius, strokeWidth]);

    return (
        <svg
            className={b(null, className)}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 120 120"
        >
            {baseCircle}
            <circle
                cx="60"
                cy="60"
                r={radius}
                transform="rotate(-90 60 60)"
                fill="none"
                strokeDashoffset={circumference - elapsedTime * circumference}
                strokeDasharray={circumference}
                stroke={circleColor}
                strokeWidth={strokeWidth}
            ></circle>
        </svg>
    );
};

export default CircleProgress;
