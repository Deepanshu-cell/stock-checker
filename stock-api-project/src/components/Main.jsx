import React from "react";
import axios from "axios";
import Card from "./Cards";
import Spinner from "react-bootstrap/Spinner";

function Main() {
  const [data, setData] = React.useState([]);
  const [dataLoading, setDataLoading] = React.useState(true);

  // component did mount
  React.useEffect(() => {
    getData();
  }, []);

  //   getting basic data of all stocks
  const getData = async () => {
    const res = await axios.get("http://localhost:3000/getAll");
    let data = res.data;
    data = data.filter((o) => !o.error);
    console.log(data);
    setDataLoading(false);
    setData(data);
  };

  //   getting specific data from stocks
  const getStockPrice = async (o) => {
    const res = await axios.get(
      `http://localhost:3000/getData?symbol=${o.symbol}`
    );

    console.log(res.data);
    return await res?.data?.response?.open;
  };

  return (
    <div className="row m-2 p-3">
      {!dataLoading ? (
        data.map((o, i) => {
          return (
            <div key={i} className="col-2 m-2">
              {!o.error && <Card o={o} getStockPrice={getStockPrice} />}
            </div>
          );
        })
      ) : (
        <div>
          <h1>Data Loading....</h1>{" "}
          <Spinner animation="border" className="mx-auto my-auto" />
        </div>
      )}
    </div>
  );
}

export default Main;
