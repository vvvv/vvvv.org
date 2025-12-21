// var categories = new Map();
// var packs = new Map();

// window.addEventListener ("load", ()=> {

//     const input = document.querySelector('#filter');
    
//     input.addEventListener('input', e=>{
//         const query= e.target.value.trim().toLowerCase();
//         filterItems(query);
//     })

//     function filterItems(query)
//     {
//         const result = [...packs.entries()].filter((entry)=>
//            entry[1].toLowerCase().includes(query)
//         );

//         const active = result.map( r => r[0]);

//         [...packs.keys()].forEach(p=>{
//             p.hidden = active.includes(p) ? false : true;
//         })
//     }

//     const catItems = document.querySelectorAll('[data-pack-category]');
    
//     catItems.forEach((c)=>{
//         categories.set(c.dataset.packCategory, c);
//     })

//     // categories[0].disabled=true;
//     // categories[0].classList.remove('active');

//     const packItems = document.querySelectorAll('[data-pack]');

//     packItems.forEach((p)=>{
//         const infos = p.querySelectorAll('[data-pack-info]');
        
//         var data = "";
        
//         infos.forEach(i=>{
//             data += i.textContent;
//         }) 

//         packs.set(p, data);
//     })

//     // console.log (categories);
//     //console.log (packs);
// }, true);