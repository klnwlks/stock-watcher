import axios from 'axios'

export default async function APIreq(symbol: string, func: string, keys: string) {
  let query = await axios.get(
    `https://www.alphavantage.co/query?function=${func}&symbol=${symbol}&apikey=${keys}`)
    .then((res) => {
      console.log(res.status)
      console.log(res)
      return res.data;
    }).catch((err) => console.log(err));

  return query;
}
