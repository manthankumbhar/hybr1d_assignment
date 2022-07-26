import { Route, Routes } from "react-router";
import "./App.scss";
import Home from "./components/Home/Home";
import Post from "./components/Post/Post";

function App() {
  return (
    <div className="App">
      <h1 className="App__h1">Hybr1d Assignment</h1>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/post/:id" element={<Post />} />
        <Route path="*" element={<h1>Error 404, page not found.</h1>} />
      </Routes>
    </div>
  );
}

export default App;
