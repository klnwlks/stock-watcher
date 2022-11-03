/* @refresh reload */
import { render } from 'solid-js/web';
import { Router } from '@solidjs/router';
import { KeyProvider } from './KSContext';

import './index.scss';
import App from './App';

render(() => (
  <Router>
    <KeyProvider count={
      localStorage.api ? JSON.parse(localStorage.api) : 0
    }>
      <App /> 
    </KeyProvider>
  </Router>
),
document.getElementById('root') as HTMLElement);
