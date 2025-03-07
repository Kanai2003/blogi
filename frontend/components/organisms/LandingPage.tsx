"use client"

import React, {useEffect, useState} from "react";
import Navbar from "../molecules/Navbar";
import { getAllPosts } from "@/services/post";

function LandingPage() {

  const [blogData, setBlogData] = useState([]);

  const handleFetchBlogData = async () => {
    const data = await getAllPosts();
    setBlogData(data);
    console.log(">>>> handleFetchBlogData : ", data);
  }

  useEffect(() => {
    handleFetchBlogData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <h1>LandingPage</h1>
      {JSON.stringify(blogData)}
    </div>
  );
}

export default LandingPage;
