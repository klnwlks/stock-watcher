/* @refresh reload */
import { render } from 'solid-js/web';
import { Router } from '@solidjs/router';
import { KeyProvider } from './KSContext';

import './index.scss';
import App from './App';

render(() => (
  <Router>
    <KeyProvider keys={
      localStorage.api ? JSON.parse(localStorage.api) : undefined
    }>
      <App /> 
    </KeyProvider>
  </Router>
),
document.getElementById('root') as HTMLElement);
