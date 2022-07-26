import { useState } from "react";
import { Route, Routes } from "react-router";
import { Link } from "react-router-dom";
import "./App.scss";
import Home from "./components/Home/Home";
import Post from "./components/Post/Post";

function App() {
  const [updatedTag, setUpdatedTag] = useState("");

  return (
    <div className="App">
      <div className="App__top">
        <h1 className="App__top--h1">Hybr1d Assignment</h1>
        <Link
          className="App__top--btn"
          to="/"
          onClick={() => setUpdatedTag("story")}
        >
          Home
        </Link>
        <Link
          className="App__top--btn"
          to="/"
          onClick={() => setUpdatedTag("ask_hn")}
        >
          Ask HN
        </Link>
        <Link
          className="App__top--btn"
          to="/"
          onClick={() => setUpdatedTag("show_hn")}
        >
          Show HN
        </Link>
        <Link
          className="App__top--btn"
          to="/"
          onClick={() => setUpdatedTag("poll")}
        >
          Poll
        </Link>
      </div>
      <Routes>
        <Route path="/" exact element={<Home updatedTag={updatedTag} />} />
        <Route path="/post/:id" element={<Post />} />
        <Route path="*" element={<h1>Error 404, page not found.</h1>} />
      </Routes>
    </div>
  );
}

export default App;
