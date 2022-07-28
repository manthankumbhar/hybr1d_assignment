import React from "react";
import "./Card.scss";

export default function Card({
  objectID,
  title,
  url,
  author,
  points,
  numComments,
}) {
  if (!title) return null;

  return (
    <div className="card">
      <div>
        <a href={url} className="card__h1">
          <span>{title}</span>
        </a>
        <a
          href={url}
          style={url === null ? { display: "none" } : null}
          className="card__anchor"
        >
          (check more)
        </a>
      </div>
      <p className="card__points">
        <span className="card__upArrow">&#9650;</span>
        {points} points by{" "}
        <a
          className="card__comments"
          href={`https://news.ycombinator.com/user?id=${author}`}
        >
          {author}
        </a>{" "}
        |{" "}
        <a className="card__comments" href={`/post/${objectID}`}>
          {numComments} comments
        </a>
      </p>
    </div>
  );
}
