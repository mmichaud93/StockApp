import https from "https";

const TYPE = Symbol("IHttpService");

interface IHttpService {
  get(options: https.RequestOptions): Promise<any>;
}

export { IHttpService as INTERFACE, TYPE };
