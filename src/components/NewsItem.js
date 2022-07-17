import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, description, imgURL, author, timeStamp } = this.props;
    let date = new Date(timeStamp);

    return (
      <div className="my-3">
        <div className="card">
          <img src={imgURL} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <a href={imgURL} className="btn btn-sm btn-primary">
              Read More
            </a>
          </div>
          <p className="card-text">
            <small className="text-muted">
              By {!author ? "unknown" : author} on {date.toDateString()}
            </small>
          </p>
        </div>
      </div>
    );
  }
}

export default NewsItem;
