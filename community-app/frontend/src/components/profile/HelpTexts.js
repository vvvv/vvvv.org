const data = Object({
    beta_since:{
        label: "Started using vvvv beta in",
        help: "The year you started using vvvv beta",
    },
    gamma_since:{
        label: "Started using vvvv gamma in",
        help: "The year you started using VL in vvvv beta or vvvv gamma",
    },
    website: 
    {
        user:{
            label: "Website",
            help: 'Url of your personal website',
            placeholder: 'vvvv.org'
        },
        company:{
            label: "Website",
            help: "Url of the company's website",
            placeholder: "vvvv.org"
        },
        edu:{
            label: "Website",
            help: "Url of the institution's website",
            placeholder: "vvvv.org"
        }
    },
    github: {
        label: "Github",
        help: 'Your GitHub username',
        placeholder: 'MyGitHubUser'
    },
    nuget: {
        label: "NuGet",
        help: 'Your NuGet user- or organization name',
        placeholder: 'MyNuGetUser'
    },
    pixelfed: {
        label: "Pixelfed",
        help: 'Url to your Pixelfed profile',
        placeholder: 'pixelfed.social/madewithvvvv'
    },
    mastodon: {
        label: "Mastodon",
        help: 'Url to your Mastodon profile',
        placeholder: 'mastodon.xyz/@vvvv'
    },
    peertube: {
        label: "PeerTube",
        help: "Url to your PeerTube profile",
        placeholder: "https://mypeertube.tv/c/me"
    },
    youtube: {
        label: "YouTube",
        help: "Your YouTube handle",
        placeholder: "@vvvvTv42"
    },
    matrix: {
        label: "Matrix",
        help: 'Your handle on the chat',
        placeholder: '@MyUsername:matrix.org'
    },
    linkedin: {
        user:{
            label: "LinkedIn",
            help: 'Name of your personal profile on LinkedIn',
            placeholder: 'in/MyLinkedInUser'
        },
        company:
        {
            label: "LinkedIn",
            help: 'Public url of your company profile on LinkedIn',
            placeholder: 'company/My-Company'
        },
        edu:
        {
            label: "LinkedIn",
            help: 'Public url of the institution on LinkedIn',
            placeholder: 'company/My-Institution'
        }
    },
    customFields: {
        label: "Custom Fields",
        help: 'Anything you want share, like additional Urls or other info',
        placeholder: {
            key: 'Label',
            value: 'Content'
        },
    },
    newsletter: {
        label: "Newsletter",
        help: 'Subscribe to the vvvv newsletter. Frequency: ~1/month'
    },
    location: {
        label: "Location"
    },
    name: {
        user:{
            label: "Name"
        },
        company:{
            label: "Name",
            help: "Your company's name",
            placeholder: "My Company"
        },
        edu:{
            label: "Name",
            help: "Name of Institution",
            placeholder: "My Institution"
        }
    },
    tagline: {
        company: {
            label: "Tagline",
            help: "Your company's slogan",
            placeholder: "Everything you know is wrong"
        }
    },
    description: {
        user:{
            label: "Description",
            help: 'A short introduction about yourself'
        },
        company: {
            label: "Description",
            help: "A short introduction to your company and it's services"
        },
        edu:
        {
            label: "Description",
            help: "A short introduction to your institution and the courses involving vvvv"
        }
    },
    course_language:{
        label: "Course Language",
        placeholder: "German"
    },
    internships:{
        label: "Internships",
        help: "Whether or not your business is accepting internship applications"
    },
    projects_url:{
        label: "Projects",
        help: 'In case your business website has an extra "Projects" url',
        placeholder: 'https://mybusiness.com/projects'
    },
    contact_url:{
        label: "Contact",
        help: 'In case your business website has an extra "Contact" url',
        placeholder: 'https://mybusiness.com/contact'
    },
    jobs_url:{
        label: "Jobs",
        help: 'In case your business website has an extra "Jobs" url',
        placeholder: 'http://mybusiness.com/jobs'
    }

})

export function getValue(path, key, type)
{
    if (data[path] && (data[path][type] || data[path][key]))
    {
        if (data[path][type])
        {
            return type ? data[path][type][key] : data[path]["user"][key]
        }
        else
        {
            return data[path][key];
        }
    }

    return undefined;
}

export default data;