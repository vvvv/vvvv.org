import { logos } from '../components/logos/logos.js'
import { stripHttp, ensureHttps } from '../utils.js'

const matchLastSegment = /([^\/]+)\/?$/;
const matchInOrCompanyName = /(?:\/?(company|in)\/([^\/]+))\/?$/i;
const matchName = /^[a-zA-Z0-9\-_.]+$/;

const linkInfo = {
    github: 'https://github.com/',
    youtube: 'https://youtube.com/',
    linkedin: 'https://linkedin.com/',
    nuget: 'https://nuget.org/profiles/',
    vimeo: 'https://vimeo.com/'
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
        key == 'youtube' ||
        key == 'vimeo')
    {

        const handle = url.match(matchLastSegment, '')[1];

        return {
            key: key,
            url: linkInfo[key] + handle,
            text: handle,
            icon: logos[key]
        }
    }

    if (key == 'linkedin')
    {
        const match = url.match(matchInOrCompanyName, '');

        let handle;

        if (match)
        {
            handle = `${match[1]}/${match[2]}`;
        }
        else if (matchName.test(url))
        {
            handle = `in/${url}`;
        }

        return {
            key: key,
            url: linkInfo[key]+handle,
            text: url.match(matchLastSegment, '')[1],
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
            text: url.match(matchLastSegment, '')[1],
            icon: logos[key]
        }
    }

    return null;
}