import React, { useEffect, useState } from 'react';
import AddingPost from '../views_components/AddingPost';
import PostArticles from '../views_components/Post_Components/PostArticles';
import { useStateContext } from '../../../context/ContextProvider';

export default function Home() {
  const {userRole} = useStateContext();

  return (
    <div>
      <div className="flex flex-col justify-center items-center ml-10">
          <div className="w-full">
            <AddingPost />
          </div>

          <div className="w-full mt-10">
          <PostArticles/>
          </div>
        </div>
    </div>
  )
}
