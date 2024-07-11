import '@testing-library/jest-dom';
import {PropsWithChildren} from 'react';

jest.mock('swiper/react', () => ({
    Swiper: ({children}: PropsWithChildren) => children,
    SwiperSlide: ({children}: PropsWithChildren) => children,
}));

jest.mock('swiper/modules', () => ({
    Autoplay: jest.fn(),
    A11y: jest.fn(),
}));

jest.mock('swiper/scss', () => jest.fn());
jest.mock('swiper/scss/pagination', () => jest.fn());
