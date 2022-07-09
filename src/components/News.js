import React, { Component } from "react";
import NewsItem from "./NewsItem";

export default class News extends Component {
  render() {
    return (
      <div className="container my-3">
        <h2>NewsMonkey</h2>
        <div className="row">
          <div className="col col-md-4">
            <NewsItem title="Vaibhav" description="sfw eng" />
          </div>
          <div className="col col-md-4">
            <NewsItem title="Vaibhav" description="sfw eng" />
          </div>
          <div className="col col-md-4">
            <NewsItem title="Vaibhav" description="sfw eng" />
          </div>
        </div>
        <div className="row">
          <div className="col col-md-4">
            <NewsItem title="Vaibhav" description="sfw eng" />
          </div>
          <div className="col col-md-4">
            <NewsItem title="Vaibhav" description="sfw eng" />
          </div>
          <div className="col col-md-4">
            <NewsItem title="Vaibhav" description="sfw eng" />
          </div>
          <div className="col col-md-4">
            <NewsItem title="Vaibhav" description="sfw eng" />
          </div>
        </div>
      </div>
    );
  }
}
