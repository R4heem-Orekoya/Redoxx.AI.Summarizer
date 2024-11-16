import { AtSign } from "lucide-react"

const InputField = () => {
   return (
      <div className="w-[min(700px,100%)] bg-zinc-900 p-4 sm:p-6 border border-zinc-800 rounded-lg">
         <h2 className="text-xl sm:text-2xl font-semibold">Enter Article URL</h2>
         <p className="max-sm:text-sm text-zinc-300">Paste the URL of the article you want to summarize</p>
         
         <form>
            <div className="relative">
               <input id="url" placeholder="Email" type="url" />
               <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
                  <AtSign size={16} strokeWidth={2} aria-hidden="true" />
               </div>
            </div>

         </form>
      </div>
   )
}

export default InputField
