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

    /////////////////////////////////////////
   
    function filterItems(query)
    {
        var counter = 0;

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

                e.categories.forEach(c=>{
                    c.contentElement.hidden = false;

                    c.packs.forEach(p=>{
                        p.element.hidden = false;
                    })
                })

                e.menuElement.classList.remove('inactive');
            })
            return;
        }

        data.forEach((e)=>{

            counter = 0;
            
            if (e.title.toLowerCase().includes(query))
            {
                setVisibility(e.contentElement, true);
                
                counter += e.packs.length;

                e.packs.forEach(p=>{
                    p.element.hidden = false;
                })

                e.categories.forEach(c => counter += c.packs.length);
                setCounter(e.menuElement, counter);
            }
            else
            {
                if (e.categories)
                {
                    e.categories.forEach(c=>{

                        var innerCounter = 0;

                        if (c.title.toLowerCase().includes(query))
                        {
                            innerCounter = c.packs.length;
                            c.packs.forEach((p)=>p.element.hidden = false);
                        }
                        else
                        {
                            c.packs.forEach((p)=>{
                                if (p.info.includes(query))
                                {
                                    innerCounter ++;
                                    p.element.hidden = false;
                                }
                                else
                                {
                                    p.element.hidden = true;
                                }
                            })
                        }

                        if (innerCounter > 0)
                        {
                            c.contentElement.hidden = false;
                            counter += innerCounter;
                        }
                        else
                        {
                            c.contentElement.hidden = true;
                        }

                    });              
                }
                
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
            }        

            setCounter(e.menuElement, counter);

        })
    }

    function setCounter(item, count)
    {
        if (item)
        {
            item.disabled = count == 0;
            const countElement = item.querySelector('[data-count]');
            if (count > 0)
            {
                countElement.hidden = false;
                countElement.textContent = count;
                item.classList.remove('inactive');
            }
            else
            {
                countElement.hidden = true;
                item.classList.add('inactive');
            }
        }
    }

    function setUpSearchField()
    {
        const clearBtn = document.getElementById('clearBtn');
        const input = document.querySelector('#filter');

        if (input.value)
        {
            filterItems(input.value);
        }
    
        input.focus();

        clearBtn.addEventListener('click', () => {
            input.value = '';
            input.focus();
            input.dispatchEvent(new Event('input', { bubbles: true }));
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

        const data = collectCategories(menuMap);

        console.log(data);

        return data;
    }

    function collectCategories(menuMap)
    {
        const catContent = document.querySelectorAll('[data-category-content]');
        
        if (catContent)
        {
            const data = [...catContent].map((category)=>{
                const title = category.dataset.categoryContent;
    
                const newCategory = {
                    title,
                    contentElement: category,
                    menuElement: menuMap.get(title),
                    packs: collectPacks(category)
                };
    
                const subcategories = category.querySelectorAll('[data-category-sub]');
                if (subcategories)
                {
                    newCategory.categories = [...subcategories].map(c=>{
                        return {
                            title: c.dataset.categorySub,
                            contentElement: c,
                            packs: collectPacks(c)
                        }
                    });
                }
    
                return newCategory;
            })

            return data;
        }

        return null;
    }

    function collectPacks(element)
    {
        const packs = element.querySelectorAll(':scope > [data-pack], :scope > [data-content] > [data-pack]');

        if (packs)
        {
            const result = [...packs].map((p)=>{
                var data = "";
    
                const info = p.querySelectorAll('[data-pack-info');
                info.forEach((i)=>{
                    data += i.textContent.toLowerCase();
                });
    
                return {element: p, info: data};
            })
    
            return result;
        }

        return null;
    }
 
}, true);