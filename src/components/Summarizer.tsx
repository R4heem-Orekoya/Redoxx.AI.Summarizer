import { Link, ArrowDownFromLine, Copy, Loader2, ClipboardCheck } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useLazyGetSummaryQuery } from '../services/article'
import InputField from './InputField';
import SavedLinks from './SavedLinks';

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
    <div className='w-[min(1200px,90%)] mx-auto flex flex-col items-center py-4'>
        {/* <form onSubmit={handleSubmit} className='relative bg-zinc-900 h-[50px] sm:h-[55px] w-[min(600px,100%)] pl-3 sm:pl-4 pr-1.5 sm:pr-2 rounded-md flex justify-between items-center focus-within:ring-1 focus-within:ring-green-300'>
            <Link className='h-4 w-4 sm:w-6 sm:h-6 flex-shrink-0'/>
            <input reen
                onChange={(e) => setArticle({ ...article, url: e.target.value })} 
                value={article.url} type="url" 
                placeholder='Enter Article URL' 
                className='flex-1 bg-transparent mx-4 h-full outline-none max-sm:text-sm' 
                required
            />
            <button type='submit' className='h-[calc(100%-0.75rem)] sm:h-[calc(100%-1rem)] p-1 aspect-square grid place-items-center bg-zinc-800 rounded-[5px] focus:ring-1 focus:ring-green-300'>
                <ArrowDownFromLine className='w-4 h-4 sm:w-5 sm:h-5'/>
            </button>
        </form> */}
        <div className='grid gap-8 w-[min(600px,100%)] grid-cols-1'>
            <InputField />
            <SavedLinks savedCount={3}/>
        </div>

        <ul className='flex flex-col gap-2 mt-8 w-[min(600px,100%)] max-h-60 overflow-y-auto'>
            {allArticles.map((item, index) => (
                <li key={index} onClick={() => setArticle(item)} className='h-[45px] sm:h-[50px] bg-zinc-800 flex-row p-2 flex justify-start items-center rounded-md gap-4'>
                    <button onClick={() => handleCopy(item.url)} className='bg-zinc-700 w-[30px] sm:w-[35px] aspect-square grid place-items-center cursor-pointer rounded-md'>
                        {copied === item.url ? <ClipboardCheck size={15} strokeWidth={1.5}/> : <Copy size={15} strokeWidth={1.5}/>}
                    </button>
                    <p className='flex-1 truncate text-sm sm:text-lg font-medium text-blue-400 cursor-pointer'>
                        {item.url}
                    </p>
                </li>
            ))}
        </ul>

        <div className='my-10 w-[min(70ch,100%)] mx-auto'>
            {isFetching ? (
                <Loader2 size={50} strokeWidth={2} strokeOpacity={0.7} className='animate-spin text-center mx-auto'/>
            ): error ? (
                <p className='text-center'>
                    <span className='text-center font-Lato text-lg md:text-xl text-red-500'>Something went wrong, please try again!😢</span>
                    <br />
                    <span className='mt-4 text-center font-Inter text-zinc-400 font-medium'>{error?.data?.error}</span>
                </p>
            ): (
                article.summary && (
                    <div className='flex flex-col gap-8 bg-zinc-900 border border-zinc-800 p-4 py-6 sm:p-6 rounded-xl'>
                        <div className='flex justify-between items-center'>
                            <h2 className='text-2xl font-semibold tracking-wider'>Summary</h2>
                            <button onClick={() => handleCopy(article.summary)} className='w-10 aspect-square grid place-items-center bg-zinc-800 rounded-lg cursor-pointer focus:ring-1 focus:ring-green-500'>
                                {copied === article.summary ? <ClipboardCheck size={15} strokeWidth={1.5}/> : <Copy size={15} strokeWidth={1.5}/>}
                            </button>
                        </div>
                        <p className='text-base md:text-lg tracking-wide text-white'>
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
