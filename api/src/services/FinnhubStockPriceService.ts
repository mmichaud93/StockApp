import { INTERFACE as IStockPriceService } from "./IStockPriceService";
import { inject, injectable } from "inversify";
import * as IHttpService from "./IHttpService";
import { IStockPrice } from "../models/IStockPrice";
import { InternalServerError } from "routing-controllers";

@injectable()
export class FinnhubStockPriceService implements IStockPriceService {
  @inject(IHttpService.TYPE)
  private httpService!: IHttpService.INTERFACE;

  async getPrice(symbol: string): Promise<IStockPrice> {
    // the Node https module is wrapped in a service here because I wanted this to be an async call.
    // so the service handles the promise wrapping so we don't duplicate code if we wanted to add more functionality
    try {
      const response = await this.httpService.get({
        hostname: `${process.env.FINNHUB_API_BASE_URL}`,
        path: `${process.env.FINNHUB_API_QUOTE_URL}?symbol=${symbol}`,
        headers: {
          "X-Finnhub-Token": process.env.FINNHUB_API_KEY,
        },
      });

      // c = current price
      // t = time
      // o = open price
      // h = high price
      // l = low price
      // pc = previous close price
      return {
        currentPrice: response.data.c,
        openingPrice: response.data.o,
        highPrice: response.data.h,
        lowPrice: response.data.l,
        previousClosePrice: response.data.pc,
        time: new Date(response.data.t * 1000),
      };
    } catch (error) {
      console.log(error);
      throw new InternalServerError("Failed to load stock price");
    }
  }
}
