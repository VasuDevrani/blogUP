import Header from "./component/Header";
import Nav from "./component/Nav";
import Footer from "./component/Footer";
import Home from "./component/Home";
import NewPost from "./component/NewPost";
import Descrip from "./component/Descrip";
import About from "./component/About";
import Missing from "./component/Missing";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {format} from 'date-fns';

function App() {
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [posts, setPosts] = useState(JSON.parse(localStorage.getItem("postList")) || []
    // {
    //   id: 1,
    //   title: "My First Post",
    //   datetime: "July 01, 2021 11:17:36 AM",
    //   body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!",
    // },
    // {
    //   id: 2,
    //   title: "My 2nd Post",
    //   datetime: "July 01, 2021 11:17:36 AM",
    //   body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!",
    // },
    // {
    //   id: 3,
    //   title: "My 3rd Post",
    //   datetime: "July 01, 2021 11:17:36 AM",
    //   body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!",
    // },
    // {
    //   id: 4,
    //   title: "My Fourth Post",
    //   datetime: "July 01, 2021 11:17:36 AM",
    //   body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!",
    // },
  );
  const [postTitle,setPostTitle]=useState('');
  const [postBody,setPostBody]=useState('');
  const history= useNavigate();

  function handleDelete(id)
  {
      const postList= posts.filter(post => post.id !==id)
      setPosts(postList);
      history('/');
  }

  function handleSubmit(e)
  {
    e.preventDefault();
    const id=posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime=format(new Date(), 'MMMM dd, yyyy pp');
    const newPost = {id,title: postTitle, datetime, body: postBody};
    const allPosts=[...posts, newPost];
    setPosts(allPosts);
    localStorage.setItem("postList",JSON.stringify(allPosts));
    setPostTitle('');
    setPostBody('');
    history('/');
  }

  useEffect(()=>{
    const filteredResults = posts.filter((post) =>
    ((post.body).toLowerCase()).includes(search.toLowerCase())
    || ((post.title).toLowerCase()).includes(search.toLowerCase()));

    setSearchResults(filteredResults.reverse());
  }, [posts, search]);

  return (
    <div className="App">
      <Header title="React JS Blog" />
      <Nav search={search} setSearch={setSearch} />
      <Routes>
        <Route exact path="/" element={<Home post={searchResults} setPosts={setPosts}/>} />
        <Route exact path="/Post" element={<NewPost
          handleSubmit={handleSubmit}
          postTitle={postTitle}
          setPostTitle={setPostTitle}
          postBody={postBody}
          setPostBody={setPostBody}
        />} />
        <Route exact path="/post/:id" element={<Descrip posts={posts} handleDelete={handleDelete}/>} />
        <Route path="/About" element={<About />} />
        <Route path="*" element={<Missing />} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
