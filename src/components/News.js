import React ,{useEffect, useState}from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News =(props)=> {

  const [articles,setArticles] =useState([])
  const [loading,setLoading] =useState(true)
  const [page,setPage] =useState(1)
  const [totalResults,setTotalResults] =useState(0)

  
  const capitalizeFirstLetter=(string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
  const updateNews=async()=>{
    props.setProgress(10)
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(30)
    let parsedData = await data.json();
    props.setProgress(70)
    // console.log(data)
    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setLoading(false)
    
    props.setProgress(100)
  }
  useEffect(()=>{
  document.title=`NewsMonkey-${capitalizeFirstLetter(props.category)}`
    updateNews()

  },[])

  
  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page+1)
      let data = await fetch(url);
  
      let parsedData = await data.json();
      // console.log(data)

      setArticles(articles.concat(parsedData.articles))
      setTotalResults(parsedData.totalResults)
  };
  
    return (
      <>
        <h1 className="text-center "style={{marginTop:"65px"}}>NewsMonkey - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
        {loading && <Spinner />}

        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length!== totalResults}
          loader={loading &&<Spinner/>}
        >
          <div className="container">
        <div className="row my-2 mx-4">
          
          {articles.map((element) => {
              return (
                <div className="col-md-4 " key={element.url}>
                  <NewsItem
                    title={element.title ? element.title : ""}
                    description={element.description ? element.description : ""}
                    imageurl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    source={element.source.name}
                    date={element.publishedAt}
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
  pageSize: 9,
  category: "general",
};
News.PropsTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
