/* @refresh reload */
import 'solid-devtools';
import { render } from 'solid-js/web';
import App from './App';

import 'normalize.css';
import 'reset-css';
import './index.css';
 

render(() => <App />, document.getElementById('root') as HTMLElement);
