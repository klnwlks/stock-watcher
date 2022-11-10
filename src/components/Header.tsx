import type { Component } from "solid-js"; 
import { A } from "@solidjs/router"; 

import styles from './Header.module.scss'

const Header: Component = () => {
  return (
    <div id='header' class={styles.header}>
      <div class={styles.links}>
	<A href='/'>
	  <h2>
	    stock
	    <br />
	    <span>watcher</span>
	  </h2>
	</A>
	<A href='/'>dashboard</A>
	<A href='/settings'>settings</A>
      </div>

      <div class={styles.misc}>
	<a href='https://github.com/klnwlks/stock-watcher'>github</a>
	<a href='https://www.alphavantage.co/support/#api-key'>key</a>
      </div>
    </div>
  );
}

export default Header;
