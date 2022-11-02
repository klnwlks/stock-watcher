export enum CType{
  CRYPTO = 'CRYPTO',
  STOCK = 'TIME_SERIES'
}

export interface ITicker {
  symbol: string
  type: CType
  key?: string[]
  top?: Boolean
}

export interface ICompanyInfo {
  [key: string]: any 
}

export interface IInfo {
  '1. open': string
  '2. high': string
  '3. low': string
  '4. close': string
}

export interface ICInfo {
  '1b. open (USD)': string
  '2b. high (USD)': string
  '3b. low (USD)': string
  '4b. close (USD)': string
}
