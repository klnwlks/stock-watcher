enum CType{
  CRYPTO,
  STOCK
}

export interface ITicker {
  symbol: string
  type: CType
  key?: string | Boolean
  top?: Boolean
}

export interface ICompanyInfo {
  [key: string]: string  
}

export interface IInfo {
  '1. open': string
  '2. high': string
  '3. low': string
  '4. close': string
}

interface IInterval {
  'Meta Data': {[key: string]: any}
}

export interface IIntraday extends IInterval {
  'Time Series (60min)': {[key: string]: any}
}

export interface IDaily extends IInterval {
  'Time Series (Daily)': {[key: string]: any}
}

export interface IWeekly extends IInterval {
  'Time Series (Weekly)': {[key: string]: any}
}
