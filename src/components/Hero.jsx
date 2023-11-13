import React from "react";
import Navbar from "./Navbar";

const Hero = () => {
  return( 
    <section className="w-[min(1200px,90%)] mx-auto">
        <Navbar />

        <div className="text-center py-10 mx-auto">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold w-[min(800px,100%)] mx-auto">
                Summarize Articles With OpenAI <span className="text-rose-500 font-black">GPT-4</span>
            </h1>

            <p className="text-lg lg:text-xl font-light mt-8 w-[min(600px,100%)] mx-auto">
                Simplify your reading with this ai Summaizer, an open-source
                article summarizer that transforms lengthy articles into clear
                and concise summaries.
            </p>
        </div>
    </section>
  );
};

export default Hero;
