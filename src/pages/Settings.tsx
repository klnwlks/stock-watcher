import type { Component } from 'solid-js'; 
import type { ITicker } from '../types'
import { createSignal, onMount } from 'solid-js';

import styles from './Settings.module.scss';

const Settings: Component = () => {
  const [key, setKey] = createSignal<string[]>([]);
  const [tickers, setTickers] = createSignal<ITicker[]>([]);

  function addTicker(i: ITicker) {
    setTickers(a => [...a, i])
  }

  onMount(() => {
    if (localStorage.api) {
      setKey(JSON.parse(localStorage.api));
    }

    if (localStorage.tickers) {
      setTickers(JSON.parse(localStorage.tickers))
    }
  })

  return (
    <div class={styles.settings}>
    </div>
  );
};

export default Settings;
