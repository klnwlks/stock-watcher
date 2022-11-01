import type { Component } from 'solid-js'; 
import type { ITicker } from '../types'
import { createEffect, createSignal, onMount, For } from 'solid-js'; 

import Stock from '../components/Stock';
import logo from './logo.svg';
import styles from './Dashboard.module.scss';
import axios from 'axios'

const Dashboard: Component = () => {
  const [key, setKey] = createSignal<string | Boolean>(false);
  const [tickers, setTickers] = createSignal<ITicker[]>();

  onMount(() => {
    if (localStorage['api']) {
      setKey(localStorage['api']);
    } 

    if (localStorage['tickers']) {
      setTickers(JSON.parse(localStorage.tickers));
      console.log(tickers());
      let t = tickers();
      setTickers(t!.sort((a: ITicker, b: ITicker) => + a.top! - + b.top!))
    }
  });

  return (
    <div class={styles.dashboard}>
      <div class={styles.list}>
	<For each={tickers()}>{(tick: ITicker) =>
	    <Stock symbol={tick.symbol} 
	    key={key()}
	    />
	}</For>
      </div>
    </div>
  );
};

export default Dashboard;
