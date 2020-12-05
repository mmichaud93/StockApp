import "mocha";
import "reflect-metadata";

import * as IStockPriceService from "./../../../src/services/IStockPriceService";
import sinon from "sinon";

import { Setup } from "../../Setup";
import { StockPrice } from "../../../src/models/StockPrice";
import { expect } from "chai";

describe("Stock Resource", () => {
  describe("GET@/stock/:symbol", () => {
    const tslaStockPrice: StockPrice = {
      currentPrice: 500,
      openingPrice: 510,
      highPrice: 520,
      lowPrice: 530,
      previousClosePrice: 540,
      time: new Date(),
    };

    // given the symbol TSLA it should call IStockPriceService.getPrice with the symbol as the only param
    // mock a return with a StockPrice object
    // check to make sure that returned object matches what we exp ect
    it("Should call stockpriceservice with the symbol", async () => {
      // create stubs for the injected interfaces
      // when getPrice is called we will resolve with the tslaStockPrice object
      // if this object matches what the GET response is, we're golden
      const stockPriceServiceStub = sinon
        .stub((Setup.Instance.getContainer().get(IStockPriceService.TYPE) as any).constructor.prototype, "getPrice")
        .resolves(tslaStockPrice);

      const res = await Setup.Instance.server.get("/stocks/TSLA");

      expect(res.status).to.equal(200);
      expect(res.body.symbol).to.equal("TSLA");
      expect(res.body.price).to.be.an("object");
      expect(res.body.price.currentPrice).to.equal(tslaStockPrice.currentPrice);
      expect(res.body.price.openingPrice).to.equal(tslaStockPrice.openingPrice);
      expect(res.body.price.highPrice).to.equal(tslaStockPrice.highPrice);
      expect(res.body.price.lowPrice).to.equal(tslaStockPrice.lowPrice);
      expect(res.body.price.previousClosePrice).to.equal(tslaStockPrice.previousClosePrice);
      expect(res.body.price.time).to.equal(tslaStockPrice.time.toISOString());

      expect(stockPriceServiceStub.called).to.be.true;
      stockPriceServiceStub.restore();
    });
  });
});
