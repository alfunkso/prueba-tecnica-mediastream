import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import reducer from './reducers';
import App from './components/App';
import {createStore, applyMiddleware} from "redux";
import {Provider} from 'react-redux';
import {SnackbarProvider} from 'notistack';
import * as serviceWorker from './serviceWorker';

const store = createStore(reducer, applyMiddleware(thunk));

ReactDOM.render(
    (
        <Provider store={store}>
            <SnackbarProvider maxSnack={4}>
                <App />
            </SnackbarProvider>
        </Provider>
    ),
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
