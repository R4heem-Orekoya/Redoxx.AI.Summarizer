import { Github, BrainCircuit } from "lucide-react";
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <header className="w-full py-6 flex justify-between max-sm:justify-center items-center">
      <div className="text-lg font-semibold flex items-center gap-2">
        <BrainCircuit size={30} strokeWidth={1.3} className="text-green-500" />
        AI Summarizer
      </div>

      <Button asChild>
        <a href="https://github.com/R4heem-Orekoya/Redoxx.AI.Summarizer" className="flex items-center gap-2">
          <Github className="w-4 h-4"/>
          Github
        </a>
      </Button>
    </header>
  );
};

export default Navbar;
