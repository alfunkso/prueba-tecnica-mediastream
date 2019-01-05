import * as ActionTypes from "./actionTypes";

const addToFavorites = (movieId) => ({
    type: ActionTypes.ADD_TO_FAVORITES,
    payload: {movieId},
});

const removeFromFavorites = (movieId) => ({
    type: ActionTypes.REMOVE_FROM_FAVORITES,
    payload: {movieId},
});

const setFavorites = (favorites) => ({
    type: ActionTypes.SET_FAVORITES,
    payload: {favorites},
});

export const addToFavesAndSave = (movieId) => ({});
export const removeFromFavesAndSave = (movieId) => ({});
export const saveFaves = () => ({});
export const loadFaves = () => ({});

