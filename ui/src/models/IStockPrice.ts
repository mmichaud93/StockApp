export interface IStockPrice {
  symbol: string;
  price: {
    currentPrice: number;
    openingPrice: number;
    highPrice: number;
    lowPrice: number;
    previousClosePrice: number;
    time: Date;
  };
}
