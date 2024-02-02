import React, { useState } from 'react';

function ImageGallery({ images }) {
  const numImages = Array.isArray(images) ? images.length : 0;

  const [selectedImage, setSelectedImage] = useState(null);

  const openModal = (index) => {
    setSelectedImage(index);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="flex justify-center items-center py-5 h-1/2">
      {numImages > 0 && (
        <div className="w-full">
          {numImages === 1 ? ( //For 1 image only
            <img
              src={`http://localhost:8000/storage/${images[0].image_path}`}
              alt={`Image 0`}
              className="w-full h-full rounded-3xl object-contain"
              onClick={() => openModal(0)}
            />
          ) : (
            <div className="grid grid-cols-2 gap-2">
              {numImages === 2 //For 2 images
                ? images.map((image, i) => (
                    <div key={i} className="w-full p-2">
                      <img
                        src={`http://localhost:8000/storage/${image.image_path}`}
                        alt={`Image ${i}`}
                        className="w-full h-full rounded-3xl object-cover"
                        onClick={() => openModal(i)}
                      />
                    </div>
                  ))
                : (
                  <>
                    <div> 
                      <img
                        src={`http://localhost:8000/storage/${images[0].image_path}`}
                        alt={`Image 0`}
                        className="w-full h-full rounded-3xl object-cover"
                        onClick={() => openModal(0)} 
                      />
                    </div>
                    <div className="w-full">
                      {images.slice(1).map((image, i) => ( //Image Cropping
                        <div key={i} className="w-full h-1/2 p-2">
                          <img
                            src={`http://localhost:8000/storage/${image.image_path}`}
                            alt={`Image ${i + 1}`}
                            className="w-full h-full rounded-3xl object-cover"
                            onClick={() => openModal(i + 1)}
                          />
                        </div>
                      ))}
                    </div>
                  </>
                )
              }
            </div>
          )}
        </div>
      )}
      
      {/*Modal to show full selected image*/}
      {selectedImage !== null && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-90">
          <div className="relative w-full h-full">
            <img
              src={`http://localhost:8000/storage/${images[selectedImage].image_path}`} 
              alt={`Image ${selectedImage}`}
              className="w-full h-full object-contain"
            />
            <button
              onClick={closeModal}
              className="text-white text-4xl cursor-pointer p-2 rounded-full bg-red-500 absolute top-0 right-0"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ImageGallery;
