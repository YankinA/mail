/* @refresh reload */
import { render } from 'solid-js/web';
import './index.css';
import 'normalize.css';
import 'reset-css';
import App from './App';

render(() => <App />, document.getElementById('root') as HTMLElement);
