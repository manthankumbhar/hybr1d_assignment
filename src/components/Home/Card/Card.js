import React from "react";
import "./Card.scss";

export default function Card({ objectID, title, url, author, points }) {
  return (
    <div
      className="card"
      // onClick={() =>
      //   window.open(`http://hn.algolia.com/api/v1/items/${objectID}`, "_blank")
      // }
    >
      <div>
        <a href={`/post/${objectID}`} className="card__h1">
          <span>{title === null ? "undefined" : title}</span>
        </a>
        <a
          href={url === null ? null : url}
          target="_blank"
          rel="noreferrer"
          className="card__anchor"
        >
          ({url === null ? "undefined" : url})
        </a>
      </div>
      <p className="card__points">
        <span className="card__upArrow">&#9650;</span>
        {points} points by {author}
      </p>
    </div>
  );
}
