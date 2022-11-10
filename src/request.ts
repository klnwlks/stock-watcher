import axios from 'axios'

export default async function APIreq(symbol: string, func: string, keys: string[]) {
  console.log(`called ${symbol} ${func}`);
  let baseURL = 'https://www.alphavantage.co/query';
  let query = await axios.get(
    `${baseURL}?function=${func}&symbol=${symbol}&apikey=${keys[0]}`)
    .then(async (res) => {
      console.log(res);
      if ('Note' in res.data) {
	res.data = () => {
	  return new Promise(() => setTimeout(() =>{
	    axios.get(`${baseURL}?function=${func}&symbol=${symbol}&apikey=${keys[0]}`)
		.then((rres) => {return rres.data});
	    }, 60000));
	}
      }

      return res.data;
    }).catch((err) => console.log(err));

  return query;
}
