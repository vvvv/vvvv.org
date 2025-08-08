import Constants from "../../constants.js"
import { defineStore } from 'pinia'
import { createAssetUrl, shuffle } from "../../utils.js"

const smallThumbParams = '?fit=cover&height=80&quality=90&format=jpeg';
const bigThumbParams = '?fit=cover&width=1024&height=576&quality=95&format=jpeg';

export const useStaffpicksStore = defineStore ('staffpicksStore',{
    state: ()=>{
        return {
            videos: [],
            fetched: false,
            fetching: false
        }
    },
    actions: {
        shuffle(){
            shuffle(this.videos);
        },
        async fetch(force = false){

            if (this.fetched && !force && this.fetching) return;

            this.fetching = true;

            try{
                const url = `${Constants.GET_STAFFPICKS}?limit=4`;       
                const response = await fetch(url);
                
                if (response.ok)
                {
                    const json = await response.json();
                    const videos = json.data.map(item=>{
                        return {
                            smallThumb: createAssetUrl(item.thumbnail)+smallThumbParams ?? "",
                            bigThumb: createAssetUrl(item.thumbnail)+bigThumbParams ?? "",
                            title: item.title,
                            platform: item.platform,
                            id: item.video_id
                        }
                    });
                    this.videos = videos;
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