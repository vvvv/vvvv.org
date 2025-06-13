import Constants from "../../constants";

export async function fetchLatestTopics(){

    const response = await fetch(Constants.FORUM_TOPICS);

    if (response.ok)
    {
        const json = await response.json();       
        return json;
    }
    else
    {
        return [];
    }
}