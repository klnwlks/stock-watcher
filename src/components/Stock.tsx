import type { Component } from 'solid-js'; 
import type { ITicker } from '../types';
import { CType } from '../types'; 
import { onMount, createSignal, Show } from 'solid-js'; 
import APIreq from '../request'

import Chart from './Chart'
import styles from './Stock.module.scss'

const Stock: Component<ITicker> = (props) => {
  const [graph, setGraph] = createSignal<any[][]>();

  onMount(async () => {
    // odd workaround to a bug
    if (props.type == 'CRYPTO') return;
    let data = await APIreq(props.symbol, 'TIME_SERIES_DAILY_ADJUSTED', props.key!);
    let i = Object.entries(data['Time Series (Daily)']).slice(0,20);

    setGraph(i);
  });

  const changeGraph = async (type: string) => {
    let func = '', dkey = '';
    switch (type) {
      case 'f':
	func = 'TIME_SERIES_INTRADAY&interval=5min';
	dkey = 'Time Series (5min)';
	break;

      case 'd':
	func = 'TIME_SERIES_DAILY_ADJUSTED';
	dkey = 'Time Series (Daily)';
	break;

      case 'w':
	func = 'TIME_SERIES_WEEKLY';
	dkey = 'Weekly Time Series';
	break;
    }

    let data = await APIreq(props.symbol, func, props.key!);
    let i = Object.entries(data[dkey]).slice(0,20);

    setGraph(i);
    if (type == 'f') changeGraph('f')
  }

  return (
    <div class={styles.item}>
      <div class={styles.info}>
	<div>
	  <div class={styles.symbol}>
	    <h1>{`$${props.symbol} `}</h1>	
	  </div>
	  
	  <Show when={graph()}>
	    <h2> <span>＄</span>{+ graph()![0][1]['2. high']}</h2>
	    {/* calculate percentage increase */}
	    <h2>
	    <span>⇧</span>{(((+ graph()![0][1]['2. high'] - + graph()![1][1]['2. high'])
	        / + graph()![1][1]['2. high']) * 100).toFixed(2)}%
	    </h2>
	  </Show>
	</div>

	<div class={styles.tab}>
	  <h4>Interval</h4>
	  <div class={styles.cont}>
	    <p onClick={() => changeGraph('f')}>
	      5min
	    </p>
	    <p onClick={() => changeGraph('d')}>
	      daily
	    </p>
	    <p onClick={() => changeGraph('w')}>
	      weekly
	    </p>
	  </div>

	  <h4 onClick={() => props.remove!(props.symbol)}>remove</h4>
	</div>
      </div>

      <div class={styles.canvasCont}>
	<Show when={graph()}>
	  <Chart data={graph()!} high={+ graph()![0][1]['2. high']} type={CType.STOCK}/>
	</Show>
      </div>
    </div>
  );
}

export default Stock;
