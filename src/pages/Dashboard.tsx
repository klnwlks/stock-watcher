import type { Component } from 'solid-js'; 
import type { ITicker } from '../types'
import { createSignal, onMount, For } from 'solid-js'; 

import Stock from '../components/Stock';
import styles from './Dashboard.module.scss';

const Dashboard: Component = () => {
  const [key, setKey] = createSignal<string>();
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
	    type={tick.type}
	    key={key()}
	    />
	}</For>
      </div>
    </div>
  );
};

export default Dashboard;
