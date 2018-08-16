import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import store from './store';
import './index.css';
import { ConnectedRouter } from 'connected-react-router';
import {history} from './store';

ReactDOM.render(
<Provider store={store}>
    <ConnectedRouter history={history}>
        <App />
    </ConnectedRouter>
</Provider>,
 document.getElementById('root'));
registerServiceWorker();
