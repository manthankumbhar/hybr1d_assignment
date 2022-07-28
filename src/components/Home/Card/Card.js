import moment from "moment";
import React from "react";
import "./Card.scss";

export default function Card({
  createdAt,
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
      <span className="card__points">{points}</span>
      <div className="card__content">
        <a href={url} className="card__content--h1">
          {title}
        </a>
        <div className="card__content--bottom">
          by{" "}
          <a
            className="card__content--bottom-author"
            href={`https://news.ycombinator.com/user?id=${author}`}
          >
            {author}
          </a>{" "}
          about {moment.utc(createdAt).local().startOf("seconds").fromNow()} |{" "}
          <a className="card__comments" href={`/post/${objectID}`}>
            {numComments} comments
          </a>
        </div>
      </div>
    </div>
  );
}
