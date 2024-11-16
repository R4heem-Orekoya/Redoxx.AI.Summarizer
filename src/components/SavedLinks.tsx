import { Link, Trash2 } from "lucide-react"
import { Button } from "./ui/button"

const SavedLinks = ({ savedCount = 1 }: { savedCount: number }) => {
   if (savedCount === 0) return null
   return (
      <section className="bg-zinc-900 p-4 sm:p-6 border border-zinc-800 rounded-lg">
         <h2 className="text-xl sm:text-2xl font-semibold">Recent Articles</h2>
         <p className="max-sm:text-sm text-muted-foreground mt-1">Your last {savedCount} summarized articles</p>

         <ul className="grid gap-3 mt-6 w-full">
            <li className="flex items-center gap-3 py-2 px-3 bg-zinc-800 rounded-md overflow-hidden">
               <div className="flex items-center gap-3 w-full overflow-hidden">
                  <Link className="w-3 h-3 sm:w-4 sm:h-4" />
                  <p className="truncate w-full text-sm font-medium text-primary cursor-pointer">
                     https://github.com/R4heem-Orekoya/Redoxx.AI.Summarizer
                  </p>
               </div>
               
               <button>
                  <Trash2 className="w-4 h-4 text-red-400" />
               </button>
            </li>
         </ul>
      </section>
   )
}

export default SavedLinks
