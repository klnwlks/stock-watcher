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
	<section class={styles.key}>
	  <h1>API Key</h1>

	  <div class={styles.content}>
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
	  </div>
	</section>

	<section class={styles.theme}>
	  <h1>Theme</h1>

	  <form onSubmit={saveTheme}>
	    <div class={styles.edit}>
	      <label>
		background
	      </label>

	      <div>
		<input value={style.bg} type='text'
		onChange={(e) => setStyles('bg', e.currentTarget.value)}
		pattern='^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$' />
		<input type='color' value={style.bg}
		onChange={(e) => setStyles('bg', e.currentTarget.value)}
		/>
	      </div>
	    </div>

	    <div class={styles.edit}>
	      <label>
		sub bg
	      </label>

	      <div>
		<input value={style.bg2} type='text'
		onChange={(e) => setStyles('bg2', e.currentTarget.value)}
		pattern='^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$' />
		<input type='color' value={style.bg2}
		onChange={(e) => setStyles('bg2', e.currentTarget.value)}
		/>
	      </div>
	    </div>

	    <div class={styles.edit}>
	      <label>
		main
	      </label>

	      <div>
		<input value={style.fg1} type='text'
		onChange={(e) => setStyles('fg1', e.currentTarget.value)}
		pattern='^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$' />
		<input type='color' value={style.fg1} 
		onChange={(e) => setStyles('fg1', e.currentTarget.value)}
		/>
	      </div>
	    </div>

	    <div class={styles.edit}>
	      <label>
		sub
	      </label>
	      
	      <div>
		<input value={style.fg2} type='text'
		onChange={(e) => setStyles('fg2', e.currentTarget.value)}
		pattern='^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$' />
		<input type='color' value={style.fg2}
		onChange={(e) => setStyles('fg2', e.currentTarget.value)}
		/>
	      </div>
	    </div>

	    <div class={styles.edit}>
	      <label>
		font
	      </label>

	      <div>
		<input value={style.font} type='text'
		onChange={(e) => setStyles('font', e.currentTarget.value)}/>
	      </div>
	    </div>

	    <input type='submit' value='save'/>
	  </form>
	</section>
    </div>
  );
};

export default Settings;
