import type { Component } from 'solid-js';
import { Routes, Route } from '@solidjs/router'

import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';

const App: Component = () => {
  return (
    <>
      <Routes>
	<Route path='/' component={Dashboard}/>
	<Route path='/settings' component={Settings} />
      </Routes>
    </>
  );
};

export default App;
