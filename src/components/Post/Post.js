import { CircularProgress } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import "./Post.scss";
import moment from "moment";

export default function Post() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [points, setPoints] = useState("");
  const [author, setAuthor] = useState("");
  const [createdAt, setCreatedAt] = useState("");

  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      const res = await axios.get(`https://hn.algolia.com/api/v1/items/${id}`);
      console.log(res);
      setTitle(res.data["title"]);
      setPoints(res.data["points"]);
      setAuthor(res.data["author"]);
      setCreatedAt(res.data["created_at"]);
      setData(res.data["children"]);
      setLoading(false);
    }
    fetchData();
  }, [id]);

  return (
    <div className="post">
      {loading ? (
        <div className="post__loading">
          <CircularProgress size={30} color="secondary" />
        </div>
      ) : (
        <div className="post__content">
          <h1 className="post__content--h1">{title}</h1>
          <h3 className="post__content--h3">
            <span className="post__content--upArrow">&#9650;</span>
            {points === null ? 0 : points} points by{" "}
            {author === null ? (
              "None"
            ) : (
              <a
                className="post__content--a"
                href={`https://news.ycombinator.com/user?id=${author}`}
              >
                {author}
              </a>
            )}{" "}
            | {moment.utc(createdAt).local().startOf("seconds").fromNow()}
          </h3>
          {data.length === 0 ? (
            <p className="post__content--p">No comments yet.</p>
          ) : (
            <p className="post__content--p">Comments:</p>
          )}
          {data.map((item, key) => {
            return (
              <div key={key} className="post__content--menu">
                <p
                  className="post__content--menu-comment"
                  dangerouslySetInnerHTML={{
                    __html: item.text === null ? "<p>None</p>" : item.text,
                  }}
                />
                <p className="post__content--menu-data">
                  {moment
                    .utc(item.created_at)
                    .local()
                    .startOf("seconds")
                    .fromNow()}{" "}
                  |{" "}
                  {item.author === null ? (
                    "None"
                  ) : (
                    <a
                      className="post__content--a"
                      href={`https://news.ycombinator.com/user?id=${item.author}`}
                    >
                      {item.author}
                    </a>
                  )}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
