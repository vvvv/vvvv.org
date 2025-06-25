export const connections = [
    {   
        title: "Chat & Forum",
        children: [
            {
                name: "Element",
                description: 'Join us for a chat',
                logo: "/img/icons/element-32x32-black.png", 
                tooltip: 'Join us for a chat: Get help 24/7 or just hang out with your fellow patchers.',
                link: 'https://matrix.to/#/#vvvv-space:matrix.org',
                alt: 'Join us for a chat'
            },
            {
                name: "Discourse",
                description: 'Use the Forum',
                tooltip: '',
                link: 'https://forum.vvvv.org',
                alt: 'Use the Forum'
            },
            {
                name: "Mobilizon",
                description: 'Join us for a meetup', 
                logo: "/img/icons/Mobilizon-logo.svg",
                link: 'https://mobilize.berlin/@vvvvmeetups',
                alt: 'Join us for a meetup: real-world, in-person drinks and presentations around vvvv.',
            }
        ],
        order: 0
    },
    {   
        title: "Repos & Packages",
        children:[
            {
                name: "GitHub",
                children: [
                    {
                        description: 'Open sources of vvvv',
                        link: 'https://github.com/vvvv',
                        alt: 'Open sources of vvvv on GitHub'
                    },
                    {   
                        description: 'Repos tagged with "VL"',
                        link: 'https://github.com/topics/vl',
                        alt: 'Repos tagged with "VL"'
                    },
                    {
                        description: 'List of User repositories',
                        link: '',
                        alt: 'User repos'
                    }
                ],
            },
            {
                name: "Nuget",
                children: [
                    {   
                        description: 'NuGets tagged with "VL"',
                        link: 'https://www.nuget.org/packages?q=Tags%3A%22VL%22&prerel=true&sortby=created-desc',
                        alt: 'NuGets tagged with "VL"'
                    },
                    {
                        description: 'List of User NuGets',
                        link: '',
                        alt: ''
                    }
                ],
            }
        ],
        order: 1
    },
    {   
        title: "Social Networks",
        children:[
            {
                name: "Mastodon",
                children: [
                    {
                        description: 'Follow our news',
                        link: 'https://mastodon.xyz/@vvvv',
                        alt: 'Follow our news on Mastodon',
                    },
                    {
                        description: "Posts tagged with #vvvv", 
                        link: 'https://mastodon.xyz/tags/vvvv',
                        alt: 'Posts tagged with #vvvv',
                    }
                ]
            },
            {
                name: "LinkedIn",
                description: "Follow our posts", 
                logo: "/img/icons/linkedin32x32.png",
                link: 'https://www.linkedin.com/company/vvvv-group',
                alt: 'Do big business on LinkedIn',
            },
            {
                name: "Pixelfed",
                description: 'Screenshot gallery',
                link: 'https://pixelfed.social/madewithvvvv',
                alt: 'Follow a shared screenshot gallery on Pixelfed',
            }
        ],
        order: 6
    },
    {   
        title: "Videos",
        children: [
            {
                name: "YouTube",
                description: 'Official tutorials',
                logo: "/img/icons/youtube-32x32.png",
                link: 'https://www.youtube.com/@vvvvTv42',
                alt: 'Watch tutorials on YouTube',
            },
           {
                name: "VVVV TV",
                description: 'vvvvTv Season 2',
                logo: "/img/icons/youtube-32x32.png",
                link: 'https://www.youtube.com/watch?v=uvLNZsStve8&list=PLBTgwgsWWcT8eDfjAg299o7paRqkd2Zdi&pp=gAQB',
                alt: 'Watch vvvvTv Episodes',
            },
           {
                description: 'Tutorials by chk',
                logo: "/img/icons/youtube-32x32.png",
                link: 'https://www.youtube.com/watch?v=7m1EzfxUtzo&list=PL2KeRstDQVRRVnzCHEambwAI4yWmpIF-p',
                alt: 'Essential beginner video tutorials',
            },
           {
                description: 'Tutorials by TobyK',
                logo: "/img/icons/youtube-32x32.png",
                link: 'https://www.youtube.com/watch?v=RXDRfqLbc74&list=PLEncasrnvr2bkPb0QKdU1DrDs4Hd_Jr0V',
                alt: 'Intermediate Level Tutorials',
            },
           {
                description: 'More Tutorials & Courses',
                logo: "/img/icons/youtube-32x32.png",
                link: 'https://thegraybook.vvvv.org/#getting-started',
                alt: 'More Tutorials & Courses',
            }            
        ],
        order: 7
    }
]
