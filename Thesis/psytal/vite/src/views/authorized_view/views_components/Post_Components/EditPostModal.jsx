import React, { useState, useEffect } from 'react';
import axiosClient from '../../../../axios';

export default function EditPostModal({ selectedPost, closeModal, handleSave }) {
  const [editedPost, setEditedPost] = useState({
    title: selectedPost.title || '',
    description: selectedPost.description || '',
    images: selectedPost.images || [],
    selectedImages: selectedPost.images.map(() => null),
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    if (selectedPost) {
      setEditedPost({
        title: selectedPost.title || '',
        description: selectedPost.description || '',
        images: selectedPost.images || [],
        selectedImages: selectedPost.images.map(() => null),
      });
    }
  }, [selectedPost]);

  const handleImageChange = (ev, index) => {
    const selectedImage = ev.target.files[0];

    setEditedPost((prevEditedPost) => {
      const updatedImages = [...prevEditedPost.images];
      updatedImages[index] = { file: selectedImage };

      const updatedSelectedImages = [...prevEditedPost.selectedImages];
      updatedSelectedImages[index] = URL.createObjectURL(selectedImage);

      return {
        ...prevEditedPost,
        images: updatedImages,
        selectedImages: updatedSelectedImages,
      };
    });
  };

  const removeImage = (index) => {
    setEditedPost((prevEditedPost) => {
      const updatedImages = [...prevEditedPost.images];
      updatedImages.splice(index, 1);

      const updatedSelectedImages = [...prevEditedPost.selectedImages];
      updatedSelectedImages.splice(index, 1);

      return {
        ...prevEditedPost,
        images: updatedImages,
        selectedImages: updatedSelectedImages,
      };
    });
  };

  const updateImage = (index) => {
    const existingImage = editedPost.images[index];

    // If there's an existing image, replace it; otherwise, add a new image
    if (existingImage) {
      document.getElementById(`image${index + 1}`).click();
    } else {
      // Check if the current number of images is less than 3 before allowing to add
      if (editedPost.images.length < 3) {
        document.getElementById(`image${index + 1}`).click();
      } else {
        setError('You can select up to three images.');
      }
    }
  };

  const savePost = async () => {
    setLoading(true);

    try {
      if (!editedPost.title || !editedPost.description) {
        setError('Please enter both a title and description.');
        setLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append('_method', 'put');
      formData.append('title', editedPost.title);
      formData.append('description', editedPost.description);

      editedPost.images.forEach((image, index) => {
        formData.append(`images[${index}]`, image.file);

        if (image.id) {
          formData.append(`imageIds[${index}]`, image.id);
        }
      });

      const response = await axiosClient.post(`/posts/${selectedPost.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        handleSave({
          id: selectedPost.id,
          title: editedPost.title,
          description: editedPost.description,
          images: response.data.post.images || [],
        });
        setSuccessMessage({
          message: 'Editing this post was successful!',
        });

        setTimeout(() => {
          setSuccessMessage(null);
          closeModal();
          window.location.reload();
        }, 2000);
        
      } else {
        setError('An error occurred while posting.');
      }
    } catch (error) {
      console.error(error);
      setError('An error occurred while posting.');
    } finally {
      setLoading(false);
    }
  }


  if (!selectedPost) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full overflow-y-auto bg-black bg-opacity-50">
      <div className="lg:w-1/2 px-4 py-1 shadow-lg w-[20%] h-fit bg-[#FFFFFF] rounded-xl mt-[10%] mx-auto p-5">
        <div className="w-full px-4 mx-auto mt-6">
          <h2 className="text-center text-3xl font-semibold my-3">Edit Post</h2>

          <div className="mb-4">
            <input
              id="editedTitle"
              name="editedTitle"
              type="text"
              value={editedPost.title}
              onChange={(ev) => setEditedPost({ ...editedPost, title: ev.target.value })}
              className="block w-full rounded-xl border-1 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-100 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:leading-6"
              placeholder="Title"
            />
          </div>

          <div className="mb-4">
            <textarea
              id="editedDescription"
              name="editedDescription"
              value={editedPost.description}
              onChange={(ev) => setEditedPost({ ...editedPost, description: ev.target.value })}
              className="block w-full rounded-xl border-1 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:leading-6"
              rows="4"
              placeholder="Edit post ..."
            />
          </div>

          <div className="mb-4">
            <div className="flex space-x-4">
              {editedPost.images.map((image, index) => (
                <div key={index} className="relative overflow-hidden rounded-xl w-48 h-48">
                  {/* Make each photo clickable */}
                  <label htmlFor={`image${index + 1}`} className="cursor-pointer">
                    {/* Display existing images */}
                    {image.image_path && (
                      <>
                        <img
                          src={
                            image.image_path instanceof File
                              ? URL.createObjectURL(image.image_path)
                              : `http://localhost:8000/storage/${image.image_path}`
                          }
                          alt={`Image ${index + 1}`}
                          className="object-cover w-full h-full"
                        />
                        <button
                          onClick={() => removeImage(index)}
                          className="absolute top-0 right-0 p-2 bg-red-500 text-white rounded-full"
                        >
                          X
                        </button>
                      </>
                    )}
                    {/* Display selected images for editing */}
                    {editedPost.selectedImages && editedPost.selectedImages[index] && (
                      <>
                        <img
                          src={editedPost.selectedImages[index]}
                          alt={`Selected Image ${index}`}
                          className="object-cover w-full h-full"
                        />
                        <button
                          onClick={() => removeImage(index)}
                          className="absolute top-0 right-0 p-2 bg-red-500 text-white rounded-full"
                        >
                          X
                        </button>
                      </>
                    )}
                    {/* Hide the default file input */}
                    <input
                      id={`image${index + 1}`}
                      type="file"
                      accept="image/*"
                      onChange={(ev) => handleImageChange(ev, index)}
                      className="hidden"
                    />
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center flex justify-end my-7">
            <button
              type="button"
              onClick={savePost}
              className="bg-lime-600 hover:bg-lime-700 text-white font-bold py-2 px-4 rounded-full"
            >
              {loading ? 'Updating...' : 'Update'}
            </button>
            <button
              onClick={closeModal}
              className="bg-red-600 hover-bg-red-700 text-white font-bold py-2 px-4 ml-4 rounded-full"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
      {successMessage && (
        <div className="fixed top-0 left-0 w-full h-full overflow-y-auto bg-black bg-opacity-50">
          <div className="lg:w-1/2 px-4 py-1 shadow-lg w-[20%] h-fit bg-[#FFFFFF] rounded-xl mt-[10%] mx-auto p-5">
            <div className="w-full px-4 mx-auto mt-6">
              <div className="text-center text-xl text-green-600 font-semibold my-3">
                {successMessage.message}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
