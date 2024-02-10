import React from 'react';
import Speaking from '../images/speaking.svg';

const SpeakingSection = () => {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="grid max-w-screen-xl px-2 py-10 pb-6 mx-auto lg:gap-8 xl:gap-0 lg:py-4 lg:grid-cols-12 lg:pt-2">
        <div className="mr-auto place-self-center mx-5 text-left lg:col-span-7">
          <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Improve Your Speaking Skills
          </h2>
          <p className="text-gray-600 dark:text-gray-400">Unlock your speaking potential with our AI-driven practice sessions. Receive precise feedback and tailored guidance to enhance your performance. Elevate your IELTS speaking scores with confidence and precision.</p>
          <ol className="flex items-center w-full p-3 space-x-2 text-sm font-medium text-center text-gray-500 bg-white border border-gray-200 rounded-lg shadow-sm dark:text-gray-400 sm:text-base dark:bg-gray-800 dark:border-gray-700 sm:p-4 sm:space-x-4 rtl:space-x-reverse">
            <li className="flex items-center ml-6 text-blue-600 dark:text-blue-500">
              <span className="flex items-center justify-center w-5 h-5 me-2 text-xs border border-blue-600 rounded-full shrink-0 dark:border-blue-500">1</span>
              Login <span className="hidden sm:inline-flex sm:ms-2"></span>
              <svg className="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m7 9 4-4-4-4M1 9l4-4-4-4"/>
              </svg>
            </li>
            <li className="flex items-center">
              <span className="flex items-center justify-center w-5 h-5 me-2 text-xs border border-gray-500 rounded-full shrink-0 dark:border-gray-400">2</span>
              Give the  <span className="hidden sm:inline-flex sm:ms-2">Test</span>
              <svg className="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m7 9 4-4-4-4M1 9l4-4-4-4"/>
              </svg>
            </li>
            <li className="flex items-center">
              <span className="flex items-center justify-center w-5 h-5 me-2 text-xs border border-gray-500 rounded-full shrink-0 dark:border-gray-400">3</span>
              Instant Result
            </li>
          </ol>
          <button className="text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:ring-purple-200 font-medium rounded-lg text-sm px-5 py-2.5 mt-4 dark:text-white dark:focus:ring-purple-900">
            2 min Quick Test
          </button>
          <button className="text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:ring-purple-200 font-medium rounded-lg text-sm px-5 py-2.5 mt-4 ml-6 dark:text-white dark:focus:ring-purple-900">
           Full length Test
          </button>
        </div>
        <div className="hidden lg:block lg:col-span-5">
          <img src={Speaking} alt="hero image" />
        </div>
      </div>
    </section>
  );
};

export default SpeakingSection;
