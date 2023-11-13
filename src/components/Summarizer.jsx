import { Link, ArrowDownFromLine, Copy, Loader2, ClipboardCheck } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useLazyGetSummaryQuery } from '../services/article'

const Summarizer = () => {
    const [article, setArticle] = useState({
        url: "",
        summary: "",
    });
    
    const [allArticles, setAllArticles] = useState([]);
    const [copied, setCopied] = useState('')

    const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

    useEffect(() => {
        const articlesFromLocalStorage = JSON.parse(
          localStorage.getItem("articles")
        );
    
        if (articlesFromLocalStorage) {
          setAllArticles(articlesFromLocalStorage);
        }
    }, []);

    const handleCopy = (url) => {
        setCopied(url)
        navigator.clipboard.writeText(url)
        setTimeout(() => setCopied(false), 3000)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const { data } = await getSummary({ articleUrl: article.url });

        if(data.summary){
            const newArticle = { ...article, summary: data.summary };
            const updatedAllArticles = [newArticle, ...allArticles];

            setArticle(newArticle)
            setAllArticles(updatedAllArticles)

            localStorage.setItem("articles", JSON.stringify(updatedAllArticles));
        }
    }


  return (
    <div className='w-[min(1200px,90%)] mx-auto flex flex-col items-center py-8'>
        <form onSubmit={handleSubmit} className='relative bg-zinc-900 h-[50px] sm:h-[60px] w-[min(600px,100%)] pl-4 rounded-md flex justify-between items-center focus-within:ring-1 focus-within:ring-rose-500'>
            <span className='absolute'>
                <Link size={20}/>
            </span>
            <input onChange={(e) => setArticle({ ...article, url: e.target.value })} value={article.url} type="url" placeholder='Enter Article URL' className='flex-1 bg-transparent ml-8 h-full outline-none text-sm md:text-lg' required/>
            <button type='submit' className='max-sm:absolute max-sm:right-0 max-[300px]:bg-red-300 h-[calc(100%-1rem)] p-1 aspect-square mx-2 grid place-items-center bg-zinc-800 rounded-[5px] focus:ring-1 focus:ring-rose-500'><ArrowDownFromLine size={20} className=''/></button>
        </form>

        <ul className='flex flex-col gap-2 mt-6 w-[min(600px,100%)] max-h-60 overflow-y-auto pr-3'>
            {allArticles.map((item, index) => (
                <li key={index} onClick={() => setArticle(item)} className='bg-zinc-800 flex-row p-2 flex justify-start items-center rounded-md gap-4'>
                    <button onClick={() => handleCopy(item.url)} className='bg-zinc-700 w-[35px] aspect-square grid place-items-center cursor-pointer rounded-md'>
                        {copied === item.url ? <ClipboardCheck size={15} strokeWidth={1.5}/> : <Copy size={15} strokeWidth={1.5}/>}
                    </button>
                    <p className='flex-1 truncate text-lg font-medium font-Lato text-blue-400 cursor-pointer'>
                        {item.url}
                    </p>
                </li>
            ))}
        </ul>

        <div className='my-10 w-[min(600px,100%)] mx-auto'>
            {isFetching ? (
                <Loader2 size={50} strokeWidth={2} strokeOpacity={0.7} className='animate-spin text-center mx-auto'/>
            ): error ? (
                <p className='text-center'>
                    <span className='text-center font-Lato text-lg md:text-xl text-red-700'>Something went wrong, please try again!😢</span>
                    <br />
                    <span className='mt-4 text-center font-Inter text-zinc-400 font-medium'>{error?.data?.error}</span>
                </p>
            ): (
                article.summary && (
                    <div className='flex flex-col gap-8 bg-zinc-900 p-4 py-6 sm:p-6 rounded-xl border border-rose-500'>
                        <div className='flex justify-between items-center'>
                            <h2 className='text-2xl font-semibold tracking-wider'>Summary</h2>
                            <button onClick={() => handleCopy(article.summary)} className='w-10 aspect-square grid place-items-center bg-zinc-800 rounded-lg cursor-pointer focus:ring-1 focus:ring-rose-500'>
                                {copied === article.summary ? <ClipboardCheck size={15} strokeWidth={1.5}/> : <Copy size={15} strokeWidth={1.5}/>}
                            </button>
                        </div>
                        <p className='text-base md:text-lg font-medium tracking-wide text-slate-300 font-Montserrat'>
                            {article.summary}
                        </p>
                    </div>
                )
            )}
        </div>
    </div>
  )
}

export default Summarizer
