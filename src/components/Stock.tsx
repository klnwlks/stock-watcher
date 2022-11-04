import type { Component } from 'solid-js'; 
import type { ITicker, IInfo } from '../types';
import { CType } from '../types'; 
import { onMount, createSignal, Show } from 'solid-js'; 
import APIreq from '../request'

import Chart from './Chart'

const Stock: Component<ITicker> = (props) => {
  const [graph, setGraph] = createSignal<IInfo[]>();

  onMount(async () => {
    // odd workaround to a bug
    if (props.type == 'CRYPTO') return;
    let data = await APIreq(props.symbol, 'TIME_SERIES_DAILY', props.key!);
    let i = Object.keys(data['Time Series (Daily)']).slice(0, 10);
    let i2: IInfo[] = [];

    for (let j = 0; j < i.length; j++) {
      i2.push(data['Time Series (Daily)'][i[j]]) ;
    }

    setGraph(i2);
  });

  const changeGraph = async (type: string) => {
    let func = '', dkey: string = '';
    switch (type) {
      case 'f':
	func = 'TIME_SERIES_INTRADAY&interval=5min';
	dkey = 'Time Series (5min)';
	break;

      case 'd':
	func = 'TIME_SERIES_DAILY';
	dkey = 'Time Series (Daily)';
	break;

      case 'w':
	func = 'TIME_SERIES_WEEKLY';
	dkey = 'Weekly Time Series';
	break;
    }

    let res = await APIreq(props.symbol, func, props.key!);
    let keys = Object.keys(res[dkey]).slice(0, 10);
    let iarr: IInfo[] = [];

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
	    <h2>${+ graph()![0]['2. high']}</h2>
	    {/* calculate percentage increase */}
	    <h2>
	    ^ {(((+ graph()![0]['2. high'] - + graph()![1]['2. high'])
	        / + graph()![1]['2. high']) * 100).toFixed(2)}%
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
	    <Chart data={graph()!} high={+ graph()![0]['2. high']} type={CType.STOCK}/>
	</Show>
      </div>
    </div>
  );
}

export default Stock;
