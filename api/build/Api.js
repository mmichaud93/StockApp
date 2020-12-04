"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Api = void 0;
require("reflect-metadata");
var routing_controllers_1 = require("routing-controllers");
var ioc_container_1 = require("./ioc.container");
var Api = /** @class */ (function () {
    function Api() {
        this.port = Number(process.env.PORT);
        // calling use container here will use our IoC container which sets up the routes and services in one go
        routing_controllers_1.useContainer(ioc_container_1.container);
        this.app = routing_controllers_1.createKoaServer( /* middleware can be provided here */);
    }
    Api.prototype.start = function () {
        var _this = this;
        this.app.listen(this.port, function () {
            // koa server is listening now
            console.log("Listening on port " + _this.port);
        });
    };
    return Api;
}());
exports.Api = Api;
