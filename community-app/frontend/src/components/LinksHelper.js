import { logos } from '../components/logos/logos.js'
import { stripHttp, ensureHttps } from '../utils.js'

const beforeLastSlash = /^.*\//;
const beforeInOrCompany = /^.*(?=\/(company|in))/;

const linkInfo = {
    github: 'https://github.com/',
    youtube: 'https://youtube.com/',
    linkedin: 'https://linkedin.com/',
    nuget: 'https://nuget.org/profiles/'
}

export const linkData = (key, url)=>{

    if (key == 'website')
    {

        return {
            key: key,
            url: ensureHttps(url),
            text: stripHttp(url),
            icon: logos[key]
        }
    }

    if (key == 'github' || 
        key == 'nuget' ||
        key == 'youtube')
    {

        const handle = url.replace(beforeLastSlash, '');

        return {
            key: key,
            url: linkInfo[key] + handle,
            text: handle,
            icon: logos[key]
        }
    }

    if (key == 'linkedin')
    {
        const handle = url.replace(beforeInOrCompany, '');
        const text = url.replace(beforeLastSlash, '');

        return {
            key: key,
            url: linkInfo[key]+handle,
            text: text,
            icon: logos[key]
        }
    }
        
    if (key == 'mastodon' ||
        key == 'pixelfed' ||
        key == 'peertube')
    {
        return{
            key: key,
            url: ensureHttps(url),
            text: url.replace (beforeLastSlash, ''),
            icon: logos[key]
        }
    }

    return null;
}