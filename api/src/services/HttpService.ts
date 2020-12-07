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
            try {
              resolve({ status: res.statusCode, data: JSON.parse(data) });
            } catch (err) {
              reject(err);
            }
          });
        })
        .on("error", (err) => {
          reject(err);
        });

      request.on("timeout", () => {
        reject(new Error("Connection timed out"));
      });
      request.on("error", (err) => {
        reject(err);
      });
    });
  }
}
