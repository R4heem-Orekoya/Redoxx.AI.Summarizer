import { Github, BrainCircuit } from 'lucide-react'
import React from 'react'

const Navbar = () => {
  return (
    <header className='w-full py-6 flex justify-between max-sm:justify-center items-center'>
        <span className='text-2xl font-semibold tracking-wider flex items-center gap-2'><BrainCircuit size={50} strokeWidth={1.3} className='text-rose-500'/>AI Summarizer</span>

        <a href="#">
            <span className='flex items-center gap-2 px-8 py-3 rounded-full bg-rose-500 text-lg font-semibold hover:bg-rose-600 hover:text-[#111111] transition duration-300 max-sm:hidden'>
                <Github size={25} strokeWidth={2} className='fill-zinc-950 stroke-zinc-950 duration-100 transition'/>Github
            </span>
        </a>
    </header>
  )
}

export default Navbar
