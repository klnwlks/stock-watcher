import type { Component } from 'solid-js'; 
import type { ITheme } from '../types'; 

import { createSignal, For, Show, onMount } from 'solid-js';
import { createStore } from 'solid-js/store'
import { useKey } from '../KSContext'; 

import styles from './Settings.module.scss';

const Settings: Component = () => {
  const [key, {add, remove}] = useKey();
  const [style, setStyles] = createStore<ITheme>();
  const [tempkey, setTK] = createSignal<string>('');
  // add defaults later
  let defTheme: ITheme;

  onMount(() => {
    if (localStorage.theme) setStyles(JSON.parse(localStorage.theme)) 
    else setStyles(defTheme)
  })

  const keySubmit = (e: SubmitEvent) => {
    e.preventDefault();
    add(tempkey());
  }

  const saveTheme = (e: SubmitEvent) => {
    e.preventDefault();
    localStorage.theme = JSON.stringify(style);
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

	  <form onSubmit={keySubmit}>
	    <input type='text'
	    value={tempkey()}
	    onChange={(e) => setTK(e.currentTarget.value)}
	    placeholder='input api key'/>
	    <input type='submit' />
	  </form>
	</section>

	<section>
	  <h1>Theme</h1>

	  <form onSubmit={saveTheme}>
	    <label>
	      background
	    </label>
	    <input value={style.bg}
	    onChange={(e) => setStyles('bg', e.currentTarget.value)}
	    pattern='^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$' />

	    <label>
	      sub bg
	    </label>
	    <input value={style.bg}
	    onChange={(e) => setStyles('bg', e.currentTarget.value)}
	    pattern='^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$' />


	    <label>
	      main
	    </label>
	    <input value={style.fg1}
	    onChange={(e) => setStyles('fg1', e.currentTarget.value)}
	    pattern='^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$' />

	    <label>
	      sub
	    </label>
	    <input value={style.fg2}
	    onChange={(e) => setStyles('fg2', e.currentTarget.value)}
	    pattern='^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$' />
	    <input type='submit' value='save'/>

	    <label>
	      font
	    </label>
	    <input value={style.font}
	    onChange={(e) => setStyles('font', e.currentTarget.value)}/>

	    <input type='submit' value='save'/>
	  </form>
	</section>
    </div>
  );
};

export default Settings;
