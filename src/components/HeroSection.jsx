import students from '../images/students.jpg';

function HeroSection() {
  return (
    <section className="bg-white  dark:bg-gray-900">
      
      <div className="grid max-w-screen-xl  px-4 pt-20 pb-8  mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 lg:pt-28 ">
        <div className="mr-auto place-self-center mx-5 text-left lg:col-span-7">
          <h1 className="max-w-2xl mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-4xl mt-10 xl:text-6xl dark:text-white">Ielts full Mocktest <br />Full Preparation</h1>
          <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">Get an accurate evaluation for your test using AI with 99.96% accuracy.<br /><a href="https://flowbite.com/blocks/" className="hover:underline">get the results instantly</a>.</p>
          <div className="space-y-4 sm:inline-flex sm:space-y-0 sm:space-x-8 sm:items-center">
            <a href="https://themesberg.com/product/tailwind-css/landing-page" className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 sm:mr-2 lg:mr-0 dark:bg-purple-600 dark:hover:bg-purple-700 focus:outline-none dark:focus:ring-purple-800">Free test now</a>
            <a href="https://themesberg.com/product/tailwind-css/landing-page" className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 sm:ml-2 lg:mr-0 ml-1 dark:bg-purple-600 dark:hover:bg-purple-700 focus:outline-none dark:focus:ring-purple-800">Full mock test</a>
          </div>
        </div>
        <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
          <img src={students} alt="hero image" />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
