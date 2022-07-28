import React, { useCallback, useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import "./Home.scss";
import axios from "axios";
import { useNavigate } from "react-router";
import Card from "./Card/Card";
import ReactPaginate from "react-paginate";
import debounce from "lodash.debounce";

export default function Home({ updatedTag }) {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTag(updatedTag);
  }, [updatedTag]);

  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      try {
        const res = await axios.get(
          `https://hn.algolia.com/api/v1/search_by_date?query=${query}&page=${currentPage}&tags=${
            tag === "" ? "story" : tag
          }&hitsPerPage=25`
        );
        setData(res.data["hits"]);
        setTotalPages(res.data["nbPages"]);
      } catch (error) {
        navigate("/error");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [query, navigate, currentPage, tag]);

  const handlePageChange = useCallback((e) => {
    setCurrentPage(e.selected);
    window.scrollTo(0, 0);
  }, []);

  const onChangeQuery = useCallback((e) => setQuery(e.target.value), []);
  const debouncedOnChange = debounce(onChangeQuery, 400);

  return (
    <div className="home">
      <div>
        <input
          className="home__input"
          type="text"
          onChange={debouncedOnChange}
          placeholder="Enter query to search..."
        />
        {loading ? (
          <div className="home__loading">
            <CircularProgress size={30} color="secondary" />
          </div>
        ) : (
          <div className="home__content">
            {data
              .map((item) => {
                return (
                  <Card
                    createdAt={item.created_at}
                    objectID={item.objectID}
                    title={item.title}
                    author={item.author}
                    url={item.url}
                    points={item.points}
                    numComments={item.num_comments}
                    key={item.objectID}
                  />
                );
              })
              .sort((a, b) => b.props.points - a.props.points)}
          </div>
        )}
      </div>
      <ReactPaginate
        nextLabel="Next"
        previousLabel="Previous"
        breakLabel="..."
        forcePage={currentPage}
        pageCount={totalPages}
        renderOnZeroPageCount={null}
        onPageChange={(e) => handlePageChange(e)}
        containerClassName={"pagination"}
        activeClassName={"pagination__active"}
        pageClassName={"pagination__page"}
        nextClassName={"pagination__btn"}
        previousClassName={"pagination__btn"}
        breakClassName={"pagination__btn"}
      />
    </div>
  );
}
