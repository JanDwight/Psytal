import React, { useEffect, useState } from 'react';
import AddingPost from '../views_components/AddingPost';
import PostArticles from '../views_components/Post_Components/PostArticles';
import { useStateContext } from '../../../context/ContextProvider';


export default function Home() {

  const { userRole } = useStateContext(); // Access the user role from the context
  if (userRole !== 1) {
    // If the user is not an admin, render only PostArticles
    return (
      <div className="flex flex-col justify-center items-center ml-10">
        <div className="w-full mt-10">
          <PostArticles/>
        </div>
      </div>
    );
  }

  // If the user is an admin, render both AddingPost and PostArticles
  return (
    <div className="flex flex-col justify-center items-center ml-10">
      <div className="w-full">
        <AddingPost />
      </div>
      <div className="w-full mt-10">
        <PostArticles/>
      </div>
    </div>
  );
}
