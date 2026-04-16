
if (window.location.pathname === '/')
{
    document.addEventListener("DOMContentLoaded", async () => {        
    
        const heroContent = document.getElementById('hero-content');
        const imageTag = document.getElementById('hero-image').getElementsByTagName('img')[0];

        const title = heroContent.getElementsByClassName('title')[0];
        const author = heroContent.getElementsByClassName('author')[0];
        const photographer = heroContent.getElementsByClassName('photographer')[0];

        let images = [];
        let currentIndex = 0;

        function setHeroImage(index)
        {
            const image = images[index];

            imageTag.setAttribute('src', image.url);
            imageTag.setAttribute('srcset', `${image.url}, 3072w`);

            title.textContent = image.title;
            author.textContent = image.author;
            photographer.textContent = image.photographer;
        }

        function makeTagVisible()
        {
            heroContent.style.visibility = 'visible';
            heroContent.style.opacity = '1';
        }
    
        imageTag.addEventListener('load', makeTagVisible);

        imageTag.addEventListener('click', ()=>{
            currentIndex = (currentIndex + images.length + 1) % images.length;
            setHeroImage(currentIndex);
        });


        // try{
        //     images = await fetchHero();
        //     currentIndex=Math.floor(Math.random()*(images.length));
        //     setHeroImage(currentIndex);
        // }
        // catch (error) {
        //     makeTagVisible();
        //     console.log ("Can't fetch project images");
        // }

        async function fetchHero()
        {
            const response = await fetch('https://data.vvvv.org/items/Hero');

            if (!response.ok)
            {
                const json = await response.json();
                throw new Error (json);
            }

            const json = await response.json();

            return json.data.map (d=>{
                return {
                    url: d.image,
                    title: d.title,
                    author: d.author,
                    photographer: d.photographer,
                }
            })
        }

        const heroBox = document.getElementById('hero-box');

        const featureTexts = Array.from(heroBox.getElementsByTagName('section'));
        const featureLines = Array.from(heroBox.getElementsByTagName('li'));
        const arrows = Array.from(heroBox.getElementsByClassName('arrows')[0].getElementsByTagName('div'));

        let currentFeature = 0;

        if (arrows.length)
        {
            const count = featureLines.length;
            arrows.forEach(arrow => {
                arrow.addEventListener('click', ()=>{
                    const nextIndex = arrow.classList.contains('right') ? (currentFeature+1) % count : currentFeature-1 < 0 ? count-1 : currentFeature-1;
                    featureLines[nextIndex].click();
                })
            })
        }

        if (featureTexts.length)
        {
            featureTexts.forEach(text => {
                
                const img = text.dataset.img;
                if (img) 
                    images.push({
                        url: img,
                        title: "",
                        author: "",
                        photographer: "",
                    });

                text.addEventListener('transitionend', ()=>{
                    if (!text.classList.contains('selected'))
                    {
                        text.classList.remove('visible');
                    }
                })

            });
            setHeroImage(0);
        }

        if (featureLines.length)
        {
            featureLines.forEach(line => {
                line.addEventListener('click', (e) => {
                    featureLines[currentFeature].classList.remove('selected');
                    e.target.classList.add('selected');
                    currentFeature = e.target.dataset.index;
                    featureTexts.forEach(t => t.classList.remove('selected'));
                    featureTexts[currentFeature].classList.add('selected', 'visible');
                    
                    setHeroImage(currentFeature);
                });
            });
        }
    })
}
    
