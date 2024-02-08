import { useState } from 'react';

const testimonialsData = [
  {
    quote: "Landwind is just awesome. It contains tons of predesigned components and pages starting from login screen to complex dashboard. Perfect choice for your next SaaS application.",
    author: "Micheal Gough",
    position: "CEO at Google",
    avatar: "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gouch.png"
  },
  {
    quote: "I've been using Landwind for my projects and it has greatly improved my productivity. The components are well-designed and easy to customize.",
    author: "Jennifer Smith",
    position: "Freelance Developer",
    avatar: "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jennifer-smith.png"
  },
  {
    quote: "Landwind's documentation is top-notch and their support team is very responsive. I highly recommend it to anyone looking for a reliable UI kit.",
    author: "John Doe",
    position: "Product Manager",
    avatar: "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/john-doe.png"
  },
  {
    quote: "I've tried several UI kits before, but Landwind stands out with its clean and modern design. It's a pleasure to work with.",
    author: "Emily Johnson",
    position: "Frontend Developer",
    avatar: "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/emily-johnson.png"
  }
];


function TestimonialsCarousel() {
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);

  const handleNext = () => {
    setCurrentTestimonialIndex((prevIndex) => (prevIndex + 1) % testimonialsData.length);
  };

  const handlePrev = () => {
    setCurrentTestimonialIndex((prevIndex) => (prevIndex - 1 + testimonialsData.length) % testimonialsData.length);
  };

  const testimonial = testimonialsData[currentTestimonialIndex];

  return (
    <section className="bg-gray-50 dark:bg-gray-800">
      <div className="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-24 lg:px-6">
        <figure className="max-w-screen-md mx-auto">
          <svg className="h-12 mx-auto mb-3 text-gray-400 dark:text-gray-600" viewBox="0 0 24 27" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" fill="currentColor"/>
          </svg>
          <blockquote>
            <p className="text-xl font-medium text-gray-900 md:text-2xl dark:text-white">"{testimonial.quote}"</p>
          </blockquote>
          <figcaption className="flex items-center justify-center mt-6 space-x-3">
            <img className="w-6 h-6 rounded-full" src={testimonial.avatar} alt="profile picture" />
            <div className="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700">
              <div className="pr-3 font-medium text-gray-900 dark:text-white">{testimonial.author}</div>
              <div className="pl-3 text-sm font-light text-gray-500 dark:text-gray-400">{testimonial.position}</div>
            </div>
          </figcaption>
        </figure>
        <div className="mt-6">
          <button className="mx-2 py-2 px-4 bg-gray-300 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded-md" onClick={handlePrev}>Prev</button>
          <button className="mx-2 py-2 px-4 bg-gray-300 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded-md" onClick={handleNext}>Next</button>
        </div>
      </div>
    </section>
  );
}

export default TestimonialsCarousel;
