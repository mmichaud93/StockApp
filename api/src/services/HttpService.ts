import https from "https";
import { injectable } from "inversify";
import { InternalServerError } from "routing-controllers";
import { INTERFACE as IHttpService } from "./IHttpService";

@injectable()
export class HttpService implements IHttpService {
  get(options: https.RequestOptions): Promise<JSON> {
    return new Promise(function (resolve, _reject) {
      const request = https
        .get(options, (res) => {
          if (res.statusCode !== 200) {
            // we failed to get anything from finnhub, throw a 500
            throw new InternalServerError("Failed to get stock price");
          }
          res.setEncoding("utf8");
          res.on("data", (data) => {
            resolve(JSON.parse(data));
          });
        })
        .on("error", (e) => {
          console.error(e);
          // we failed to connect to finnhub, throw a 500
          throw new InternalServerError("Failed to get stock price");
        });

      request.on("error", (e) => {
        console.error(e);
        // we failed to connect to finnhub, throw a 500
        throw new InternalServerError("Failed to get stock price");
      });
    });
  }
}
