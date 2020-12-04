"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.container = void 0;
var inversify_1 = require("inversify");
var resource_1 = require("./resources/stock/resource");
var container = new inversify_1.Container();
exports.container = container;
// need to bind the service layer here
// bind the resources
container.bind(resource_1.StockResource).toSelf();
