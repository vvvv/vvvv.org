document.addEventListener("DOMContentLoaded", (event) => { 

    const images = [
        [
            ['header_70_1_3072.jpg', '3072w'],
        ],
        [
            ['header_70_2_3072.jpg','3072w']
        ],
        [
            ['header_70_3_3072.jpg', '3072w']
        ],
        [
            ['header_70_4_3072.jpg','3072w']
        ],
        [
            ['header_70_5_3072.jpg','3072w']
        ],
        [
            ['header_70_6_3072.jpg', '3072w']
        ],
    ]
 
    const image = document.getElementById('hero-image');

    function setHeroImage(index)
    {
        image.setAttribute('src', `/img/${images[index][0][0]}`);
        image.setAttribute('srcset', `/img/${images[index].map(e=>e.join(" ")).join(',')}`);
    }
    
    let currentIndex = Math.floor(Math.random()*(images.length-1));
    setHeroImage(currentIndex);
  
    image.addEventListener('load', () => {
        console.log('Image loaded:', image.currentSrc);
        image.style.visibility = 'visible';
        image.style.opacity = '100';
    });

    image.addEventListener('click', ()=>{
        currentIndex = (currentIndex + images.length + 1) % images.length;
        setHeroImage(currentIndex);
    });
  
  // const handle = document.getElementsByTagName('header')[0];
  // handle.addEventListener('click', ()=>{
  //   currentIndex = (currentIndex + images.length + 1) % images.length;
  //   handle.style.backgroundImage = `url(/img/${images[currentIndex]})`;
  // });
})

//   const images = [
//     [
//       'header_70_AAAA_004210_3072.jpg 3072w',
//     ],
//     ['header_70_aaaa_009149_3072.jpg 3072w'],
//     ['header_70_BBBB_000966-bw_3072.jpg 3072w'],
//     ['header_70_jjjj_000646_3072.jpg 3072w'],
//     ['header_70_jjjj_000646-bw_3072.jpg 3072w'],
//     [
//       'refik-anadol-frank-gehry-blueprints-ai-generated-landscapes-guggenheim-bilbao-designboom-large02-1024.jpg w1024',
//       'refik-anadol-frank-gehry-blueprints-ai-generated-landscapes-guggenheim-bilbao-designboom-large02.jpg w1800'
//     ]
//   ]
 
//   const handle = document.getElementById('hero-image');

//   function setHeroImage(index)
//   {
//       handle.setAttribute('srcset', `/img/${images[index].join(',')}`);
//   }
 
//   let currentIndex = Math.floor(Math.random()*(images.length-1));
//   setHeroImage(currentIndex);
//   handle.addEventListener('click', ()=>{
//     currentIndex = (currentIndex + images.length + 1) % images.length;
//     setHeroImage(currentIndex);
//   });
  
//   // const handle = document.getElementsByTagName('header')[0];
//   // handle.addEventListener('click', ()=>{
//   //   currentIndex = (currentIndex + images.length + 1) % images.length;
//   //   handle.style.backgroundImage = `url(/img/${images[currentIndex]})`;
//   // });