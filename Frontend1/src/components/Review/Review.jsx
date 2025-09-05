import React from 'react';
import { Star } from 'lucide-react';

const reviews = [
  {
    quote: "Timelazy changed the way I manage my schedule!",
    name: "Kent C. Dodds",
    title: "Founder of EpicWeb.dev",
    img: "https://i.pravatar.cc/40?img=1",
  },
  {
    quote: "Timelazy helps me stay on track without making planning feel like a chore.",
    name: "Ant Wilson",
    title: "CTO, Supabase",
    img: "https://i.pravatar.cc/40?img=2",
  },
  {
    quote: "This is the easiest way I've ever scheduled timetables!",
    name: "Jane Doe",
    title: "Product Manager",
    img: "https://i.pravatar.cc/40?img=3",
  },
  {
    quote: "Timelazy makes it incredibly easy to build my weekly schedule.",
    name: "Michael Scott",
    title: "Regional Manager",
    img: "https://i.pravatar.cc/40?img=4",
  },
  {
    quote: "A brilliant tool TimeLazy. Highly recommend.",
    name: "Sarah Kim",
    title: "UX Designer",
    img: "https://i.pravatar.cc/40?img=5",
  },
];

const Review = () => {
  const repeated = [...reviews, ...reviews]; // repeat for infinite loop

  return (
    <div className="max-w-7xl mx-auto my-20 md:my-32 text-center px-6 md:px-8 lg:px-12 bg-transparent">
      {/* Header */}
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
        <Star className="inline-block align-middle mr-2 md:mr-3 text-blue-600 dark:text-blue-400 w-6 h-6 md:w-8 md:h-8" />
        Why Pen & Paper Can't Compete
      </h1>
      
      <p className="text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-400 mb-12 md:mb-20">
        Here's why people love our AI-powered scheduling
      </p>

      {/* Carousel */}
      <div className="relative w-full overflow-hidden h-80 md:h-80 lg:h-80">
        <div className="flex gap-8 md:gap-12 lg:gap-16 animate-scroll">
          {repeated.map((review, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 w-80 md:w-96 lg:w-[480px] h-64 md:h-72 lg:h-[300px] bg-white dark:bg-gray-800 p-6 md:p-8 lg:p-10 rounded-2xl md:rounded-3xl shadow-lg dark:shadow-gray-900/20 flex flex-col justify-between border border-gray-100 dark:border-gray-700"
            >
              {/* Quote */}
              <div className="text-base md:text-lg lg:text-xl xl:text-2xl font-bold text-center leading-relaxed mb-4 md:mb-6 text-gray-900 dark:text-gray-100">
                "{review.quote}"
              </div>

              {/* Author */}
              <div className="flex items-end gap-3">
                <img
                  src={review.img}
                  alt={review.name}
                  className="w-8 h-8 md:w-10 md:h-10 rounded-full"
                />
                <div className="text-left leading-tight">
                  <div className="text-sm md:text-base font-semibold text-gray-900 dark:text-gray-100">
                    {review.name}
                  </div>
                  <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                    {review.title}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Custom CSS for animation */}
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        
        @media (max-width: 768px) {
          .animate-scroll {
            animation-duration: 50s;
          }
        }
      `}</style>
    </div>
  );
};

export default Review;