import React from 'react';
import ReactDOM from 'react-dom';
import SortableComponent from './components/App';

import store from './components/Store'
import { Provider } from 'react-redux'

import './index.css';

ReactDOM.render(
    <Provider store={store}>
        <SortableComponent />
    </Provider>,
    document.getElementById("root")
);
