import type { Component } from 'solid-js'; 
import type { ITicker } from '../types'

import { createSignal, onMount, For, Show } from 'solid-js'; 
import { createStore } from 'solid-js/store';
import { useKey } from '../KSContext'; 

import Stock from '../components/Stock';
import Crypto from '../components/Crypto'
import styles from './Dashboard.module.scss';

const Dashboard: Component = () => {
  // i know there's a TS error here, but for the love of god, it's been an hour and the only 
  // issue i've found mentioning this has a fix that doesn't work.
  const [key] = useKey();
  const [tickers, setTickers] = createSignal<ITicker[]>([]);
  const [tick, setTick] = createStore<ITicker>({symbol: '', type: 'STOCK', top: false});

  onMount(() => {
    if (localStorage['tickers']) {
      setTickers(JSON.parse(localStorage.tickers));
      let t = tickers();
      setTickers(t!.sort((a: ITicker, b: ITicker) => + a.top! - + b.top!))
    }
  });

  const remove = (s: string) => {
    setTickers(tickers().filter((k) => {
      return k.symbol !== s
    }))
    localStorage.tickers = JSON.stringify(tickers());
  }

  const add = (e: SubmitEvent) => {
    e.preventDefault();
    setTickers([...tickers(), tick])
    localStorage.tickers = JSON.stringify(tickers());
  }

  const edit = (symbol: string) => {
    let temp = tickers();
    let i = tickers().map(e => e.symbol).indexOf(symbol);
    temp[i].top = !temp[i].top
    setTickers(temp);
    localStorage.tickers = JSON.stringify(tickers());
  }

  return (
    <div class={styles.dashboard}>
      <h1>Dashboard</h1>
      <div class={styles.list}>
	<For each={tickers()}>{(tick: ITicker) =>
	  <Show when={tick.type === 'STOCK'}
	    fallback={<Crypto symbol={tick.symbol} type={tick.type}
	    edit={edit} key={key()} remove={remove}/>} >	

	    <Stock symbol={tick.symbol} 
	    type={tick.type}
	    key={key()} edit={edit}
	    remove={remove}
	    />

	  </Show>
	}</For>
      </div>

      <div class={styles.add}>
	<form onSubmit={add}>
	  <div>
	    <input type='text' value={tick.symbol}
	    onChange={(e) => setTick('symbol', e.currentTarget.value)}
	    placeholder='ticker symbol' /> 

	    <select value={tick.type} onChange={(e) => setTick('type', e.currentTarget.value)}>
	      <option value='STOCK'>stock</option>
	      <option value='CRYPTO'>crypto</option>
	    </select>
	  </div>

	  <input type='submit' value='Add' />
	</form>
      </div>
    </div>
  );
};

export default Dashboard;
