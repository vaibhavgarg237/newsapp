import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spin from "./Loading";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

function News(props) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(0);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const updateNews = async (pageNo) => {
    setLoading(true);
    let url = `https://newsapi.org/v2/top-headlines?country=${
      props.country
    }&apiKey=6404eda13d1a40099e11e1fba26b51f2&page=${page + pageNo}&pagesize=${
      props.pageSize
    }&category=${props.category}`;
    let data = await fetch(url);
    let parsedData = await data.json();

    setArticles(parsedData.articles);
    setPage(page + pageNo);
    setLoading(false);
    if (pageNo === 0) {
      setTotalResults(parsedData.totalResults);
    }
  };

  useEffect(() => {
    updateNews(0);
    document.title = `${
      props.category.charAt(0).toUpperCase() + props.category.slice(1)
    } - NewsMonkey`;
  }, []);

  const fetchMoreData = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${
      props.country
    }&apiKey=6404eda13d1a40099e11e1fba26b51f2&page=${page + 1}&pagesize=${
      props.pageSize
    }&category=${props.category}`;
    let data = await fetch(url);
    let parsedData = await data.json();
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
            {articles.map((el) => {
              return (
                <div className="col col-md-4" key={el.publishedAt}>
                  <NewsItem
                    title={el.title}
                    description={el.description}
                    imgURL={el.urlToImage}
                    timeStamp={el.publishedAt}
                    author={el.author}
                    url={el.url}
                  />
                </div>
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
  category: "general",
};
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
