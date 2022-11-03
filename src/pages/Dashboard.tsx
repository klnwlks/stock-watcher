import type { Component } from 'solid-js'; 
import type { ITicker } from '../types'
import { CType } from '../types';
import { createSignal, onMount, For, Show } from 'solid-js'; 

import Stock from '../components/Stock';
import Crypto from '../components/Crypto'
import styles from './Dashboard.module.scss';

const Dashboard: Component = () => {
  const [key, setKey] = createSignal<string[]>();
  const [tickers, setTickers] = createSignal<ITicker[]>();

  onMount(() => {
    if (localStorage['api']) {
      setKey(JSON.parse(localStorage['api']));
    } 

    if (localStorage['tickers']) {
      setTickers(JSON.parse(localStorage.tickers));
      let t = tickers();
      setTickers(t!.sort((a: ITicker, b: ITicker) => + a.top! - + b.top!))
    }
  });

  return (
    <div class={styles.dashboard}>
      <div class={styles.list}>
	<For each={tickers()}>{(tick: ITicker) =>
	  <Show when={tick.type = CType.STOCK}
	    fallback={<Crypto symbol={tick.symbol} type={tick.type} key={key()}/>}
	  >	
	    <Stock symbol={tick.symbol} 
	    type={tick.type}
	    key={key()}
	    />
	  </Show>
	}</For>
      </div>
    </div>
  );
};

export default Dashboard;
