import type { Component } from 'solid-js'; 
import { createSignal, onMount, For, Show } from 'solid-js';
import { createStore } from 'solid-js/store'

import styles from './Settings.module.scss';

const Settings: Component = () => {
  const [key, setKey] = createSignal<string[]>([]);
  const [style, setStyles] = createStore();
  const [tempkey, setTK] = createSignal<string>('');

  onMount(() => {
    if (localStorage.api) {
      setKey(JSON.parse(localStorage.api));
    }
  })

  const addKey = (e: SubmitEvent) => {
    e.preventDefault();
    setKey(a => [...a, tempkey()]);
  }

  return (
    <div class={styles.settings}>
	<section>
	  <h1>API Key</h1>
	  <Show when={key().length > 0}>
	    <For each={key()}>{(key: string) => 
	      <p>{key}</p>
	    }</For>
	  </Show>

	  <form onSubmit={addKey}>
	    <input type='text'
	    value={tempkey()}
	    onChange={(e) => setTK(e.currentTarget.value)}
	    placeholder='input alphavantage api key'/>
	    <input type='submit' />
	  </form>
	</section>

	<section>
	  <h1>customize theme</h1>

	  <form>
	  </form>
	</section>
    </div>
  );
};

export default Settings;
