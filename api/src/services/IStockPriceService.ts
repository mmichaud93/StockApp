import { StockPrice } from "../models/StockPrice";

const TYPE = Symbol("IStockPriceService");

interface IStockPriceService {
  // take a symbol, return a price
  getPrice(symbol: string): Promise<StockPrice>;
}

export { IStockPriceService as INTERFACE, TYPE };
