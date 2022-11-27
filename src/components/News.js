import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spin from "./Loading";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

import general from "../json/general";
import business from "../json/business";
import entertainment from "../json/entertainment";
import health from "../json/health";
import science from "../json/science";
import sports from "../json/sports";
import technology from "../json/technology";

function News(props) {
  const [articles, setArticles] = useState([
    {
      description: null,
      url: "dummy",
      urlToImage: null,
      publishedAt: "2022-11-27T12:23:53Z",
      content: null,
    },
  ]);
  const [loading, setLoading] = useState(0);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    updateNews(0);
    document.title = `${
      props.category.charAt(0).toUpperCase() + props.category.slice(1)
    } - NewsMonkey`;
    // eslint-disable-next-line
  }, []);

  const updateNews = async (pageNo) => {
    setLoading(true);

    let parsedData = null;
    try {
      let url = `https://newsapi.org/v2/top-headlines?country=${
        props.country
      }&apiKey=6404eda13d1a40099e11e1fba26b51f2&page=${
        page + pageNo
      }&pagesize=${props.pageSize}&category=${props.category}`;
      let data = await fetch(url);
      parsedData = await data.json();
    } catch (error) {
      console.log(error);

      switch (props.category) {
        case "general":
          parsedData = general;
          break;
        case "business":
          parsedData = business;
          break;
        case "entertainment":
          parsedData = entertainment;
          break;
        case "health":
          parsedData = health;
          break;
        case "science":
          parsedData = science;
          break;
        case "sports":
          parsedData = sports;
          break;
        case "technology":
          parsedData = technology;
          break;
        default:
          // parsed Data = general;
          break;
      }

      console.log("firstTime");
    }
    setArticles(parsedData.articles);
    setPage(page + pageNo);
    setLoading(false);
    if (pageNo === 0) {
      setTotalResults(parsedData.totalResults);
    }
  };

  const fetchMoreData = async () => {
    let parsedData = null;
    try {
      let url = `https://newsapi.org/v2/top-headlines?country=${
        props.country
      }&apiKey=6404eda13d1a40099e11e1fba26b51f2&page=${page + 1}&pagesize=${
        props.pageSize
      }&category=${props.category}`;
      let data = await fetch(url);
      parsedData = await data.json();
    } catch (error) {
      console.log("fetchMoreData: ", error);
      parsedData = general;
    }
    console.log("fetchMoreData");
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
  };

  return (
    <>
      {/* <div className="container my-3"> */}
      <h2 className="text-center" style={{ marginTop: "90px" }}>
        NewsMonkey - Top{" "}
        {props.category.charAt(0).toUpperCase() + props.category.slice(1)}{" "}
        Headlines
      </h2>
      {loading && <Spin />}

      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spin />}
      >
        <div className="container">
          <div className="row">
            {articles.map((el, index) => {
              return (
                el.urlToImage !== null &&
                el.urlToImage !== "" && (
                  <div className="col col-md-4" key={el.publishedAt + index}>
                    <NewsItem
                      title={el.title}
                      description={el.description.substr(0, 200) + "..."}
                      imgURL={el.urlToImage}
                      timeStamp={el.publishedAt}
                      author={el.author}
                      url={el.url}
                    />
                  </div>
                )
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
}

News.defaultProps = {
  country: "in",
  pageSize: 5,
  category: "business",
};
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
