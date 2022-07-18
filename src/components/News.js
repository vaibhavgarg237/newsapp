import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spin from "./Loading";
import PropTypes from "prop-types";

export default class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 5,
    category: "general",
  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  constructor(props) {
    super(props);
    // console.log("helllo");
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
    document.title = `${
      this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)
    } - NewsMonkey`;
  }

  async updateNews(pageNo) {
    this.setState({ loading: true });
    let url = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&apiKey=ce45ade3accc4c6a913c4113ea1b07e3&page=${
      this.state.page + pageNo
    }&pagesize=${this.props.pageSize}&category=${this.props.category}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      page: this.state.page + pageNo,
      loading: false,
    });
    if (pageNo === 0) {
      this.setState({
        totalResults: parsedData.totalResults,
      });
    }
  }

  async componentDidMount() {
    this.updateNews(0);
  }

  handlePrevClick = async () => {
    this.updateNews(-1);
  };

  handleNextClick = async () => {
    if (
      this.state.page + 1 <=
      Math.ceil(this.state.totalResults / this.props.pageSize)
    ) {
      this.updateNews(1);
    }
  };

  render() {
    return (
      <div className="container my-3">
        <h2 className="text-center">
          NewsMonkey - Top{" "}
          {this.props.category.charAt(0).toUpperCase() +
            this.props.category.slice(1)}{" "}
          Headlines
        </h2>
        {this.state.loading && <Spin />}
        <div className="row">
          {!this.state.loading &&
            this.state.articles.map((el) => {
              return (
                <div className="col col-md-4" key={el.publishedAt}>
                  <NewsItem
                    title={el.title}
                    description={el.description}
                    imgURL={el.urlToImage}
                    timeStamp={el.publishedAt}
                    author={el.author}
                  />
                </div>
              );
            })}
        </div>
        <div className=" d-flex justify-content-between">
          <button
            type="button"
            disabled={this.state.page < 1}
            className="btn btn-dark"
            onClick={this.handlePrevClick}
          >
            &larr; Previus
          </button>
          <button
            type="button"
            className="btn btn-dark"
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}
