window.addEventListener ("load", ()=> {

    const twoWeeks = 14 * 24 * 60 * 60 * 1000;
    const updatedPacks = [];
    const processing = document.getElementById('packsProcessing');
    const toc = document.getElementById('toc');
    const dropdownToc = document.getElementById('dropdownToc');
    const found = document.getElementById('filterCount');
    const input = document.querySelector('#filter');

    let query = input.value;

    toc.hidden = true;

    // const data = collectData();

    let menu = new Map();

    // fillUpdates();
    collectMenu();
    buildMenu();

    setUpSearchField();
    setUpCategoryLinks();

    processing.hidden = true;
    toc.hidden = false;

    /////////////////////////////////////////

    function buildMenu()
    {
        const content = document.getElementById('v-pills-content');
        const contentDiv = content.querySelector('[data-content]');

        //Setup Menu Items
        const menuItems = toc.getElementsByTagName('button');
        // const dropdownItems = dropdownToc.getElementsByTagName('button');

        [...menuItems].forEach(button=>{
            const categoryTitle = button.dataset.categoryMenu;
            button.setAttribute("href", "#v-pills-content");
            button.setAttribute("aria-controls", "v-pills-content");

            //jquery - replace it with native addeventlistener, when switching to bootstrap 5.
            $(button).on('shown.bs.tab', () => {            
                const title = content.getElementsByTagName('h1')[0];
                contentDiv.replaceChildren();
                
                showContentForEmpty(false);
                
                title.textContent = categoryTitle;
                const value = menu.get(categoryTitle);
                value.elements.forEach(e=>
                {
                    e.hidden = !isVisible(e);
                    contentDiv.appendChild(e.cloneNode(true));
                });

                if (value.children.size)
                {
                    const sortedSections = Array.from(value.children.values()).sort((a, b)=>{a.name.localeCompare(b.name)});
    
                    sortedSections.forEach(c=>{
                        
                        const h2 = document.createElement('h2');
                        h2.textContent = c.name;
                        
                        const div = document.createElement('div');
                        div.classList.add('section');
                        div.appendChild(h2);
                        
                        let count = 0;

                        c.elements.forEach(e=>{
                            e.hidden = !isVisible(e);
                            div.appendChild(e.cloneNode(true));
                            if (!e.hidden) 
                                {   
                                    count++;
                                }
                        });

                        div.hidden = count == 0;

                        contentDiv.appendChild(div);
    
                    });
                }

                setUpCategoryLinks();
            });
        });

        showFoundCounter(false);
    }

    function collectMenu()
    {
        const content = document.querySelector('[data-category-content]');
        const elements = Array.from(content.getElementsByTagName('article'));
        
        const menuItems = Array.from(document.querySelectorAll('[data-category-menu]'));

        menu.set("All", {
            name: "All",
            elements: elements,
            children: [],
            menuItem: menuItems.find(m=>m.dataset.categoryMenu == "All")
        })

        fillUpdated(elements, menuItems);

        for (const element of elements)
        {
            let paths;

            try {
                paths = JSON.parse(element.dataset.categories);
            }
            catch{
                continue;
            }

            if (!paths.length)
            {
               const item = menu.get("Unsorted");

                if (item)
                {
                    item.elements.push(element);
                }
                else{
                    menu.set("Unsorted",{
                        name: "Unsorted",
                        elements: [element],
                        children: new Map(),
                        menuItem: menuItems.find(m=>m.dataset.categoryMenu == "Unsorted")
                    })
                } 
            }

            for (const path of paths)
            {
                const [parent, child] = path;

                if (!menu.has(parent))
                {
                    menu.set(parent, {
                        name: parent,
                        children: new Map(),
                        elements: [],
                        menuItem: menuItems.find(m=>m.dataset.categoryMenu == parent)
                    })
                }

                const parentNode = menu.get(parent);

                if (child)
                {
                    const childNode = parentNode.children.get(child);

                    if (childNode)
                    {
                        childNode.elements.push(element);
                    }
                    else
                    {
                        parentNode.children.set(child, {
                            name: child,
                            elements: [element]
                        })
                    }
                }
                else
                {
                    parentNode.elements.push(element);
                }
            }
        }

        return menu;
    }


    function setUpCategoryLinks()
    {
        const elements = document.querySelectorAll('[data-category-link');

        [...elements].forEach(e=>{
            e.addEventListener('click', ()=>{
                $(`button[data-category-menu="${e.dataset.categoryLink}"]`).tab('show');
            })
        })
    }

    function fillUpdated(elements, menuItems)
    {
        const updatedPacks = [];
        const title = "New & Updated";

        elements.forEach (e=>{
            const updated = setNewUpdatedBadge(e); 
            if (updated) updatedPacks.push(e);
        });

        updatedPacks.sort((a,b)=>a.element.dataset.pack.localeCompare(b.element.dataset.pack));
        
        const menuItem = menuItems.find(m=>m.dataset.categoryMenu == title);
        
        const badge = menuItem.querySelector('[data-badge]');
        badge.hidden = !updatedPacks.length;
        badge.textContent = updatedPacks.length;

        menu.set(title, {
            name: title,
            elements: updatedPacks,
            children: [],
            menuItem: menuItem 
        });
        
    }

    function filterToc(query)
    {
        const set = new Set();
        
        menu.forEach((value, key)=>{
            if (key.toLowerCase().includes(query))
            {
                set.clear();

                value.elements.forEach(e=>{
                    set.add(e.dataset.pack);
                })

                if (value.children && value.children.size)
                {
                    value.children.forEach(c => {
                        c.elements.forEach(e=>{
                            set.add(e.dataset.pack);
                        })
                    })
                }
            }
            else
            {
                set.clear();

                value.elements.forEach(e=>{
                    if (isVisible(e)) set.add(e.dataset.pack);
                })

                if (value.children && value.children.size)
                {
                    value.children.forEach(c=>{
                        c.elements.forEach(e=>{
                            if (isVisible(e)) set.add(e.dataset.pack);
                        })
                    })
                }

            }

            const countSpan = value.menuItem.querySelector('[data-count]');

            if (set.size > 0)
            {
                value.menuItem.classList.remove('inactive');
                countSpan.textContent = set.size;
                countSpan.hidden = false;
            }
            else
            {
                value.menuItem.classList.add('inactive');
                countSpan.hidden = true;
            }
        })
    }

    function isVisible(e)
    {
        return e.dataset?.search?.toLowerCase().includes(query);
    }

    function filterContent(content, query)
    {
        let totalCount = 0;

        [...content.children].forEach (e=>{
            
            e.hidden = !isVisible(e);
            if (!e.hidden) totalCount++;

            if (e.classList.contains('section'))
            {
                const packs = e.getElementsByTagName('article');
                const title = e.getElementsByTagName('h2')[0];

                let count = 0;

                if (title.textContent.toLowerCase().includes(query))
                {
                    [...packs].forEach(p=>p.hidden = false);
                    count += packs.length;
                }
                else
                {
                    [...packs].forEach(p=>{
                        p.hidden = !isVisible(p);
                        if (!p.hidden) count++;                        
                    })
                }
                e.hidden = count == 0;
                if (!e.hidden) totalCount += count;
            }
        })

        showContentForEmpty(totalCount == 0);
        
        showFoundCounter();
    }

    function showFoundCounter(visible = true)
    {

        if (!visible)
        {
            found.hidden = true;
            return;
        }

        const total = getTotalCount();
        if (total)
        {
            found.getElementsByTagName('span')[0].textContent = total;
            found.hidden = false;
        }
        else{
            found.hidden = true;
        }
    }

    function resetFilter(content, toc)
    {
        content.querySelectorAll('[hidden]').forEach(e=>e.hidden = false);
        toc.querySelectorAll('[data-category-menu]').forEach(e=>{
            e.hidden = false;
            e.querySelector('[data-count]').hidden = true;
            e.classList.remove('inactive');
        });

        menu.forEach((value)=>{
            value.elements.forEach(e=>e.hidden = false);
            if (value.children.length) 
            {
                value.children.forEach(c=>{
                    c.elements.forEach(e=>e.hidden = false);
                })
            }
                    
        })

        showFoundCounter(false);
    }

    function filterItems(query)
    {
        const content = document.querySelector('[data-content]');
        const toc = document.getElementById('toc');
        
        if (query == "")
        {
            resetFilter(content, toc);
            showContentForEmpty(false);
            return;
        }
        
        filterToc(query);
        filterContent(content, query);
    }

    function showContentForEmpty(visible)
    {
        const empty = document.querySelector('[data-empty]');
        empty.replaceChildren();
        
        if (!visible)
        {
            empty.hidden = true;
            return;
        }
            
        const p = document.createElement("p");
        empty.appendChild(p);
                
        const active = Array.from(menu.values()).filter(m => m.menuItem.querySelector('[data-count]').hidden == false);
        const withoutAll = active.filter(a=>a.name!=="All")?.sort((a,b)=>a.name.localeCompare(b.name));
        const count = getTotalCount();

        if (withoutAll.length)
        {
            const ul = document.createElement("ul");
            empty.appendChild(ul);
            
            p.textContent = `${count} Packs found in these categories:`;

            withoutAll.forEach(i=>{
                const li = document.createElement("li");
                const a = document.createElement("a");
                a.textContent = i.name;
                a.href = `#`;
                a.dataset.target = i.name;
                a.addEventListener('click', ()=>{
                    $(`button[data-category-menu="${i.name}"]`).tab('show');
                });
                li.appendChild(a);
                ul.appendChild(li);
            })

        }
        else
        {
            p.textContent = "No packs found."
        }

        if (empty)
        {
            empty.hidden = false;
        }

    }

    function getTotalCount()
    {
        const total = document.querySelector('[data-category-menu="All"]').querySelector('[data-count]').textContent;
        return total;
    }

    function setUpSearchField()
    {
        const clearBtn = document.getElementById('clearBtn');

        if (input.value)
        {
            filterItems(input.value.trim().toLowerCase());
        }
    
        clearBtn.addEventListener('click', () => {
            input.value = '';
            input.focus();
            input.dispatchEvent(new Event('input', { bubbles: true }));
        });
    
        input.addEventListener('input', e=>{
            query= e.target.value.trim().toLowerCase();
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
  
    function setNewUpdatedBadge(element)
    {
        const lastPublished = parseInt(element.dataset.lastPublished);
        const firstPublished = parseInt(element.dataset.firstPublished);

        const badge = element.querySelector('[data-badge]');
        const badgeNeeded = new Date(lastPublished).getTime() + twoWeeks > Date.now();

        if (badgeNeeded) 
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
        }
        else
        {
            badge.hidden = true;
        }

        return badgeNeeded;
    }
 
}, true);