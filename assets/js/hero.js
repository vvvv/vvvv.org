
if (window.location.pathname === '/')
{
    document.addEventListener("DOMContentLoaded", async () => {        
    
        const hero = document.getElementById('hero-content');
        const heroImage = document.getElementById('hero-image'); 
        const imageTag = heroImage.getElementsByTagName('img')[0];

        const attr = document.getElementById('hero-attribution');
        const attribution = {
            title: attr.getElementsByClassName('title')[0],
            author: attr.getElementsByClassName('author')[0],
            photographer: attr.getElementsByClassName('photographer')[0]
        }

        const heroBox = document.getElementById('hero-box');

        const featureTexts = Array.from(heroBox.getElementsByTagName('section'));
        const featureLines = Array.from(heroBox.getElementsByTagName('li'));
        const arrows = Array.from(heroBox.getElementsByClassName('arrows')[0].getElementsByTagName('div'));

        const track = document.getElementById('track');
        const slides = Array.from(track.getElementsByClassName('slide'));
        const total = slides.length;

        let currentFeature = 1;
        let animating = false;

        let images = [];
        let currentIndex = 0;

        const stateEvent = new EventTarget();

        const appStateCore = {
            index: -1,
            lastIndex: -1,
            isAnimating: false
        }

        const appState = new Proxy(appStateCore,{
                set (target, prop, value) {

                    if (prop === 'index')
                    {
                        target['lastIndex'] = Math.max(target[prop], 0);
                        target[prop] = value;
                    }
                    
                    target[prop] = value;

                    const event = new CustomEvent (`changed:${prop}`, {
                        detail: {
                            value: value,
                            state: {...target}
                        } 
                    });

                    stateEvent.dispatchEvent(event);

                    return true;
                }
        });

        setup();
        init();

        function init()
        {
            updateTrackWithoutAnimation(0);
            slides[1].classList.toggle('active');
            appState.index = 0;
            setAttribution(1);
            hero.style.setProperty('opacity', 1);
        }

        function setup()
        {
            stateEvent.addEventListener('changed:index', (e)=>{

                console.log (e);

                const { value, state } = e.detail;

                if (state.isAnimating || value === state.lastIndex)
                    return;

                animate(value);

            })

            //setup track:
            track.addEventListener('transitionend', ()=>{
                appState.isAnimating = false;
            })

            //setup images:
            if (slides.length)
            {
                const activeTitles = slides.length - 2;
                slides.forEach((slide, index)=>{
                    slide.addEventListener('click', ()=>{

                        if (appState.isAnimating)
                            return;

                        switch (index)
                        {
                            case 0:
                                appState.index = activeTitles - 1;
                                break;
                            case slides.length - 1:
                                appState.index = 0;
                                break;    
                            default: 
                                appState.index = index - 1;    
                        }
                    })
                })
            }


            //setup texts
            if (featureTexts.length)
            {
                featureTexts.forEach(text => {
                    text.addEventListener('transitionend', ()=>{
                        if (!text.classList.contains('selected'))
                        {
                            text.classList.remove('visible');
                        }
                    })
                });            
            }

            //setup featureLines 
            if (featureLines.length)
            {
                featureLines.forEach((line, index) => {
                    line.addEventListener('click', (e) => {

                        if (appState.isAnimating)
                            return;

                        appState.index = index;
                    });
                });
            }

            //setup arrows:
            if (arrows.length)
            {
                const activeTitles = slides.length - 2;

                arrows.forEach(arrow => {
                    arrow.addEventListener('click', ()=>{

                        if (appState.isAnimating)
                            return;

                        const nextIndex = arrow.classList.contains('right') ? (appState.index+1) % activeTitles : appState.index-1 < 0 ? activeTitles-1 : appState.index-1;
                        appState.index = nextIndex;
                    })
                })
            }

            //setup resize:
            window.addEventListener('resize', ()=>{
                updateTrackWithoutAnimation(appState.index);
            });   
        }

        function updateTrackWithoutAnimation(index)
        {
            track.classList.add('no-transition');              
            updateTrack(index);
            track.offsetWidth;
            track.classList.remove('no-transition');
        }


        function animate(index) {

            appState.isAnimating = true;
            
            slides.forEach((slide, i) => {
                slide.classList.toggle('active', i === index + 1);
            });

            featureLines[appState.lastIndex].classList.remove('selected');
            featureLines[index].classList.add('selected');
            
            featureTexts[appState.lastIndex].classList.remove('selected');
            featureTexts[index].classList.add('selected', 'visible');

            attribution.title.text = featureTexts[index].dataset.title;
            attribution.author.text = featureTexts[index].dataset.author;
            attribution.photographer.text = featureTexts[index].dataset.photographer;

            setAttribution(index);

            updateTrack(index);
        }

        function updateTrack(index) {

            arrows[0].classList.toggle('disabled', index === 0);
            arrows[1].classList.toggle('disabled', index === total - 3);

            const heroW  = heroImage.offsetWidth;
            const slideW = heroW * 0.80;
            const offset = (heroW - slideW) / 2;
            track.style.transform = `translateX(${offset - index * slideW - slideW }px)`;
        }

        function setAttribution(index)
        {
            attribution.title.innerHTML = featureTexts[index].dataset.title;
            attribution.author.innerHTML = featureTexts[index].dataset.author;
            attribution.photographer.innerHTML = featureTexts[index].dataset.photographer || "";
        }


        // function makeTagVisible()
        // {
        //     hero.style.visibility = 'visible';
        //     hero.style.opacity = '1';
        // }




        // async function fetchHero()
        // {
        //     const response = await fetch('https://data.vvvv.org/items/Hero');

        //     if (!response.ok)
        //     {
        //         const json = await response.json();
        //         throw new Error (json);
        //     }

        //     const json = await response.json();

        //     return json.data.map (d=>{
        //         return {
        //             url: d.image,
        //             title: d.title,
        //             author: d.author,
        //             photographer: d.photographer,
        //         }
        //     })
        // }

    })
}
    
