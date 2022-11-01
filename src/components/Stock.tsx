import type { Component } from 'solid-js'; 
import type { ITicker, IInfo, ICompanyInfo, IDaily } from '../types'
import { onMount, createSignal, Show } from 'solid-js'; 
import axios from 'axios';

import Chart from './Chart'

const Stock: Component<ITicker> = (props) => {
  const [info, setInfo] = createSignal<ICompanyInfo>();
  const [graph, setGraph] = createSignal<IInfo[]>();

  onMount(() => {
    axios.get<ICompanyInfo>(
    `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${props.symbol}&apikey=${props.key}`
     ).then((res) => {
	console.log(res);
	setInfo(res.data);
     })
     .catch((err) => console.log(err));

    axios.get<IDaily>(
    `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${props.symbol}&apikey=${props.key}`
      ).then((res) => {
	let arr = Object.keys(res.data['Time Series (Daily)']).slice(0, 10).reverse();
	let arr2: IInfo[] = [];
	
  	for (let i = 0; i < arr.length; i++) {
	  arr2.push(res.data['Time Series (Daily)'][arr[i]]) ;
	}
	setGraph(arr2);
      })
      .catch((err) => console.log(err));
  });

  const changeGraph = (type: string) => {
    let func, dkey;
    switch (type) {
      case 'f':
	func = 'TIME_SERIES_INTRADAY&interval=5m';
	dkey = 'Time Series (5min)'
	break;

      case 'd':
	func = 'TIME_SERIES_DAILY';
	dkey = 'Time Series (Daily)'
	break;

      case 'w':
	func = 'TIME_SERIES_WEEKLY';
	dkey = 'Time Series (5min)'
	break;

    }
  }

  return (
    <div>
      <div class='info'>
	<Show when={info()}>
	    <h1>{`$${props.symbol}`}</h1>	
	    <p>{info()!.Name}</p>
	</Show>
      </div>

      <div class='canvas'>
	<Show when={graph()}>
	    <Chart data={graph()!} high={+ graph()![0]['2. high']}/>
	</Show>
      </div>
    </div>
  );
}

export default Stock;
