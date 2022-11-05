import type { Component } from 'solid-js'; 
import type { ITicker, ICInfo } from '../types';
import { onMount, createSignal, Show } from 'solid-js'; 
import { CType } from '../types';
import APIreq from '../request'

import Chart from './Chart'
import styles from './Stock.module.scss'

const Crypto: Component<ITicker> = (props) => {
  const [graph, setGraph] = createSignal<ICInfo[]>();

  onMount(async () => {
    let data = await APIreq(props.symbol, 'DIGITAL_CURRENCY_DAILY&market=USD', props.key!);
    let i = Object.keys(data['Time Series (Digital Currency Daily)']).slice(0, 20);
    let i2: ICInfo[] = [];

    for (let j = 0; j < i.length; j++) {
      i2.push(data['Time Series (Digital Currency Daily)'][i[j]]) ;
    }

    setGraph(i2);
  });

  const changeGraph = async (type: string) => {
    let func = '', dkey: string = '';
    switch (type) {
      case 'f':
	func = 'CRYPTO_INTRADAY&interval=5min&market=USD';
	dkey = 'Time Series Crypto (5min)';
	break;

      case 'd':
	func = 'DIGITAL_CURRENCY_DAILY&market=USD';
	dkey = 'Time Series (Digital Currency Daily)';
	break;

      case 'w':
	func = 'DIGITAL_CURRENCY_WEEKLY&market=USD';
	dkey = 'Time Series (Digital Currency Weekly)';
	break;
    }

    let res = await APIreq(props.symbol, func, props.key!);
    let keys = Object.keys(res[dkey]).slice(0, 20);
    let iarr: ICInfo[] = [];

    for (let i = 0; i < keys.length; i++) {
      iarr.push(res[dkey][keys[i]])
    }

    setGraph(iarr);
  }

  return (
    <div class={styles.item}>
      <div class={styles.info}>
	<div>
	  <h1>{`$${props.symbol}`}</h1>	
	  
	  <Show when={graph()}>
	    <h2>${+ graph()![0]['2b. high (USD)']}</h2>
	    {/* calculate percentage increase */}
	    <h2>
	    ^ {(((+ graph()![0]['2b. high (USD)'] - + graph()![1]['2b. high (USD)'])
	        / + graph()![1]['2b. high (USD)']) * 100).toFixed(2)}%
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
	</div>
      </div>

      <div class={styles.canvasCont}>
	<Show when={graph()}>
	    <Chart data={graph()!} high={+ graph()![0]['2b. high (USD)']}
	      type={CType.CRYPTO}
	    />
	</Show>
      </div>
    </div>
  );
}

export default Crypto;
