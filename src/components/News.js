import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spin from "./Loading";

export default class News extends Component {
  constructor() {
    super();
    // console.log("helllo");
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
  }

  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=ce45ade3accc4c6a913c4113ea1b07e3&pagesize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData.articles);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
  }

  handlePrevClick = async () => {
    console.log("!");
    // if (this.state.page - 1 >= 1) {
    console.log("!!");
    this.setState({ loading: true });
    let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=ce45ade3accc4c6a913c4113ea1b07e3&page=${
      this.state.page - 1
    }&pagesize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData.articles);
    this.setState({
      articles: parsedData.articles,
      page: this.state.page - 1,
      loading: false,
    });
    // }
  };

  handleNextClick = async () => {
    // console.log("without cond");
    // console.log(this.state.page + 1);
    // console.log(this.state.totalResults);
    if (
      this.state.page + 1 <=
      Math.ceil(this.state.totalResults / this.props.pageSize)
    ) {
      // console.log("clicked next");
      this.setState({ loading: true });
      let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=ce45ade3accc4c6a913c4113ea1b07e3&page=${
        this.state.page + 1
      }&pagesize=${this.props.pageSize}`;
      let data = await fetch(url);
      let parsedData = await data.json();
      console.log(parsedData.articles);
      this.setState({
        articles: parsedData.articles,
        page: this.state.page + 1,
        loading: false,
      });
    }
  };

  render() {
    return (
      <div className="container my-3">
        <h2 className="text-center">NewsMonkey</h2>
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
