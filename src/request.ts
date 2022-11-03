import axios from 'axios'

export default async function APIreq(symbol: string, func: string, keys: string[]) {
  let baseURL = 'https://www.alphavantage.co/query';
  let i = 0;
  let query = await axios.get(
    `${baseURL}?function=${func}&symbol=${symbol}&apikey=${keys[0]}`)
    .then(async (res) => {
      while ('Note' in res.data && i < keys.length) {
	i++;	
	res.data = await axios.get(`${baseURL}?function=${func}&symbol=${symbol}&apikey=${keys[0]}`)
			.then((rres) => {return rres.data})
      }

      if (i <= keys.length) {
	setTimeout(async () => {
	  res.data = await axios.get(`${baseURL}?function=${func}&symbol=${symbol}&apikey=${keys[0]}`)
			  .then((rres) => {return rres.data})
	}, 60000)
      }
      return res.data;
    }).catch((err) => console.log(err));

  return query;
}
