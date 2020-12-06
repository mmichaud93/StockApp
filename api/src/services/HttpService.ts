import https from "https";
import { injectable } from "inversify";
import { INTERFACE as IHttpService } from "./IHttpService";

@injectable()
export class HttpService implements IHttpService {
  get(options: https.RequestOptions): Promise<any> {
    return new Promise(function (resolve, reject) {
      const request = https
        .get(options, (res) => {
          res.setEncoding("utf8");
          res.on("data", (data) => {
            resolve({ status: res.statusCode, data: JSON.parse(data) });
          });
        })
        .on("error", (e) => {
          reject(e);
        });

      request.on("timeout", () => {
        reject(new Error("Connection timed out"));
      });
      request.on("error", (e) => {
        reject(e);
      });
    });
  }
}
