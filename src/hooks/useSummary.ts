import { useQuery } from "@tanstack/react-query"
import axios from "axios"

const rapidApiKey = import.meta.env.VITE_RAPID_API_ARTICLE_KEY
const headers = {
  headers: {
    'x-rapidapi-key': rapidApiKey,
    'x-rapidapi-host': 'article-extractor-and-summarizer.p.rapidapi.com',
  },
};

export const useSummary = (articleUrl: string) => {
  const query =  useQuery({
    queryKey: ["summary", articleUrl],
    queryFn: async () => {
      const res = await axios.get(
        `https://article-extractor-and-summarizer.p.rapidapi.com/summarize?url=${encodeURIComponent(articleUrl)}&length=2`,
        headers
      )

      return res.data
    },
    enabled: false,
    retry: false
  })
  
  return query
}