import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Simplify from './components/Simplify';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Simplify />, document.getElementById('root'));
registerServiceWorker();
