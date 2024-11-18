import { FormEvent, useEffect, useState } from 'react';
import InputField from './InputField';
import SavedLinks from './SavedLinks';
import { useLazyGetSummaryQuery } from '@/services/article';

const Summarizer = () => {
    const [article, setArticle] = useState({
        url: "",
        summary: "",
    });
    
    const [allArticles, setAllArticles] = useState<{url: string;summary: string;}[]>([]);
    const [copied, setCopied] = useState("")
    
    const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

    useEffect(() => {
        const articlesFromLocalStorage = JSON.parse(localStorage.getItem("articles") as string);
    
        if (articlesFromLocalStorage) {
          setAllArticles(articlesFromLocalStorage);
        }
    }, []);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        const { data } = await getSummary({ articleUrl: article.url });
        
        if(!data.summary) return
        
        const newArticle = { ...article, summary: data.summary };
        const updatedAllArticles = [newArticle, ...allArticles];

        setArticle(newArticle)
        setAllArticles(updatedAllArticles)

        localStorage.setItem("articles", JSON.stringify(updatedAllArticles));
    }
    
    const handleCopy = (url: string) => {
        setCopied(url)
        navigator.clipboard.writeText(url)
        setTimeout(() => setCopied(""), 3000)
    }

  return (
    <div className='w-[min(1200px,90%)] mx-auto flex flex-col items-center py-4'>
        <div className='grid gap-8 w-[min(600px,100%)] grid-cols-1'>
            <InputField 
                handleSubmit={handleSubmit}
                setArticle={setArticle}
                article={article}
            />
            <div>
                {article.summary && <p>{article.summary}</p>}
            </div>
            <SavedLinks savedCount={allArticles.length}/>
        </div>
    </div>
  )
}

export default Summarizer
