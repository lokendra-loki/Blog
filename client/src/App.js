import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import PostRead from "./pages/postread/PostRead";
import Write from "./pages/write/Write";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import Setting from "./pages/setting/Setting";
import { Context } from "./context/Context";
import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import "./themeStyle/dark.scss";
import { DarkModeContext } from "./darkModeContext/darkModeContext";

function App() {
  const { user } = useContext(Context);
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "dark" : "light "}>
      <Routes>
        <Route exact path="/" element={user ? <Home /> : <Register />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/setting" element={user ? <Setting /> : <Register />} />
        <Route path="/write" element={user ? <Write /> : <Register />} />
        <Route path="/post/:id" element={user ? <PostRead /> : <Register />} />
        <Route path="/about" element={user ? <About /> : <Register />} />
      </Routes>
    </div>
  );
}
export default App;
