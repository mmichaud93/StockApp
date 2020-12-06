import "mocha";
import "reflect-metadata";

import nock from "nock";
import { HttpService } from "../../src/services/HttpService";
import { expect } from "chai";

describe("HttpService", () => {
  describe("get", () => {
    let testHostname = "www.google.com";
    let testPath = "/images";
    let testData = {
      text: "hello test",
    };
    let errorText = "Failed to load resource";

    // mock an https 200 response, and a valid data
    // get should respond with a 200 status and the data
    it("Should respond with the mocked data", async () => {
      nock(`https://${testHostname}`).get(testPath).reply(200, testData);

      const httpService = new HttpService();
      const data = await httpService.get({
        hostname: testHostname,
        path: testPath,
      });

      expect(data.status).to.equal(200);
      expect(data.data).to.be.an("object");
      expect(data.data.text).to.equal(testData.text);
    });

    // mock an https 500 error
    // get should respond with a 500 status and the error message
    it("Should respond with a 500 error", async () => {
      nock(`https://${testHostname}`).get(testPath).reply(500, { message: "internal server error" });

      const httpService = new HttpService();
      const data = await httpService.get({
        hostname: testHostname,
        path: testPath,
      });

      expect(data.status).to.equal(500);
      expect(data.data).to.be.an("object");
      expect(data.data.message).to.equal("internal server error");
    });

    // mock a request error
    // get should catch with the error text
    it("Should fail to send any response", async () => {
      nock(`https://${testHostname}`).get(testPath).replyWithError(errorText);

      const httpService = new HttpService();
      try {
        await httpService.get({
          hostname: testHostname,
          path: testPath,
        });
      } catch (err) {
        expect(err.toString()).to.be.equal(`Error: ${errorText}`);
      }
    });

    // mock an https timeout
    // get should catch with a timeout error
    it("Should timeout", async () => {
      nock(`https://${testHostname}`).get(testPath).delay(2000).reply(200);

      const httpService = new HttpService();
      try {
        await httpService.get({
          hostname: testHostname,
          path: testPath,
          timeout: 1,
        });
      } catch (err) {
        expect(err.toString()).to.be.equal(`Error: Connection timed out`);
      }
    });
  });
});
