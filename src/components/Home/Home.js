import { CircularProgress } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "./Card/Card";
import "./Home.scss";

export default function Home() {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const res = await axios.get(
        `http://hn.algolia.com/api/v1/search?query=${query}&page=${page}`
      );
      setData(res.data["hits"]);
      setLoading(false);
    }
    fetchData();
  }, [query, page]);

  const toggleNext = () => {
    setPage(page + 1);
  };

  const togglePrevious = () => {
    setPage(page === 0 ? 0 : page - 1);
  };

  return (
    <div className="home">
      <input
        className="home__input"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter query to search..."
      />
      {loading ? (
        <div className="home__loading">
          <CircularProgress size={30} color="secondary" />
        </div>
      ) : (
        data.map((item, key) => {
          return (
            <Card
              objectID={item.objectID}
              title={item.title}
              author={item.author}
              url={item.url}
              points={item.points}
              key={key}
            />
          );
        })
      )}
      <div className="home__bottom">
        <button className="home__bottom--btn" onClick={togglePrevious}>
          Previous
        </button>
        <button className="home__bottom--btn" onClick={toggleNext}>
          Next
        </button>
      </div>
    </div>
  );
}
