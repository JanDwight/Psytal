import React, { Component }  from 'react'
import coverVid from "@assets/LandingpageBG.mp4";
import schoolLogo from "@assets/BSUlogo.png";
import Carousel from '../../unauthorized_view/views_main/Carousel';
import Login from '../../unauthorized_view/views_main/Login';



export default function LandingPage() {

  return (
    <div className='w-[100%] h-[100%] relative mx-auto'>
      <video
        className='w-[100%] h-[100%] object-cover z-0 mx-auto'
        src={coverVid}
        autoPlay
        loop
        muted
      />

      <div className="absolute flex w-[100%] h-[100%] top-[10%] left-[0%] overflow-hidden">
        <div className="w-[50%] flex items-center text-white relative">
          <div className="mx-8">
            <img
              className="h-24 w-24 absolute top-[0%] left-[40%]"
              src={schoolLogo}
              alt="BSUlogo"
            />
            <div className= "absolute top-[6%] left-[13%]">
            <h1 className="font-franklin font-extrabold text-2xl text-center">
              WELCOME TO BENGUET STATE UNIVERSITY
            </h1>
            <h1 className="font-franklin font-extrabold text-4xl text-center">
              DEPARTMENT OF PSYCHOLOGY
            </h1>
            </div>
          </div>

          <div className="absolute w-[90%] h-[100%] top-[-14%] left-[5%] pl-10 pr-5 flex items-center justify-center">
            <Carousel />
          </div>
        </div>
      </div>

      <div className="absolute w-[50%] h-[100%] top-[-25%] right-[0%] pl-10 flex items-center justify-center">
            <Login />
      </div>


      <div className='w-[100%] h-[100%] pb-10 relative flex items-center justify-center'>
        
      <div className="w-[75%] h-[100%] float-left">
      <div className="mx-6 ">
        {/* Green Card 1 */}
        <div className="bg-[#002408] p-4  shadow-lg">
          <h6 className="text-2xl text-white text-center font-bold pt-3">ADMISSION REQUIREMENTS</h6>
          <h4 className="text-xl text-white font-bold pt-3">Applicants</h4>
          <ul className="list-disc pl-6 text-lg text-white">
            <li>Senior High School Graduate</li>
            <li>High school graduates of the old high school curriculum who did not enroll in any degree program in any other school after graduation from high school.</li>
            <li>Grade 12 as of the application period</li>
            <li>ALS/PEPT Completers eligible for college admission</li>
          </ul>
        </div>

        {/* Flex container for Green Card 2 and 3 */}
        <div className="flex ">
          {/* Green Card 2 */}
          <div className="bg-[#596e5c] p-4 shadow-lg flex-1">
            <h4 className="text-xl text-white font-bold pt-3">Grade</h4>
            <ul className="list-disc pl-6 text-white text-lg">
              <li>General Weighted Average (GWA) must be 86% or better</li>
              <li>Grades for English, Math, Science must be 86% or better</li>
            </ul>
          </div>

          {/* Green Card 3 */}
          <div className="bg-[#648058] p-4 shadow-lg flex-1">
            <h4 className="text-xl text-white font-bold pt-3">Additional Requirements</h4>
            <ul className="list-disc pl-6 text-lg text-white">
              <li>Qualifiers must pass the interview process conducted by the Colleges.</li>
              <li>Co-curricular and extra-curricular involvement in Senior High School may be considered by the College in the qualification of the applicant.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

      {/*DEPARTMENT OBJECTIVES*/}
      <div className="w-[25%] h-[100%] float-left ml-4">
    
          <p className="text-sm text-center  mr-6">
            <h6 className="text-xl font-bold pt-3">PSYCHOLOGY PROGRAM OBJECTIVES</h6>
            <ul className="list-decimal pl-6">
              <li>Demonstrate the capability to discuss and analyze the major theories and concepts in psychology (knowledge in psychology);</li>
              <li>Demonstrate and apply the methods of psychological inquiry in building knowledge on local culture and context (psychological research);</li>
              <li>Demonstrate and apply psychological theories and methods in a professional and personal setting (application of psychology);</li>
              <li>Demonstrate capability for self-reflection and independent learning in graduate education or in a professional context (independent learning);</li>
              <li>Demonstrate professional and ethical behaviors in research and practice in psychology (ethics);</li>
              <li>Demonstrate harmonious interpersonal relationships with colleagues, clients, and otherwise (interpersonal skills) in diverse cultural settings; and</li>
              <li>Demonstrate the ability to conduct psychological assessments and evaluation (psychological assessment).</li>
            </ul>
          </p>
      
      </div>
    </div>
      
      
    
      {/**<!--Footer--> */}
      <footer className='bg-gray-200 text-center text-gray-500 lg:text-left mt-[1%]'>
      {/**<!-- Social icons --> */}
      <div className='border-b-2 border-neutral-200 p-2'>
        <div className='container mx-auto px-10'>
          <div className='flex items-center justify-center lg:justify-between'>
            <div className='mr-12 hidden lg:block'>
              <span>Get connected with us on social networks: BSU-CSS-Department of Psychology</span>
            </div>
            <div className='flex justify-center'>
              {/**FB */}
              <a href="https://www.facebook.com/psychologybsu" target="_blank" className="mr-6 text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                </svg>
              </a>
              {/**Twitter */}
              <a href="https://twitter.com/BenguetStateU" target="_blank" className="mr-6 text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>

                  {/**Instagram */}
              <a href="https://www.instagram.com/benguetstateuniversityofficial/" target="_blank" className="mr-6 text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div> 
         {/**End of Social Icons */}

      {/**<!-- Main footer content --> */}
        <div className="bg-gray-100">
        <div className='container mx-auto px-4 py-5 justify-center items-center h-[100%]'>
          <div className='mx-6 text-center'>
            <div className='grid-1 grid gap-8 md:grid-cols-2 lg:grid-cols-5'>
              <div></div>
              {/**----------------COL1------------- */}
              <div>
                <h6 className="mb-4 flex items-center justify-center font-semibold uppercase md:justify-start">
                  <svg xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="mr-3 h-4 w-4">
                    <path d="M12.378 1.602a.75.75 0 00-.756 0L3 6.632l9 5.25 9-5.25-8.622-5.03zM21.75 7.93l-9 5.25v9l8.628-5.032a.75.75 0 00.372-.648V7.93zM11.25 22.18v-9l-9-5.25v8.57a.75.75 0 00.372.648l8.628 5.033z"/>
                  </svg>
                  Psychology Department
                </h6>
                <p>REPUBLIC OF THE PHILIPPINES</p>
                <p>All content is in the public domain unless otherwise stated.</p>
              </div>
          
              {/**---------------COL2------------- */}
              <div className='mb-4 flex flex-col justify-center font-semibold uppercase md:justify-start'>
                <h6>
                  <a href="https://www.google.com/maps/@16.4529815,120.5897683,3a,75y,62.24h,81.21t/data=!3m6!1e1!3m4!1s3g6UBbP1ms4hzPLFCynOug!2e0!7i16384!8i8192?entry=ttu" target="_blank">
                  Site Map
                  </a>
                </h6>
                <p>
                  <a href="http://www.bsu.edu.ph/" target="_blank" className=" text-black-200">BSU website</a>
                </p>
              </div>
              {/**--------------COL3------------- */}
              <div>
                <h6 className='mb-4 flex justify-center font-semibold uppercase md:justify-start'>
                  Contact
                </h6>
                <p className='mb-4 flex items-center justify-center md:justify-start'>
                  <svg xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="mr-3 h-5 w-5">
                    <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z"/>
                    <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z"/>
                  </svg>
                  <a href="https://www.google.com/maps/dir//Benguet+State+University,+La+Trinidad,+Benguet/@16.4544374,120.5894334,528m/data=!3m1!1e3!4m8!4m7!1m0!1m5!1m1!1s0x3391a3bb4279be9b:0xbf6e126a84be4efc!2m2!1d120.5902746!2d16.4543609?entry=ttu" target="_blank" className=" text-black-200">
                  Km.5 La Trinidad, Benguet
                  </a>
                </p>
                <p className='mb-4 flex items-center justify-center md:justify-start'>
                  <svg xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="mr-3 h-5 w-5">
                    <path fillRule="evenodd"
                      d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.970c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.970-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
                      clipRule="evenodd"/>
                  </svg>
                  psychology@gmail.com
                </p>
                <p className='mb-4 flex items-center justify-center md:justify-start'>
                  <svg xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="mr-3 h-5 w-5">
                    <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z"/>
                    <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z"/>
                  </svg>
                  +639XXXXXXXXX
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/** End of the Main Footer Content */}

      {/**<!-- Copyrights --> */}
      <div className='bg-gray-200 p-3 text-center'>
        <a font-semibold="true" text-neutral-600="true">BSU-CSS: Department of Psychology </a>
        <span> © 2023 Copyright</span>
      </div> {/**End of copyrights */}
    </footer>{/**End Footer */}

  </div>
              
  )
}
