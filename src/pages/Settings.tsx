import type { Component } from 'solid-js'; 
import { createSignal, onMount, For, Show } from 'solid-js';
import { createStore } from 'solid-js/store'
import { useKey } from '../KSContext'; 

import styles from './Settings.module.scss';

const Settings: Component = () => {
  const [key, {add, remove}] = useKey();
  const [style, setStyles] = createStore();
  const [tempkey, setTK] = createSignal<string>('');

  const keySubmit = (e: SubmitEvent) => {
    e.preventDefault();
    add(tempkey);
  }
  return (
    <div class={styles.settings}>
	<section>
	  <h1>API Key</h1>
	  <Show when={key().length > 0}>
	    <For each={key()}>{(key: string) => 
	      <p onClick={() => remove(key)}>{`${key} -remove`}</p>
	    }</For>
	  </Show>

	  <form >
	    <input type='text'
	    value={tempkey()}
	    onChange={(e) => setTK(e.currentTarget.value)}
	    placeholder='input alphavantage api key'/>
	    <input type='submit' />
	  </form>
	</section>

	<section>
	  <h1>Theme</h1>

	  <form>
	  </form>
	</section>
    </div>
  );
};

export default Settings;
