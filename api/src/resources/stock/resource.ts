import "reflect-metadata";

import { injectable } from "inversify";
import { Ctx, Get, JsonController, Param } from "routing-controllers";

interface SymbolResponse {
  symbol: string;
  price: number;
}

@injectable()
@JsonController("/stocks")
export class StockResource {
  // GET /stocks/:symbol
  // Accepts a string symbol and returns the symbol back and the price for the symbol
  // If no price for the symbol is found, it will throw a 404
  @Ctx()
  @Get("/:symbol")
  public async getStockPriceForSymbol(@Param("symbol") symbol: string): Promise<SymbolResponse> {
    // get the ticket symbol price here

    // if the symbol is not found, throw a 404

    return { symbol: "requested symboL: " + symbol, price: 0 };
  }
}
