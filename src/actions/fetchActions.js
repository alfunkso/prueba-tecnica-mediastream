import * as ActionTypes from "./actionTypes";

export const initialize = () => ({
    type: ActionTypes.INITIALIZE,
    payload: {},
});

export const setApiImages = (apiImages) => ({
    type: ActionTypes.SET_API_IMAGES,
    payload: {apiImages},
});

export const fetchNextPage = () => ({
    type: ActionTypes.FETCH_NEXT_PAGE,
    payload: {},
});

export const fetchedPage = (page, results) => ({
    type: ActionTypes.FETCHED_PAGE,
    payload: {page, results},
});

export const fetchReviews = (movieId) => ({
    type: ActionTypes.FETCH_REVIEWS,
    payload: {movieId},
});

export const fetchedReviews = (movieId, results) => ({
    type: ActionTypes.FETCHED_REVIEWS,
    payload: {movieId, results},
});
