import Constants from "../../constants.js"
import { defineStore } from 'pinia'

const latestMonthThumb = 'https://vvvv.org/img/blog/review-thumb.png';

export const useLastMonthStore = defineStore ('lastMonth',{
    state: ()=>{
        return {
            title: "",
            link:"",
            thumb:"",
            fetched: false
        }
    },
    actions: {
        async fetch(force = false){

            if (this.fetched && !force) return;

            try{
                const rss = await fetchRSS();
                this.title = rss.title;
                this.link = rss.link;
                this.thumb = rss.thumb;
                this.fetched = true;
            }
            catch (error){
                this.fetched = false;
            }

        }
    }
})

async function fetchRSS(){
    
    // const imageParamsAvatars = "?withoutEnlargement=true&quality=90&fit=cover&height=60&width=60";
    // const limit = 10;

    const url = Constants.OVERVIEW_RSS;
        
    const response = await fetch(url);
    
    if (response.ok)
    {
        const items = []; 
        
        try{
            const text = await response.text();
    
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(text, 'text/xml');
            const data = xmlDoc.querySelectorAll('item');
            
            
            data.forEach(item => (
                items.push(
                    {
                        title: getItem(item, 'title'),
                        link: getItem(item, 'link'),
                        category: getItem(item, 'category'),
                        description: getItem(item, 'description'),
                        thumb: getItem(item, 'thumb')
                    }
                )
            ));
        }
        catch (error)
        {
            console.log (error);
        }

        const lastMonth = items.find(i=>i.category=="Monthly Reviews")

        return {
            title: lastMonth.title,
            link: lastMonth.link,
            thumb: latestMonthThumb
        }
    }
    else {
        throw Error ("Connection Error");
    }
}

function getItem(item, tag)
{
    return item.querySelector(tag)?.textContent
}