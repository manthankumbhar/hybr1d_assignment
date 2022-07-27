import { Route, Routes } from "react-router";
import { Link } from "react-router-dom";
import "./App.scss";
import Home from "./components/Home/Home";
import Post from "./components/Post/Post";

function App() {
  return (
    <div className="App">
      <Link to="/" className="App__link">
        Hybr1d Assignment
      </Link>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/post/:id" element={<Post />} />
        <Route path="*" element={<h1>Error 404, page not found.</h1>} />
      </Routes>
    </div>
  );
}

export default App;
