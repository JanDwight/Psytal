import React, {useState, useEffect } from 'react';

const slidesData = [
  {
    content: (
      <>
        <div className="w-[90%] h-[50vh] relative">
          {/* Remove the image src here */}
          <div className="absolute inset-x-0 top-0 h-[100%] w-[100%] flex flex-col justify-center items-center text-white p-5">
            <div className="bg-[#739072]/60 w-[100%] h-[100%] absolute inset-0 rounded-3xl"></div>
            <h6 className="text-2xl font-bold text-center z-10 relative">BSU Vision</h6>
            <div className="max-h-60 z-10 relative">
              <p className="text-2xl text-center">BSU as an international Smart University engendering graduates to walk the intergenerational highways.</p>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    content: (
      <>
        <div className="w-[90%] h-[50vh] relative">
          {/* Remove the image src here */}
          <div className="absolute inset-x-0 top-0 h-[100%] w-[100%] flex flex-col justify-center items-center text-white p-5">
            <div className="bg-[#739072]/60 w-[100%] h-[100%] absolute inset-0 rounded-3xl"></div>
            <h6 className="text-2xl font-bold text-center z-10 relative">BSU Mission</h6>
            <div className="max-h-60 z-10 mt-5 relative">
              <p className="text-xl text-center">
                <ul className="list-disc">
                  <li>Challenge Innovation</li>
                  <li>Advance Technology and Facilities</li>
                  <li>Revitalize Administration</li>
                  <li>Engender Partnership</li>
                  <li>Serve Intergenerational Role</li>
                </ul>
              </p>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    content: (
      <>
        <div className="w-[90%] h-[50vh] relative">
          {/* Remove the image src here */}
          <div className="absolute inset-x-0 top-0 h-[100%] w-[100%] flex-col justify-center items-center text-white p-5">
            <div className="bg-[#739072]/60 w-[100%] h-[100%] absolute inset-0 rounded-3xl"></div>
            <h6 className="text-xl font-bold text-center z-10 relative">College of Social Sciences Goals</h6>
            <div className="max-h-60 z-10 mt-5 relative">
              <p className="text-lg text-center">
                <ul className="list-disc list-inside space-y-2">
                  <li>
                    Promote academic space advocating/mainstreaming indigenous knowledge, cultural and environmental heritage, gender sensitivity, and engaging evidence-based innovation.
                  </li>
                  <li>
                    Produce globally competent graduates imbued with values systems rooted in social justice, freedom, critical thinking.
                  </li>
                </ul>
              </p>
            </div>
          </div>
        </div>
      </>
    ),
  },
];

const Carousel = () => {
  const [activeSlide, setActiveSlide] = useState(0);
 

  useEffect(() => {
    const slidesCount = slidesData.length;
    const interval = setInterval(() => {
      setActiveSlide((activeSlide + 1) % slidesCount);
    }, 10000); // Auto slide every 10 seconds

    return () => {
      clearInterval(interval);
    };
  }, [activeSlide]);

  const goToSlide = (index) => {
    setActiveSlide(index);
  };

  const nextSlide = () => {
    setActiveSlide((activeSlide + 1) % slidesData.length);
  };

  const prevSlide = () => {
    setActiveSlide((activeSlide - 1 + slidesData.length) % slidesData.length);
  };

  return (
    /* Carousel card */
    <div className="w-[90%] h-[50%]">
      <div className="relative w-[100%] h-[50%] overflow-hidden rounded-3xl">
        {slidesData.map((slide, index) => (
          <div
            key={index}
            className={`carousel-item relative ${
              index === activeSlide ? '' : 'hidden'
            } w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none`}
            data-te-carousel-active={index === activeSlide}
            data-te-carousel-item
            style={{ backfaceVisibility: 'hidden' }}
          >
            {slide.content}
          </div>
        ))}

        {/*Indicator Buttons */}
        <div className="absolute bottom-[0%] left-[-15%] right-[0%] pb-5 z-[2] flex list-none justify-center p-0" data-te-carousel-indicators>
          {slidesData.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => goToSlide(index)}
              className={`mx-2 box-content h-[3px] w-[30px] flex-initial cursor-pointer border-0 border-y-3 border-solid border-transparent bg-white bg-clip-padding p-0 ${
                index === activeSlide ? 'opacity-100' : 'opacity-50'
              } transition-opacity duration-600 ease-in-out motion-reduce:transition-none`}
              aria-current={index === activeSlide}
              aria-label={`Slide ${index + 1}`}
            ></button>
          ))}
        </div>
      </div>
      <button
        className="absolute bottom-[0%] left-[-5%] top-[-30%] pl-16 z-[11] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
        type="button"
        onClick={prevSlide}
      >
        <span className="inline-block h-8 w-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </span>
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Previous
        </span>
      </button>
      <button
        className="absolute bottom-[0%] right-[3%] top-[-30%] z-[11] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
        type="button"
        onClick={nextSlide}
      >
        <span className="inline-block h-8 w-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5L15.75 12l-7.5 7.5" />
          </svg>
        </span>
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Next
        </span>
      </button>
    </div>
  );
};

export default Carousel;
