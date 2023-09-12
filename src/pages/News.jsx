import React, { useState } from "react";
import { Select, Typography, Row, Col, Avatar, Card } from "antd";
import moment from "moment/moment";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
import { useGetCryptosQuery } from "../services/cryptoApi";
import Loader from "../components/Loader";
const DemoImg =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQE_tZ3A5Tbtnd3f9ubobjfxsHlVOW-8RCg1w&usqp=CAU";
const { Text, Title } = Typography;
const { Option } = Select;
const News = ({ simplified }) => {
  const { data } = useGetCryptosQuery(100);
  const [newsCategory, setNewsCategory] = useState("Cryptocurrency");
  const { data: cryptoNews, isFetching } = useGetCryptoNewsQuery({
    newsCategory: newsCategory,
    count: simplified ? 6 : 14,
  });
  console.log(cryptoNews);
  if (isFetching) return <Loader />;
  return (
    <>
      {!simplified && (
        <Col span={24}>
          <Select
            style={{
              marginBottom: "12px",
              background: "rgba(122, 60, 60, 0.096)",
            }}
            showSearch
            className="select-news"
            placeholder="Select a Crypto"
            optionFilterProp="children"
            onChange={(value) => setNewsCategory(value)}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value="Cryptocurrency"></Option>
            {data?.data?.coins.map((coin) => (
              <Option value={coin.name}>{coin.name}</Option>
            ))}
          </Select>
        </Col>
      )}
      <Row gutter={[24, 24]}>
        {cryptoNews.value.map((news, i) => (
          <Col xs={24} sm={12} lg={8} key={i}>
            <Card hoverable className="news-card">
              <a href={news.url} target="_blank" rel="noreferrer">
                <div className="news-image-container">
                  <Title level={4} className="news-title">
                    {news.name.length > 90
                      ? `${news.description.substring(0, 90)}...`
                      : news.name}
                  </Title>
                  <img
                    src={news?.image?.thumbnail?.contentUrl || DemoImg}
                    alt="news"
                  />
                </div>
                <p>
                  {news.description.length > 100
                    ? `${news.description.substring(0, 100)}...`
                    : news.description}
                </p>
                <div className="provider-container">
                  <div>
                    <Avatar
                      src={
                        news?.provider[0]?.image?.thumbnail?.contentUrl ||
                        DemoImg
                      }
                      alt="news-Avatar"
                    />
                    <Text className="provider-name">
                      {news?.provider[0]?.name}
                    </Text>
                  </div>
                  <Text>
                    {moment(news.datePublished).startOf("ss").fromNow()}
                  </Text>
                </div>
              </a>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default News;
