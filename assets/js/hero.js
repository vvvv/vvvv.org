document.addEventListener("DOMContentLoaded", async () => { 

    const imageURL = (id) => `https://data.vvvv.org/assets/${id}`;
 
    const heroContent = document.getElementById('hero-content');
    const imageTag = document.getElementById('hero-image');
    const title = heroContent.getElementsByClassName('title')[0];
    const author = heroContent.getElementsByClassName('author')[0];
    const photographer = heroContent.getElementsByClassName('photographer')[0];

    let images = [];
    let currentIndex = 0;

    function setHeroImage(index)
    {
        const image = images[index];

        imageTag.setAttribute('src', imageURL(image.image_id));
        imageTag.setAttribute('srcset', `${imageURL(image.image_id)}, 3072w`);

        title.textContent = image.title;
        author.textContent = image.author;
        photographer.textContent = image.photographer;
    }

    function makeTagVisible()
    {
        heroContent.style.visibility = 'visible';
        heroContent.style.opacity = '100';
    }
  
    imageTag.addEventListener('load', makeTagVisible);

    imageTag.addEventListener('click', ()=>{
        currentIndex = (currentIndex + images.length + 1) % images.length;
        setHeroImage(currentIndex);
    });


    try{
        images = await fetchHero();
        currentIndex=Math.floor(Math.random()*(images.length));
        setHeroImage(currentIndex);
    }
    catch (error) {
        makeTagVisible();
        console.log ("Can't fetch project images");
    }

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
                image_id: d.image,
                title: d.title,
                author: d.author,
                photographer: d.photographer,
            }
        })
    }
})