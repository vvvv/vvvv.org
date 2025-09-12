import Constants from "../../constants.js"
import { defineStore } from 'pinia'

const latestMonthThumb = 'https://vvvv.org/img/blog/review-thumb.png';
const oneWeek = 7 * 24 * 60 * 60 * 1000;
const formatter = new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: '2-digit',
    hour: "numeric",
    minute: "numeric",
    timeZone: "UTC",
    timeZoneName: "short",
});

export const useHugoStore = defineStore ('hugoStore',{
    state: ()=>{
        return {
            lastMonth: {},
            dates: [],
            fetched: false,
            fetching: false
        }
    },
    actions: {
        async fetch(force = false){

            if (this.fetched && !force && this.fetching) return;

            this.fetching = true;

            try{
                const url = Constants.OVERVIEW_JSON;        
                const response = await fetch(url);
                
                if (response.ok)
                {
                    const data = await response.json();
                    const lm = data.lastMonthInReview

                    this.lastMonth = {
                        thumb: latestMonthThumb,
                        description: lm.description,
                        title: lm.title,
                        link: lm.link,
                        isNew: lm.pubDate ? Date.now() < lm.pubDate * 1000 + oneWeek : false
                    }

                    this.dates = [];

                    data.dates.forEach(d=>{
                        this.dates.push(dateItem(d))    
                    });

                    this.fetched = true;
                }
                else {
                    throw Error ("Connection Error");
                }
            }
            catch (error){
                this.fetched = false;
            }
            finally{
                this.fetching = false;
            }

        }
    }
})

function dateItem(item)
{
    let dates = "";

    if (item.from)
    {
        const from = toDate(item.from);
        const to = toDate(item.to);
        
        if (!item.to)
        {
            dates = `${from.day} ${from.month} ${from.year}, ${from.hour}:${from.minute}`
        }
        else if (from.day == to.day && from.month == to.month && from.year == to.year)
        {
            dates = `${from.day} ${from.month} ${from.year}, ${from.hour}:${from.minute} - ${to.hour}:${to.minute}`
        }
        else
        {
            dates = `${from.day} ${from.month} ${from.year}, ${from.hour}:${from.minute} - 
                     ${to.day} ${to.month} ${to.year}, ${to.hour}:${to.minute}`
        }
    }

    const isPast = new Date(item.from * 1000) < new Date();

    return{
        title: item.title,
        link: item.link,
        thumb: item.thumb,
        description: item.description,
        dates: dates || "...",
        country: item.country,
        past: isPast
    }   
}

function toDate(stamp) {

    if (!stamp) return null;

    const date = new Date(stamp * 1000);
    const dateParts = formatter.formatToParts(date);

    return {
        year: dateParts.find(d => d.type == 'year')?.value,
        month: dateParts.find(d => d.type == 'month')?.value,
        day: dateParts.find(d => d.type == 'day')?.value,
        hour: dateParts.find(d => d.type == 'hour')?.value,
        minute: dateParts.find(d => d.type == 'minute')?.value,
    }
}