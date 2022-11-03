import type { Component } from 'solid-js'; 
import type { ITicker, ICInfo } from '../types';
import { onMount, createSignal, Show } from 'solid-js'; 
import { CType } from '../types';
import APIreq from '../request'

import Chart from './Chart'

const Crypto: Component<ITicker> = (props) => {
  const [graph, setGraph] = createSignal<ICInfo[]>();

  onMount(async () => {
    let data = await APIreq(props.symbol, 'DIGITAL_CURRENCY_DAILY', props.key!);
    let i = Object.keys(data['Time Series (Digital Currency Daily)']).slice(0, 10).reverse();
    let i2: ICInfo[] = [];

    for (let j = 0; j < i.length; j++) {
      i2.push(data['Digital Currency (Daily)'][i[j]]) ;
    }

    setGraph(i2);
  });

  async function changeGraph(type: string) {
    let func = '', dkey: string = '';
    switch (type) {
      case 'f':
	func = 'CRYPTO_INTRADAY&interval=5min';
	dkey = 'Time Series Crypto (5min)';
	break;

      case 'd':
	func = 'DIGITAL_CURRENCY_DAILY';
	dkey = 'Time Series (Digital Currency Daily)';
	break;

      case 'w':
	func = 'DIGITAL_CURRENCY_WEEKLY';
	dkey = 'Time Series (Digital Currency Weekly)';
	break;
    }

    let res = await APIreq(props.symbol, func, props.key!);
    let keys = Object.keys(res[dkey]).slice(0, 10);
    let iarr: ICInfo[] = [];

    for (let i = 0; i < keys.length; i++) {
      iarr.push(res[dkey][keys[i]])
    }

    setGraph(iarr);
  }

  return (
    <div>
      <div class='info'>
	  <h1>{`$${props.symbol}`}</h1>	
	  
	  <Show when={graph()}>
	    <h2>${+ graph()![0]['2b. high (USD)']}</h2>
	    {/* calculate percentage increase */}
	    <h2>
	    ^ {(((+ graph()![0]['2b. high (USD)'] - + graph()![1]['2b. high (USD)'])
	        / + graph()![1]['2b. high (USD)']) * 100).toFixed(2)}%
	    </h2>
	  </Show>

	  <div class='tabs'>
	    Interval
	    <p class='link' onClick={() => changeGraph('f')}>
	      5min
	    </p>
	    <p class='link' onClick={() => changeGraph('d')}>
	      daily
	    </p>
	    <p class='link' onClick={() => changeGraph('w')}>
	      weekly
	    </p>
	  </div>
      </div>

      <div class='canvas'>
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
