import "reflect-metadata";

import { inject, injectable } from "inversify";
import { Ctx, Get, JsonController, Param } from "routing-controllers";

import * as IStockPriceService from "./../../services/IStockPriceService";
import { StockPrice } from "../../models/StockPrice";

interface SymbolResponse {
  symbol: string;
  price: StockPrice;
}

@injectable()
@JsonController("/stocks")
export class StockResource {
  @inject(IStockPriceService.TYPE)
  private stockPriceService!: IStockPriceService.INTERFACE;

  // GET /stocks/:symbol
  // Accepts a string symbol and returns the symbol back and the price for the symbol
  // If no price for the symbol is found, it will throw a 404
  @Ctx()
  @Get("/:symbol")
  public async getStockPriceForSymbol(@Param("symbol") symbol: string): Promise<SymbolResponse> {
    // if the symbol is not found, throw a 404
    // future improvement, finnhub just returns all 0's for a nonexistant symbol

    const price = await this.stockPriceService.getPrice(symbol);

    return { symbol: symbol, price: price };
  }
}
