import "./StockPriceCard.scss";

import React from "react";
import moment from "moment";
import numeral from "numeral";
import { IStockPrice } from "../models/IStockPrice";

export interface StockPriceCardsProps {
  stockPrice: IStockPrice;
}

const StockPriceCard: React.FC<StockPriceCardsProps> = (props: StockPriceCardsProps) => {
  const { stockPrice } = props;

  const isPositive = stockPrice.price.currentPrice - stockPrice.price.previousClosePrice >= 0;

  return (
    <div className={`card ${isPositive ? "green-border" : "red-border"}`}>
      <h3>{stockPrice.symbol.toUpperCase()}</h3>
      <div className="card-row">
        <div className="card-col">
          <h5>Current Price</h5>
          <p>${stockPrice.price.currentPrice}</p>
        </div>
        <div className="card-col">
          <h5>Daily change</h5>
          <p>
            ${numeral(stockPrice.price.currentPrice - stockPrice.price.previousClosePrice).format("0.00")} (
            {numeral((stockPrice.price.currentPrice / stockPrice.price.previousClosePrice - 1) * 100).format("0.00")}%)
          </p>
        </div>
      </div>
      <div className="card-row">
        <div className="card-col">
          <h5>Last updated</h5>
          <p>{moment(new Date(stockPrice.price.time)).fromNow()}</p>
        </div>
      </div>
    </div>
  );
};

export default StockPriceCard;
