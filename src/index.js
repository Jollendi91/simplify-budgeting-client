import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import Simplify from './components/Simplify';
import registerServiceWorker from './registerServiceWorker';
import store from './store';
import './index.css';

ReactDOM.render(
<Provider store={store}>
    <Simplify />
</Provider>,
 document.getElementById('root'));
registerServiceWorker();
