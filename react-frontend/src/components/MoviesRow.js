import React from "react";
import Fade from "react-reveal";
import DetailContent from "./DetailContent";
import Pagenation from "./Pagenation";
import "../styles/Detail.css";

const MoviesRow = ({
  movies,
  totalpage,
  page,
  totalresults,
  pageHandler,
  title,
}) => {
  console.log("props movies:", movies);
  return (
    <div>
      <Fade bottom>
        <div className="row">
          <div className="col">
            <h3 style={{ color: "white", fontWeight: "bold" }}>{title}</h3>
          </div>
          <div className="col">
            <Pagenation
              totalpage={totalpage}
              page={page}
              totalresults={totalresults}
              pageHandler={pageHandler}
            />
          </div>
        </div>

        <div className="row">
          {movies
            ? movies.map((item) => {
                return (
                  <div className="slick">
                    <DetailContent id={item.id} movie={item}></DetailContent>
                  </div>
                );
              })
            : ""}
        </div>
      </Fade>
    </div>
  );
};
export default MoviesRow;
