import type { Component } from 'solid-js';
import { Routes, Route } from '@solidjs/router'
import { lazy, onMount } from 'solid-js';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Settings = lazy(() => import('./pages/Settings'));
import Header from './components/Header';
import { createStore } from 'solid-js/store';

const App: Component = () => {
  const [style, setStyles] = createStore();
  onMount(() => {
    if (localStorage.theme) setStyles(JSON.parse(localStorage.theme))
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
