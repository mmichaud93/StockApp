import { IStockPrice } from "../models/IStockPrice";
import { get } from "./FetchService";

const baseApiUrl = process.env.REACT_APP_STOCK_API_URL;

const getStockPrice = async (symbol: string): Promise<IStockPrice> => {
  return get<IStockPrice>(`${baseApiUrl}/stocks/${symbol}`);
};

export { getStockPrice };
