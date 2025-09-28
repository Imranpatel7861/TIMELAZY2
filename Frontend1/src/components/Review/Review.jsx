import React from "react";
import { Star } from "lucide-react";

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
    <div className="max-w-7xl mx-auto my-16 md:my-28 px-4 sm:px-6 lg:px-12 text-center">
      {/* Header */}
      <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
        <Star className="inline-block align-middle mr-2 text-blue-600 dark:text-blue-400 w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" />
        Why Pen & Paper Can't Compete
      </h1>

      <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-400 mb-10 md:mb-16">
        Here's why people love our AI-powered scheduling
      </p>

      {/* Carousel */}
      <div className="relative w-full overflow-hidden h-72 sm:h-80">
        <div className="flex flex-nowrap gap-6 sm:gap-8 md:gap-12 animate-scroll">
          {repeated.map((review, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 w-64 sm:w-80 md:w-96 lg:w-[460px] h-60 sm:h-64 md:h-72 bg-white dark:bg-gray-800 p-5 sm:p-6 md:p-8 lg:p-10 rounded-2xl shadow-lg dark:shadow-gray-900/20 flex flex-col justify-between border border-gray-200 dark:border-gray-700"
            >
              {/* Quote */}
              <p className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-gray-900 dark:text-gray-100 leading-relaxed mb-4">
                "{review.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 mt-auto">
                <img
                  src={review.img}
                  alt={review.name}
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full"
                />
                <div className="text-left">
                  <div className="text-xs sm:text-sm md:text-base font-semibold text-gray-900 dark:text-gray-100">
                    {review.name}
                  </div>
                  <div className="text-[10px] sm:text-xs md:text-sm text-gray-600 dark:text-gray-400">
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
          animation: scroll 40s linear infinite;
        }

        @media (max-width: 768px) {
          .animate-scroll {
            animation-duration: 60s;
          }
        }
      `}</style>
    </div>
  );
};

export default Review;
