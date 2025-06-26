import LogoNuget from './LogoNuget.js'
import LogoPixelfed from './LogoPixelfed.js'
import LogoDiscourse from './LogoDiscourse.js'
import LogoPeertube from './LogoPeertube.js'
import { LogoGithub, LogoMastodon, Earth, LogoYoutube, LogoLinkedin } from '@vicons/ionicons5'

export const logos = [
    { name:"website", logo: Earth, prefix: null},
    { name:"nuget", logo: LogoNuget, prefix: 'nuget.org/profiles/'},
    { name:"pixelfed", logo: LogoPixelfed, prefix: null},
    { name:"discourse", logo: LogoDiscourse, prefix: null},
    { name:"github", logo: LogoGithub, prefix: 'github.com/'},
    { name:"mastodon", logo: LogoMastodon, prefix: null},
    { name:"peertube", logo: LogoPeertube, prefix: null},
    { name:"youtube", logo: LogoYoutube, prefix: 'youtube.com/'},
    { name:"linkedin", logo: LogoLinkedin, prefix: 'linkedin.com/'}
]