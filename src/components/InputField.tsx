import { Link } from "lucide-react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Dispatch, FormEvent, SetStateAction } from "react"

type stateAction = {
   url: string;
   summary: string;
}

interface InputFieldProps {
   handleSubmit: (e: FormEvent<HTMLFormElement>) => void
   setArticle: Dispatch<SetStateAction<stateAction>>
   article: stateAction
}

const InputField = ({ handleSubmit, setArticle, article }: InputFieldProps) => {
   return (
      <section className="bg-zinc-900 p-4 sm:p-6 border border-zinc-800 rounded-lg">
         <h2 className="text-xl sm:text-2xl font-semibold">Enter Article URL</h2>
         <p className="max-sm:text-sm text-muted-foreground mt-1">Paste the URL of the article you want to summarize</p>

         <form onSubmit={handleSubmit} className="mt-6 flex max-sm:flex-col gap-4">
            <div className="relative flex-1">
               <Input 
                  placeholder="https://example.com/some-slug" 
                  type="url" className="pl-10 w-full max-sm:text-sm" 
                  value={article.url}
                  onChange={(e) => {
                     setArticle((prev) => ({ ...prev, url: e.target.value }))
                  }}
                  required 
               />
               <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
                  <Link strokeWidth={1.6} aria-hidden="true" className="w-4 h-4" />
               </div>
            </div>
            <Button>Summarize</Button>
         </form>
      </section>
   )
}

export default InputField
