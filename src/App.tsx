import type { Component } from 'solid-js';
import { Routes, Route } from '@solidjs/router'
import { lazy, onMount,  } from 'solid-js';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Settings = lazy(() => import('./pages/Settings'));
import Header from './components/Header'

const App: Component = () => {
  onMount(() => {
  })

  return (
    <>
      <Header />
      <Routes>
	<Route path='/' component={Dashboard}/>
	<Route path='/settings' component={Settings} />
      </Routes>
    </>
  );
};

export default App;
