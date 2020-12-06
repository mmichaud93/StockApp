import { expect } from "chai";
import sinon, { SinonStub } from "sinon";
import { FinnhubStockPriceService } from "../../src/services/FinnhubStockPriceService";
import { Setup } from "../Setup";
import * as IHttpService from "./../../src/services/IHttpService";
import * as IStockPriceService from "./../../src/services/IStockPriceService";

describe("FinnhubStockPriceService", () => {
  let testSuccessData = {
    status: 200,
    data: {
      c: 1,
      o: 2,
      h: 3,
      l: 4,
      pc: 5,
      t: new Date().toISOString(),
    },
  };

  describe("getPrice", () => {
    let httpService_get_Stub: SinonStub;

    beforeEach(() => {
      httpService_get_Stub = sinon.stub(
        (Setup.Instance.getContainer().get(IHttpService.TYPE) as any).constructor.prototype,
        "get",
      );
    });

    afterEach(() => {
      httpService_get_Stub.restore();
    });

    // mock httpservice 200 with valid response data
    // getPrice return the response data normalized to StockPrice
    it("Should return test StockPrice", async () => {
      httpService_get_Stub = httpService_get_Stub.resolves(testSuccessData);

      // Here we are testing the specific implementation of FinnhubStockPriceService.
      // This is bad becasue there is no guarantee that this finnhub implementation is even used.
      // So if we went for another financial service, these tests would fail spectacularly.
      // How to instantiate this service implementation with the subbed http service though?
      // This will need investigating
      const finnhubStockPriceService = Setup.Instance.getContainer().get<FinnhubStockPriceService>(
        IStockPriceService.TYPE,
      );
      const stockPrice = await finnhubStockPriceService.getPrice("TSLA");

      expect(stockPrice.currentPrice).to.equal(testSuccessData.data.c);
      expect(stockPrice.openingPrice).to.equal(testSuccessData.data.o);
      expect(stockPrice.highPrice).to.equal(testSuccessData.data.h);
      expect(stockPrice.lowPrice).to.equal(testSuccessData.data.l);
      expect(stockPrice.previousClosePrice).to.equal(testSuccessData.data.pc);
      expect(stockPrice.time.toISOString()).to.equal(testSuccessData.data.t);
    });
    // mock error
    // getPrice should throw 500
    it("Should throw 500 error", async () => {
      httpService_get_Stub = httpService_get_Stub.rejects("Whoops there was an error");

      const finnhubStockPriceService = Setup.Instance.getContainer().get<FinnhubStockPriceService>(
        IStockPriceService.TYPE,
      );
      try {
        await finnhubStockPriceService.getPrice("TSLA");
      } catch (error) {
        expect(error.httpCode).to.equal(500);
        expect(error.message).to.equal("Failed to load stock price");
      }
    });
  });
});
