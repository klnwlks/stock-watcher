import type { Component } from 'solid-js';
import { Routes, Route } from '@solidjs/router'
import { lazy, onMount } from 'solid-js';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Settings = lazy(() => import('./pages/Settings'));
import Header from './components/Header';
import { createStore } from 'solid-js/store';
import { ITheme } from './types';

const App: Component = () => {
  const [style, setStyles] = createStore<ITheme>();

  onMount(() => {
    if (!localStorage.theme) return;

    setStyles(JSON.parse(localStorage.theme));
    let s = Object.keys(style);
    for (let i = 0; i < s.length; i++) {
      document.documentElement.style.setProperty(`--${s[i]}`, style[s[i]])
    }
  })

  return (
    <div>
      <Header />
      <Routes>
	<Route path='/' component={Dashboard}/>
	<Route path='/settings' component={Settings} />
      </Routes>
    </div>
  );
};

export default App;
