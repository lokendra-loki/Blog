import "./home.scss";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import { useEffect, useState } from "react";
import axios from "axios";
import TopBar from "../../components/topbar/TopBar";
import SearchResult from "../../components/searchedResult/SearchResult";

function Home() {
  //Fetching all posts
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchAllPosts = async () => {
      const res = await axios.get("/posts/getAll");
      res.data.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
      setPosts(res.data);
    };
    fetchAllPosts();
  }, []);

  //Searching posts
  const [searchresult, setSearchresult] = useState("");

  const searchData = (data) => {
    return data.filter((item) =>
      item.title
        .toLowerCase()
        .includes(
          searchresult.toLowerCase() ||
            item.desc
              .toLowerCase()
              .includes(
                searchresult.toLowerCase() ||
                  item.location
                    .toLowerCase()
                    .includes(
                      searchresult.toLowerCase() ||
                        item.username
                          .toLowerCase()
                          .includes(searchresult.toLowerCase())
                    )
              )
        )
    );
  };

  return (
    <>
      <TopBar setSearchresult={setSearchresult} />
      <Header />
      {searchresult ? (
        <SearchResult data={searchData(posts)} />
      ) : (
        <>
          <div className="home">
            <div className="postHelpWrapper">
              <Posts posts={posts} />
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Home;
