import Constants from "../../constants.js"
import { defineStore } from 'pinia'

export const useLatestTopicsStore = defineStore ('latestTopics',{
    state: ()=>{
        return {
            topics: [],
            fetched: false
        }
    },
    actions: {
        async fetch(force = false){

            if (this.fetched && !force) return;

            try{
                this.topics = await fetchLatestTopics();
                this.fetched = true;
            }
            catch (error){
                this.fetched = false;
            }

        }
    }
})

async function fetchLatestTopics(){

    const count = 9;
    const response = await fetch(Constants.FORUM_TOPICS+`?count=${count}`);

    if (response.ok)
    {
        const json = await response.json();
        
        const topics = json.map((t)=>{
                return {
                    id: t.id,
                    title: t.title,
                    link: Constants.FORUM+'t/'+t.slug,
                    count: t.count-1
                }
            })

        return topics;
    }
    else
    {
        return [];
    }
}