import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

function Cards({ o, getStockPrice }) {
  const [stockPrice, setStockPrice] = React.useState("");
  const [loadingPrice, setLoadingPrice] = React.useState(false);

  const getStockPriceFromParents = async () => {
    setStockPrice("Getting Stock Price....");
    setLoadingPrice(true);
    const priceOpen = await getStockPrice(o);
    setStockPrice(`Stock Price : ${priceOpen}`);
    setLoadingPrice(false);
  };

  //   const changesHandler = (e) => {
  //     setStockPrice(e.target.value);
  //   };

  return (
    <div>
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>Symbol Name : {o.symbol}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            Currency: {o.currency}
          </Card.Subtitle>
          <Card.Text>
            Bid Value: {o.response.bid.value} <br />
            Bid shares : {o.response.bid.shares}
          </Card.Text>
          <Button
            variant="primary"
            size="sm"
            onClick={() => {
              getStockPriceFromParents(o);
            }}
          >
            Get Price
          </Button>{" "}
          <div className="p-2">
            <strong>{stockPrice}</strong> <br />
            {loadingPrice && <Spinner animation="border" size="sm" />}
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Cards;
