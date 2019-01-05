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

export const addToFavesAndSave = (movieId) => (dispatch) => {
    return new Promise(resolve => resolve(dispatch(addToFavorites(movieId))))
        .then(() => dispatch(saveFaves()));
};

export const removeFromFavesAndSave = (movieId) => (dispatch) => {
    return new Promise(resolve => resolve(dispatch(removeFromFavorites(movieId))))
        .then(() => dispatch(saveFaves()));
};

export const saveFaves = () => (dispatch, getState) => {
    return new Promise( (resolve) => {
        const faves = getState().getIn(["favorites"]);
        localStorage.favorites = faves.toJS();
        return resolve(localStorage.favorites);
    })
};

export const loadFaves = () => (dispatch) => {
    return new Promise( (resolve) => {
        const faves = localStorage.favorites;
        return resolve(dispatch(setFavorites( faves || {} )));
    });
};

