import React, { useEffect, useState } from "react";
import millify from "millify";
import { Row, Card, Col, Input } from "antd";
import { useGetCryptosQuery } from "../services/cryptoApi";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptoList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState([]);
  const [serachTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const filteredData = cryptoList?.data?.coins.filter((coin) =>
      coin.name.toLowerCase().includes(serachTerm.toLowerCase())
    );
    setCryptos(filteredData);
  }, [cryptoList, serachTerm]);

  console.log(cryptos);

  if (isFetching) return <Loader />;

  return (
    <>
      {!simplified && (
        <div className="search-crypto">
          <Input
            type="text"
            placeholder="Search Cryptocuurency"
            value={serachTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}

      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos?.map((curr) => (
          <Col xs={24} sm={12} lg={6} className="crypto-card" key={curr.uuid}>
            <Link to={`/crypto/${curr.uuid}`}>
              <Card
                title={`${curr.rank}.${curr.name}`}
                extra={<img className="crypto-image" src={`${curr.iconUrl}`} />}
                hoverable
              >
                <p>Price: {millify(curr.price)}</p>
                <p>Market Cap: {millify(curr.marketCap)}</p>
                <p>Daily Change: {millify(curr.change)}%</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Cryptocurrencies;
