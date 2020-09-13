import {
    ADD_UNDERSTAND_POINT,
    SET_UNDERSTAND_POINTS,
    SET_GOOD_FUTURE_POINTS,
    ADD_GOOD_FUTURE_POINT,
} from '../types';

export const addUnderstandPoint = (point) => ({
    type: ADD_UNDERSTAND_POINT,
    payload: point,
});

export const setUnderstandPoints = (points) => ({
    type: SET_UNDERSTAND_POINTS,
    payload: points,
});

export const addGoodFuturePoint = (point) => ({
    type: ADD_GOOD_FUTURE_POINT,
    payload: point,
});

export const setGoodFuturePoints = (points) => ({
    type: SET_GOOD_FUTURE_POINTS,
    payload: points,
});
