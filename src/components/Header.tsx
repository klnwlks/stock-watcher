import type { Component } from "solid-js"; 
import { A } from "@solidjs/router"; 

const Header: Component = () => {
  return (
    <div id='header'>
      <div class='links'>
	<A href='/'>dashboard</A>
	<A href='/settings'>settings</A>
      </div>

      <div class='misc'>
	<a href='https://github.com/klnwlks/stock-watcher'>github</a>
      </div>
    </div>
  );
}

export default Header;
