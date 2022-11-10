import axios from 'axios'

export default async function APIreq(symbol: string, func: string, keys: string[]) {
  console.log(`called ${symbol} ${func}`);
  let baseURL = `https://www.alphavantage.co/query?function=${func}&symbol=${symbol}&apikey=${keys[0]}`;
  let query = await axios.get(baseURL)
		    .then(res => {return res.data})
		    .catch((err) => console.log(err));

  if ('Note' in query) {
    console.log('api limit reached, resending request in 1 minute.');
    query = await new Promise((resolve) => setTimeout(async () =>{
      console.log('called')
      await axios.get(baseURL)
		   .then(res => resolve(res.data))
    }, 65000));
    return query;
  }

  return query;
}
