window.addEventListener ('DOMContentLoaded',()=>{
    const content = document.getElementById('packsContent');
    content.hidden = true;
});

window.addEventListener ("load", ()=> {

    const filtered = document.querySelector('[data-filter]');
    const filteredCount = filtered.querySelector('[data-filter-count]');
    const twoWeeks = 14 * 24 * 60 * 60 * 1000;
    const updatedPacks = [];
    const content = document.getElementById('packsContent');
    const processing = document.getElementById('packsProcessing');
    content.hidden = true;
    
    const data = collectData();
    fillUpdates();
    setUpSearchField();

    content.hidden = false;
    processing.hidden = true;

    /////////////////////////////////////////

    function fillUpdates()
    {
        const menuItem = document.querySelector('[data-category-menu = "Updates"]');
        const categoryItem = document.querySelector('[data-category-content = "Updates"]');
        const contentItem = categoryItem.querySelector('[data-content]');

        if (updatedPacks.length == 0)
        {
            menuItem.disabled = true;
            menuItem.classList.add('inactive');   
        }
        else
        {
            menuItem.disabled = false;
            menuItem.classList.add('active');

            const badge = menuItem.querySelector('[data-badge]');
            badge.hidden = false;
            badge.textContent = updatedPacks.length;

            updatedPacks.sort((a,b)=>a.element.dataset.pack.localeCompare(b.element.dataset.pack));
            const elements = updatedPacks.map(e=>e.element);
            contentItem.append(...elements);

            const updatesCategory = data.filter((d)=>d.title === 'Updates');

            if (updatesCategory)
            {
                updatesCategory.contentElement = contentItem;
                updatesCategory.menuElement = menuItem;
                updatesCategory.packs = updatedPacks;
            }

        }
        
    }
   
    function filterItems(query)
    {
        var counter = 0;
        const foundPacks = new Set();
        const menuItemsWithPacks = [];

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

                if (e.categories)
                {
                    e.categories.forEach(c=>{
                        c.contentElement.hidden = false;
    
                        c.packs.forEach(p=>{
                            p.element.hidden = false;
                        })
                    })
                }

                e.menuElement.classList.remove('inactive');
            })

            filtered.hidden = true;

            return;
        }

        data.forEach((e)=>{

            counter = 0;
            
            if (e.title.toLowerCase().includes(query))
            {
                setVisibility(e.contentElement, true);
                
                counter += e.packs.length;

                if (e.packs)
                {
                    e.packs.forEach(p=>{
                        p.element.hidden = false;
                        foundPacks.add(p.element.dataset.pack);
                    })
                }

                if (e.categories)
                {
                    e.categories.forEach(c => counter += c.packs.length);
                }
                setCounter(e.menuElement, counter);
                if (counter > 0)
                {
                    menuItemsWithPacks.push({title: e.title, element: e.menuElement});
                }
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
                            c.packs.forEach((p)=>{
                                p.element.hidden = false;
                                foundPacks.add(p.element.dataset.pack);
                            });
                        }
                        else
                        {
                            c.packs.forEach((p)=>{
                                if (p.info.includes(query))
                                {
                                    innerCounter++;
                                    p.element.hidden = false;
                                    foundPacks.add(p.element.dataset.pack);
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
                        counter++;
                        p.element.hidden = false;
                        foundPacks.add(p.element.dataset.pack);
                    }
                    else
                    {
                        p.element.hidden = true;
                    }
                })

                setVisibility(e.contentElement, counter > 0);
            }        

            setCounter(e.menuElement, counter);
            if (counter > 0)
            {
                menuItemsWithPacks.push({title: e.title, element: e.menuElement});
            }
            
        })

        if (foundPacks.size > 0)
        {
            filtered.hidden = false;
            filteredCount.textContent = foundPacks.size;
        }

        addCategoryLinksToEmpty(menuItemsWithPacks);
    }

    function addCategoryLinksToEmpty(items)
    {
        const div = document.createElement("div");
        const p = document.createElement("p");
        div.appendChild(p);
        div.classList.add('emptyContent');
        
        if (items.length)
        {
            p.textContent = "No packs here. These categories have some:";
            const ul = document.createElement("ul");
            div.appendChild(ul);

            items.forEach(i=>{
                const li = document.createElement("li");
                const a = document.createElement("a");
                a.textContent = i.title;
                a.href = `#`;
                a.dataset.target = i.title;
                li.appendChild(a);
                ul.appendChild(li);
            })
        }
        else
        {
            p.textContent = "No packs found."
        }

        data.forEach((e)=>{
            const empty = e.contentElement.querySelector('[data-empty]');

            if (empty && !empty.hidden)
            {
                empty.replaceChildren(div.cloneNode(true));
                const links = empty.getElementsByTagName('a');
                [...links].forEach(a=>{
                    a.addEventListener('click', ()=>{
                        $(`button[data-category-menu="${a.dataset.target}"]`).tab('show');
                    })
                })
            }
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
            
            // Set Updated / New badges
            result.forEach (p => setBadge(p));
    
            return result;
        }

        return null;
    }

    function setBadge(pack)
    {
        const lastPublished = parseInt(pack.element.dataset.lastPublished);
        const firstPublished = parseInt(pack.element.dataset.firstPublished);

        const badge = pack.element.querySelector('[data-badge]');

        if (new Date(lastPublished).getTime() + twoWeeks > Date.now()) 
        {
            badge.hidden = false;
            if (firstPublished != lastPublished) {
                badge.textContent = "UPDATED";
                badge.classList.add("badge","badge-primary");
            }
            else{
                badge.textContent = "NEW";
                badge.classList.add("badge","badge-success");
            }

            updatedPacks.push({
                element: pack.element.cloneNode(true),
                info: pack.info
            })
        }
        else
        {
            badge.hidden = true;
        }
    }
 
}, true);