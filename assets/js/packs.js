const content = [
    {
        title: String,
        menuElement: HTMLElement,
        contentElement: HTMLElement,
        packs: [{HTMLElement, String}],
        categories: [
            {
                title: String,
                contentElement: HTMLElement,
                packs: [{HTMLElement, String}]
            }
        ]
    }
]



window.addEventListener ("load", ()=> {

    const data = collectData();
    setUpSearchField();

    console.log (data);

    /////////////////////////////////////////

    
    function filterItems(query)
    {
        if (query === '')
        {
            data.forEach((e)=>{
                e.packs.forEach((p)=>{
                    p.element.hidden = false;
                })
                setVisibility(e.contentElement, true);

                if (e.menuElement)
                {
                    e.menuElement.disabled = false;
                    e.menuElement.querySelector('[data-count]').hidden = true;
                }
            })

            return;
        }

        data.forEach((e)=>{
            var counter = 0;
            e.packs.forEach((p)=>{
                if (p.info.includes(query))
                {
                    counter ++;
                    p.element.hidden = false;
                }
                else
                {
                    p.element.hidden = true;
                }
            })

            setVisibility(e.contentElement, counter > 0);

            if (e.menuElement)
            {
                e.menuElement.disabled = counter == 0;
                const count = e.menuElement.querySelector('[data-count]');
                if (counter > 0)
                {
                    count.hidden = false;
                    count.textContent = counter;
                }
                else
                {
                    count.hidden = true;   
                }
            }
        })

        // const result = data.filter((entry)=>
        //    entry[1].toLowerCase().includes(query)
        // );

        // const active = result.map( r => r[0]);

        // [...packs.keys()].forEach(p=>{
        //     p.hidden = active.includes(p) ? false : true;
        // })
    }

    function setUpSearchField()
    {
        const clearBtn = document.getElementById('clearBtn');
        const input = document.querySelector('#filter');

        clearBtn.addEventListener('click', () => {
            input.value = '';
            input.focus();
        });
    
        input.addEventListener('input', e=>{
            const query= e.target.value.trim().toLowerCase();
            filterItems(query);
        })

        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
                e.preventDefault(); // prevent browser search shortcut
                input.value = '';
                input.focus();
                input.dispatchEvent(new Event('input', { bubbles: true }));
            }

            if (e.key === 'Escape') {
                input.value = '';
                input.focus();
                input.dispatchEvent(new Event('input', { bubbles: true }));
            }
        });
    }

    function setVisibility(element, state)
    {
        const content = element.querySelector('[data-content]');
        if (content) content.hidden = !state;

        const empty = element.querySelector('[data-empty]');
        if (empty) empty.hidden = state;

        if (!content)
        {
            element.hidden = !state;
        }
    }
    
    function collectData()
    {
        // Getting Menu Map
        const menuMap = new Map();
        const catMenuItems = document.querySelectorAll('[data-category-menu]');
        catMenuItems.forEach((c)=>{
            menuMap.set(c.dataset.categoryMenu, c);
        })

        console.log (menuMap);

        const data = [];
        // Getting all Category Content
        collectCategories('[data-category-content]', menuMap, data);
        collectCategories('[data-category-sub]', menuMap, data);

        return data;
    }

    function collectCategories(dataElement, menuMap, data)
    {
        const catContent = document.querySelectorAll(dataElement);
        catContent.forEach((category)=>{
            const newCategory = {};
            newCategory.title = category.dataset.categoryContent
            newCategory.contentElement = category;
            newCategory.menuElement = menuMap.get(newCategory.title);
            newCategory.packs = [];

            const packs = category.querySelectorAll('[data-pack]');
            packs.forEach((p)=>{
                var data = "";

                const info = p.querySelectorAll('[data-pack-info');
                info.forEach((i)=>{
                    data += i.textContent.toLowerCase();
                });

                newCategory.packs.push({element: p, info: data});
            })
            data.push(newCategory);
        })
    }
 
}, true);


//    const input = document.querySelector('#filter');
    
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

//     const catMenuItems = document.querySelectorAll('[data-category-menu]');
    
//     catMenuItems.forEach((c)=>{
//         categoryMenu.set(c.dataset.categoryMenu, c);
//     })

//     const catContItems = document.querySelectorAll('[data-category-content]');
    
//     catContentItems.forEach((c)=>{
//         categoryContent.set(c.dataset.categoryContent, c);
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