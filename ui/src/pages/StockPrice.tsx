import { Formik } from "formik";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import * as Yup from "yup";
import { getStockPrice } from "../services/StockPriceService";
import "./StockPrice.css";
import StockPriceCard from "../components/StockPriceCard";
import { IStockPrice } from "../models/IStockPrice";

const StockPrice: React.FC = () => {
  const [errorText, setErrorText] = useState<string>("");
  const [stockPrices, setStockPrices] = useState<any>({});
  const [inputText, setInputText] = useState<string>("");

  return (
    <div className="stock-price">
      <div className="stock-price-content">
        <h1>Get a stock price</h1>
        <h4>Enter a stock ticker symbol to get the price</h4>
        <Formik
          initialValues={{
            ticker: "",
          }}
          onSubmit={(values, actions) => {
            getStockPrice(inputText)
              .then((stockPrice) => {
                stockPrices[stockPrice.symbol] = {
                  symbol: stockPrice.symbol,
                  price: stockPrice.price,
                };
                setStockPrices({ ...stockPrices });
              })
              .catch((reason) => {
                setErrorText(reason);
              })
              .finally(() => {
                actions.setSubmitting(false);
                setInputText("");
                values.ticker = "";
              });
          }}
          validateOnChange={false}
          validateOnBlur={false}
          validationSchema={Yup.object().shape({
            ticker: Yup.string().required("Symbol is required"),
          })}
        >
          {({ errors, touched, handleSubmit, handleBlur, isSubmitting, setFieldValue }) => {
            return (
              <Form noValidate className="stock-price-form" onSubmit={handleSubmit}>
                <Form.Row className="stock-price-row">
                  <Button className="submit-button" variant="primary" type="submit">
                    {isSubmitting ? (
                      <FontAwesomeIcon icon={faSpinner} spin={true}></FontAwesomeIcon>
                    ) : (
                      <span>Search</span>
                    )}
                  </Button>
                  <Form.Group className="stock-input-parent" controlId="ticker">
                    <Form.Control
                      className="stock-input"
                      type="text"
                      placeholder="Symbol"
                      value={inputText}
                      onChange={(e) => {
                        setFieldValue("ticker", e.target.value);
                        setInputText(e.target.value);
                      }}
                      onBlur={handleBlur}
                      disabled={isSubmitting}
                      isInvalid={touched.ticker && !!errors.ticker}
                    />
                    <Form.Control.Feedback type="invalid">{errors.ticker}</Form.Control.Feedback>
                  </Form.Group>
                </Form.Row>
              </Form>
            );
          }}
        </Formik>
        <Alert className={`${errorText ? "" : "d-none"}`} variant="danger" onClose={() => setErrorText("")} dismissible>
          {errorText}
        </Alert>
        <div className="card-grid">
          {Object.keys(stockPrices)
            .map((key) => stockPrices[key])
            .map((stockPrice: IStockPrice) => {
              return (
                <div key={stockPrice.symbol} className="card-component-container">
                  <StockPriceCard stockPrice={stockPrice} />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default StockPrice;
