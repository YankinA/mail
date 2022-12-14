/* @refresh reload */
import 'solid-devtools';
import { render } from 'solid-js/web';
import { Provider } from './store';
import App from './App';

import 'normalize.css';
import 'reset-css';
import './index.css';
 

render(() => (<Provider><App /></Provider>), document.getElementById('root') as HTMLElement);
