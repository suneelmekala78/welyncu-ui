import React, { useState } from "react";
import UploadPost from "./UploadPost";
import PostCard from "../posts/PostCard";
import AllStories from "../stories/AllStories";
import PostUpload from "../posts/PostUpload";
import { useEffect } from "react";
import { fetchPosts } from "../../helper/apis";
import { useDispatch } from "react-redux";
import Loader from "../loaders/Loader";

const HomeMid = ({ setStoryView, user }) => {
  const dispatch = useDispatch();

  const [startPost, setStartPost] = useState(false);
  const [allPosts, setAllPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  console.log(allPosts);
  

  const getPosts = async () => {
    setIsLoading(true);
    try {
      const res = await fetchPosts(dispatch);
      setAllPosts(res?.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      <div className="home-mid-section">
        <div className="all-stories mb-10">
          <AllStories setStoryView={setStoryView} />
        </div>

        <div className="post-upload-feild box-shadow">
          <UploadPost user={user} setStartPost={setStartPost} />
        </div>

        {isLoading ? (
          <div className="loading-container">
            <Loader />
          </div>
        ) : allPosts?.length > 0 ? (
          allPosts?.map((post, index) => (
            <div className="post box-shadow" key={index}>
              <PostCard getPosts={getPosts} post={post} />
            </div>
          ))
        ) : (
          <div className="noposts-text box-shadow">No posts available!</div>
        )}
      </div>

      {startPost && <PostUpload setStartPost={setStartPost} />}
    </>
  );
};

export default HomeMid;
