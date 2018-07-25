import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import Simplify from './components/Simplify';
import registerServiceWorker from './registerServiceWorker';
import store from './store';
import './index.css';
import { ConnectedRouter } from 'connected-react-router';
import {history} from './store';

ReactDOM.render(
<Provider store={store}>
    <ConnectedRouter history={history}>
        <Simplify />
    </ConnectedRouter>
</Provider>,
 document.getElementById('root'));
registerServiceWorker();
