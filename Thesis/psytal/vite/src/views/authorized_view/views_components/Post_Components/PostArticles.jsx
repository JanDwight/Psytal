import React, { useState, useEffect } from 'react';
import avatar from "@assets/icons8avatar.png";
import axiosClient from '../../../../axios';
import EditPostModal from './EditPostModal';
import ArchivePost from './ArchivePost';
import ImageGallery from './ImageGallery';
import Timestamp from './Timestamp';
import ReadMore from './ReadMore'; 

export default function PostArticles() {
  const [posts, setPosts] = useState([]);
  const [showMenu, setShowMenu] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [archiveConfirmation, setArchiveConfirmation] = useState(false);
  const [editedPostIndex, setEditedPostIndex] = useState(null);

  useEffect(() => {
    // Define a function to fetch posts
    const fetchPosts = async () => {
      try {
        const response = await axiosClient.get('/posts');
        if (response.status === 200) {
          setPosts(response.data);
        } else {
          throw new Error('Network response was not ok');
        }
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchPosts();
  }, [editModalOpen, archiveConfirmation]);

  const toggleMenu = (index) => {
    setShowMenu(showMenu === index ? null : index);
  };

  const handleSave = (updatedPost) => {
    console.log('Saved post:', updatedPost);
    if (editedPostIndex !== null) {
      const updatedPosts = [...posts];
      updatedPosts[editedPostIndex] = updatedPost;
      setPosts(updatedPosts);
    }
  };

  const openEditModal = (post, index) => {
    setSelectedPost(post);
    setEditModalOpen(true);
    setEditedPostIndex(index);
  };

  const handleArchiveConfirmation = (post) => {
    console.log('Archiving post confirmation. Post ID:', post.id);
    setSelectedPost(post);
    setArchiveConfirmation(true);
  };

  const handleArchiveSuccess = () => {
    console.log('Archive success!');
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== selectedPost.id));
  };

  return (
    <div className="">
      {posts.map((post, index) => (
        <div key={post.id} className="px-10 my-8 py-8 bg-gray-200 rounded-2xl shadow-lg">
          {/* Ellipsis Menu */}
          <div
            className="relative"
            onClick={() => toggleMenu(index)}
          >
            <div
              className="absolute top-5 right-5 w-8 h-8 z-0 bg-gray-200 rounded-full flex items-center justify-center cursor-pointer"
            >
              <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
            </div>
            {showMenu === index && (
              <div className="menu-dropdown absolute top-10 right-2 bg-gray-300 p-2 rounded-md shadow-md">
                <div
                  className="cursor-pointer hover:bg-green-200 hover:w-full"
                  onClick={() => openEditModal(post, index)}
                >
                  Edit
                </div>
                <div
                  className="cursor-pointer hover:bg-green-200 hover:w-full"
                  onClick={() => handleArchiveConfirmation(post)}
                >
                  Delete
                </div>
              </div>
            )}
          </div>

          {/* Profile section and Description */}
          <div className="flex h-1/2">
            {/* {<a href="#">
              <img
                className="mx-4 w-10 h-10 object-cover rounded-full sm-block"
                src={post.author?.profile_picture || avatar}
                alt="avatar"
              />
            </a>} */}
            <div className="w-3/4">
              <h1 className="text-green-700 font-bold text-2xl">{post.author_name || 'Author Name'}</h1>
              <Timestamp timestamp={post.created_at} updatedAt={post.updated_at} />
              <div>
                <div className="pt-3">
                  <h1 className="font-bold text-3xl">{post.title}</h1>
                </div>
              </div>
              <div className="content text-2xl">
                <ReadMore maxCharacterCount={200}>{post.description}</ReadMore>
              </div>
            </div>
          </div>

          {/* Images section */}
          {/*<ImageGallery images={post.images} />*/}
        </div>
      ))}

      {editModalOpen && selectedPost && (
        <EditPostModal
          selectedPost={selectedPost}
          closeModal={() => setEditModalOpen(false)}
          handleSave={handleSave}
        />
      )}

      {archiveConfirmation && selectedPost && (
              <ArchivePost
                showArchivepost={archiveConfirmation}
                onClose={() => setArchiveConfirmation(false)}
                postId={selectedPost.id} 
                onArchiveSuccess={handleArchiveSuccess}
              />
            )}
          </div>
        );
      }
