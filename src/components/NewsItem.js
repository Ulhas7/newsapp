import React from "react";

const NewsItem =(props)=> {
    let { title, description, imageurl, newsUrl, author, date, source } =props;
    return (
      <>
        <div className="my-3">
          <div className="card">
            <div style={{display:"flex",justifyContent:"flex-end",position:"absolute",right:"0"}}>
          <span className="badge rounded-pill bg-danger" >
                  {source}
                </span>
                </div>
            <img
              src={
                !imageurl
                  ? "https://cdn.ndtv.com/common/images/ogndtv.png"
                  : imageurl
              }
              className="card-img-top"
              alt=".."
            />
            <div className="card-body">
              <h5 className="card-title">
                {title}
               
              </h5>
              <p className="card-text">{description}</p>
              <p className="card-text">
                <small className="text-body-secondary">
                  by {!author ? (!source ? "Unkown" : source) : author} on{" "}
                  {new Date(date).toGMTString()}
                </small>
              </p>
              <a href={newsUrl} target="blank" className="btn btn-sm btn-dark">
                Read More
              </a>
            </div>
          </div>
        </div>
      </>
    );
  }


export default NewsItem;
