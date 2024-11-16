import React from "react";
import Navbar from "./Navbar";
import { useSummary } from "../hooks/useSummary";

const Hero = () => {
  const { data } = useSummary({ articleUrl: "https://medium.com/coding-beauty/new-javascript-operator-1e60dea05654"})
  console.log(data);
  
  return( 
    <section className="w-[min(1200px,90%)] mx-auto">
        <Navbar />

        <div className="text-center pt-10 pb-6 mx-auto">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-semibold w-[min(800px,100%)] mx-auto">
            Summarize Articles With OpenAI <span className="text-green-500 font-bold">GPT-4</span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg font-normal mt-8 w-[min(550px,100%)] mx-auto">
            Simplify your reading with this ai Summaizer, an open-source
            article summarizer that transforms lengthy articles into clear
            and concise summaries.
          </p>
        </div>
    </section>
  );
};

export default Hero;
