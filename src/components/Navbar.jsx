import { Github, BrainCircuit } from "lucide-react";
import React from "react";

const Navbar = () => {
  const openLink = (link) => {
    window.open(link);
  };

  return (
    <header className="w-full py-6 flex justify-between max-sm:justify-center items-center">
      <div className="text-lg font-semibold flex items-center gap-2">
        <BrainCircuit size={30} strokeWidth={1.3} className="text-green-500" />
        AI Summarizer
      </div>

      <button
        className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-md text-zinc-950 bg-green-500 hover:bg-green-600 transition font-medium"
        onClick={() => openLink("https://github.com")}
      >
        <Github className="w-4 h-4 " />
        Github
      </button>
    </header>
  );
};

export default Navbar;
