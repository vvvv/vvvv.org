import Constants from "../../constants.js"
import { defineStore } from 'pinia'
import { createAssetUrl, shuffle } from "../../utils.js"

const smallThumbParams = '?quality=80&fit=cover&height=50&format=png';
const bigThumbParams = '?quality=90&fit=cover&width=550&format=jpeg';

export const useStaffpicksStore = defineStore ('staffpicksStore',{
    state: ()=>{
        return {
            videos: [],
            fetched: false,
            fetching: false
        }
    },
    actions: {
        async fetch(force = false){

            if (this.fetched && !force && this.fetching) return;

            this.fetching = true;

            try{
                const url = Constants.GET_STAFFPICKS;       
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
                    this.videos = shuffle(videos);
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