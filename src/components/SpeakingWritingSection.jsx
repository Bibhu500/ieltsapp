import React from 'react';

const SpeakingWritingSection = () => {
  return (
    <section id="speak-write" className="bg-gray-50 dark:bg-gray-900">
      <div className="max-w-screen-xl px-4 py-8 mx-auto lg:py-20 lg:px-6">
        <div className="max-w-screen-md mx-auto mb-8 text-center lg:mb-12">
          <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Improve Your Speaking and Writing Skills
          </h2>
          <p className="text-gray-600 dark:text-gray-400">Enhance your language proficiency by practicing both speaking and writing.</p>
        </div>
        <div className="space-y-8 lg:grid lg:grid-cols-2 sm:gap-6 xl:gap-10 lg:space-y-0">
          {/* Speaking Section */}
          <div className="flex flex-col max-w-lg p-6 mx-auto text-center text-gray-900 bg-white border border-gray-200 rounded-lg shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
            <h2 className="mb-4 text-2xl font-semibold">Enhance Your Speaking Skills</h2>
            <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
              Improve your speaking fluency and accuracy through our speaking practice sessions. Practice speaking on a variety of topics and get personalized feedback from language experts.
            </p>
            <ol className="flex items-center w-full p-3 space-x-2 text-sm font-medium text-center text-gray-500 bg-white border border-gray-200 rounded-lg shadow-sm dark:text-gray-400 sm:text-base dark:bg-gray-800 dark:border-gray-700 sm:p-4 sm:space-x-4 rtl:space-x-reverse">
              <li className="flex items-center text-blue-600 dark:text-blue-500">
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
              Let's Take a Speaking Test
            </button>
          </div>
          {/* Writing Section */}
          <div className="flex flex-col max-w-lg p-6 mx-auto text-center text-gray-900 bg-white border border-gray-200 rounded-lg shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
            <h2 className="mb-4 text-2xl font-semibold">Enhance Your Writing Skills</h2>
            <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
              Strengthen your writing skills by practicing various types of writing tasks such as essays, reports, and letters. Receive detailed feedback from our expert tutors to improve your writing proficiency.
            </p>
            <ol className="flex items-center w-full p-3 space-x-2 text-sm font-medium text-center text-gray-500 bg-white border border-gray-200 rounded-lg shadow-sm dark:text-gray-400 sm:text-base dark:bg-gray-800 dark:border-gray-700 sm:p-4 sm:space-x-4 rtl:space-x-reverse">
              <li className="flex items-center text-blue-600 dark:text-blue-500">
                <span className="flex items-center justify-center w-5 h-5 me-2 text-xs border border-blue-600 rounded-full shrink-0 dark:border-blue-500">1</span>
                Login <span className="hidden sm:inline-flex sm:ms-2"></span>
                <svg className="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m7 9 4-4-4-4M1 9l4-4-4-4"/>
                </svg>
              </li>
              <li className="flex items-center">
                <span className="flex items-center justify-center w-5 h-5 me-2 text-xs border border-gray-500 rounded-full shrink-0 dark:border-gray-400">2</span>
                Give the <span className="hidden sm:inline-flex sm:ms-2">Test</span>
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
              Let's Take a Writing Test
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpeakingWritingSection;
