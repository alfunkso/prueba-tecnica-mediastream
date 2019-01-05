import model from '../model';
import FavoritesReducer from './FavoritesReducer';
import MoviesReducer from './MoviesReducer';
import PopularIndexReducer from './PopularIndexReducer';
import StatusReducer from './StatusReducer';
import {fromJS} from 'immutable';

export default (state = fromJS(model()), action = {}) => {
    return state
        .update("status", status => StatusReducer(status, action))
        .update("popularIndex", popularIndex => PopularIndexReducer(popularIndex, action))
        .update("movies", movies => MoviesReducer(movies, action))
        .update("favorites", favorites => FavoritesReducer(favorites, action))
    ;
};