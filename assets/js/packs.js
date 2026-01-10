window.addEventListener ("load", ()=> {

    const twoWeeks = 14 * 24 * 60 * 60 * 1000;
    const processing = document.getElementById('packsProcessing');
    const toc = document.getElementById('toc');
    const found = document.getElementById('filterCount');
    const input = document.querySelector('#filter');
    const sidebar = document.getElementById('sidebar');
    const sidebarBackdrop = document.getElementById('sidebar-backdrop');
    const menuToggle = document.getElementById('menuToggle');
    const totalSpan = document.getElementById('totalCount');
    const content = document.getElementById('v-pills-content');
    const contentDiv = content.querySelector('[data-content]');
    const infoDiv = content.querySelector('[data-info]'); 
    const title = document.getElementById('categoryTitle');
    const titleCount = document.getElementById('categoryCount');
    const alsoFound = document.getElementById('alsoFound');
    const staticDotNet = document.getElementById('staticDotNet');
    const staticAddYours =  document.getElementById('staticAddYours');
    const staticOnDemand = document.getElementById('staticOnDemand');
    const sortDropdown = document.getElementById('sort');

    let currentCategory = 'All';
    let currentMenuItem = null;
    let isStatic = false;

    const staticContent = { staticDotNet, staticAddYours, staticOnDemand };
    const menuTitleMap = new Map();

    let sortType = 'newest';
    let sortChanged = false;

    let query = input.value;

    toc.hidden = true;

    let menu = new Map();

    const totalSet = new Set();

    transformSearchField();
    collectMenu();
    buildMenu();

    setUpSort();
    setUpSearchField();
    setUpCategoryLinks();
    setUpMenuToggle();

    checkURLParams();
    sortVisible();

    processing.hidden = true;
    toc.hidden = false;

    /////////////////////////////////////////

    function setUpSort()
    {
        sortDropdown.addEventListener('change', (event)=>{
            sortType = event.target.value;
            sortChanged = true;
            sortVisible();
        });

        sortDropdown.value = sortType;
    }

    function sortVisible()
    {
        if (!currentMenuItem)
            currentMenuItem = toc.querySelector('[data-category-menu="All"]');

        // go over direct items
        const elements = Array.from(contentDiv.children).filter(el=>el.tagName === 'ARTICLE');
        sortElements(elements);
        elements.forEach(e=>contentDiv.appendChild(e));

        // go over sections
        const sections = Array.from(contentDiv.getElementsByTagName('section'));
        sections.forEach(s=>{
            const elements = Array.from(s.getElementsByTagName('article'));
            sortElements(elements);
            elements.forEach(e=>s.appendChild(e));
        })
        sections.forEach(s=>contentDiv.appendChild(s));
    }
           
    function checkURLParams()
    {
        const paramsString = window.location.search;
        const hash = window.location.hash;
        const params = new URLSearchParams(paramsString);

        const c = params.get('c')

        let category = menuTitleMap.get(c) || c;

        if (category)
        {
                const button = $(`button[data-category-menu="${category}"]`);
                
                if (hash)
                {
                    button.on('shown.bs.tab', function (event) {
                        location.href=hash;
                    })
                }

                button.tab('show');
        }
        else
        {
            $(`button[data-category-menu="All"]`).tab('show');
        }
    }

    function transformSearchField()
    {
        const packs = Array.from(contentDiv.getElementsByTagName('article'));
        const toExcludeString = ',.;-!?[]"\'';

        packs.forEach(p=>{
            const words = new Set();

            const searchString = p.dataset.search.toLowerCase();
            
            const categories = JSON.parse(p.dataset.categories.toLowerCase());

            categories.forEach(c=>words.add(c));

            searchString.split(" ").filter(c=>!toExcludeString.includes(c)).forEach(s=>words.add(s));
            p.dataset.search = Array.from(words).join(", ");
        })
    }

    function buildMenu()
    {
        //Setup Menu Items
        const menuItems = Array.from(toc.getElementsByTagName('button'));

        const items = {
            category: [],
            dynamic: [],
            static: []
        }

        menuItems.forEach(b=>{

            switch (b.dataset.type)
            {
                case 'static':
                    items.static.push(b);
                    break;
                case 'dynamic':
                    items.dynamic.push(b);
                    break;
                default:    
                    items.category.push(b);
            }
        });

        const totalPacksCount = Array.from(contentDiv.getElementsByTagName('article')).filter(e=>!e.dataset.deprecated).length;

        if (totalSpan)
        {
            totalSpan.getElementsByTagName('span')[0].textContent = totalPacksCount;
            totalSpan.hidden = false;
        }

        showTitleCount();

        for (const button of items.static)
        {
            $(button).on('shown.bs.tab', () => {
                
                window.scrollTo(0, 0);
                isStatic = true;

                sortDropdown.hidden = true;

                if (!sortChanged)
                {
                    sortType = 'title';
                    sortDropdown.value = sortType;
                }

                const sectionTitle = button.dataset.title;
                
                contentDiv.replaceChildren();
                const element = staticContent[button.dataset.categoryMenu];
                
                contentDiv.appendChild(element.cloneNode(true));
                
                title.textContent = sectionTitle;
                titleCount.hidden = true;
                
                updateHistory(sectionTitle);
            })
        }

        for (const button of items.dynamic)
        {
            $(button).on('shown.bs.tab', () => {

                const menuEntry = menu.get(button.dataset.categoryMenu);
                
                if (!menuEntry)
                    return;

                sortDropdown.hidden = false;

                if (!sortChanged)
                {
                    sortType = 'title';
                    sortDropdown.value = sortType;
                }
                
                window.scrollTo(0, 0);
                isStatic = false;

                contentDiv.replaceChildren();
                updateHistory(menuEntry.name);
                currentCategory = menuEntry.name;

                sortElements(menuEntry.elements);

                const totalCount = menuEntry.elements.length;

                if (!totalCount)
                {
                    const countSpan = menuEntry.menuItem.querySelector('[data-count]');
                    menuEntry.menuItem.classList.add('inactive');

                    if (countSpan)
                    {
                        countSpan.hidden = true;
                    }
                }

                menuEntry.elements.forEach(e=>
                {
                    e.hidden = !isVisible(e);
                    contentDiv.appendChild(e.cloneNode(true));
                });
                
                title.textContent = currentCategory;
                titleCount.hidden = false;
                
                setUpCategoryLinks();
                showTitleCount();
                addInfo();
            })
        }

        for (const button of items.category)
        {

            const categoryTitle = button.dataset.categoryMenu;

            const menuEntry = menu.get(categoryTitle);

            if (!menuEntry) continue;

            // Set menu Inactive if there is no elements
            let totalCount = menuEntry.elements.length;
            
            menuEntry.children.forEach(c=>{
                totalCount += c.elements.length;
            });

            if (!totalCount)
            {
                const countSpan = menuEntry.menuItem.querySelector('[data-count]');
                menuEntry.menuItem.classList.add('inactive');

                if (countSpan)
                {
                    countSpan.hidden = true;
                }
            }
        
            //On click, push HTML items into the right panel.
            //jquery - replace it with native addeventlistener, when switching to bootstrap 5.
            $(button).on('shown.bs.tab', () => {

                sortDropdown.hidden = false;

                if (!sortChanged)
                {
                    sortType = categoryTitle == 'All' ? 'newest' : 'title';
                    sortDropdown.value = sortType;
                }

                updateHistory(categoryTitle);

                isStatic = false;
                
                currentCategory = categoryTitle;
                window.scrollTo(0, 0);

                titleCount.hidden = false;
                
                contentDiv.replaceChildren();
                               
                sortElements(menuEntry.elements);

                menuEntry.elements?.forEach(e=>
                {
                    e.hidden = !isVisible(e);
                    contentDiv.appendChild(e.cloneNode(true));
                });

                if (menuEntry.children?.size)
                {
                    const sortedSections = Array.from(menuEntry.children.values()).sort((a, b)=>a.name.localeCompare(b.name));
    
                    sortedSections.forEach(c=>{
                        
                        const section = document.createElement('section');
                        section.id = c.name;
                        
                        const h2 = document.createElement('h2');
                        h2.textContent = c.name;
                        
                        section.classList.add('section');
                        section.appendChild(h2);
                        
                        let count = 0;

                        sortElements(c.elements);

                        c.elements.forEach(e=>{
                            e.hidden = !isVisible(e);
                            section.appendChild(e.cloneNode(true));
                            if (!e.hidden) 
                                {   
                                    count++;
                                }
                        });

                        section.hidden = count == 0;

                        contentDiv.appendChild(section);
    
                    });
                }

                title.textContent = categoryTitle;
                
                setUpCategoryLinks();
                showTitleCount();

                addInfo();
            });
        }

    }

    function updateHistory(category)
    {
        const path = window.location.href.split('?')[0];
        const uri = encodeURI(`${path}?c=${category}`);

        history.replaceState(null, "", uri);
    }

    function sortElements(elements)
    {
        switch (sortType)
        {
            case 'title':
                elements.sort((a, b)=>{
                    const idA = a.dataset.pack.toLowerCase().startsWith("vl.") ? a.dataset.pack.slice(3) : a.dataset.pack;
                    const idB = b.dataset.pack.toLowerCase().startsWith("vl.") ? b.dataset.pack.slice(3) : b.dataset.pack;
                    return idA.localeCompare(idB);
                });
                break;
            case 'newest':
                elements.sort((a,b)=>{
                    const aLast = a.dataset.firstPublished;
                    const bLast = b.dataset.firstPublished;

                    return parseInt(bLast) - parseInt(aLast);
                });
                break;
            case 'updated':
                elements.sort((a,b)=>{
                    const aLast = a.dataset.lastPublished;
                    const bLast = b.dataset.lastPublished;

                    return parseInt(bLast) - parseInt(aLast);
                });
                break;
            case 'download':
                elements.sort((a,b)=>{
                    return parseInt(b.dataset.downloadcount) - parseInt(a.dataset.downloadcount);
                });
                break;
        }
    }

    function collectMenu()
    {
        const content = document.querySelector('[data-category-content]');
        const elements = Array.from(content.getElementsByTagName('article'));
        const menuItems = Array.from(document.querySelectorAll('[data-category-menu]'));

        const items = {
            all: [],
            deprecated: []
        }

        for (const e of elements)
        {
            if (e.dataset.deprecated)
            {
                items.deprecated.push(e);
            }
            else
            {
                items.all.push(e);
            }
        }

        const deprecated = {
            name: "Deprecated",
            elements: items.deprecated,
            children: new Map(),
            menuItem: menuItems.find(m=>m.dataset.categoryMenu == "Deprecated")
        };

        const all = {
            name: "All",
            elements: items.all,
            children: [],
            menuItem: menuItems.find(m=>m.dataset.categoryMenu == "All")
        };

        const toSponsor = {
            name: "Packs to sponsor",
            elements: items.all.filter(e=>e.dataset.sponsor),
            menuItem: menuItems.find(m=>m.dataset.categoryMenu == "toSponsor")
        };

        menu.set("All", all);
        menu.set("Deprecated", deprecated);
        menu.set("toSponsor", toSponsor);

        menuTitleMap.set('Packs to sponsor', 'toSponsor');
        menuTitleMap.set('On Demand', 'staticOnDemand');
        menuTitleMap.set('Add your Pack', 'staticAddYours');
        menuTitleMap.set('.Net Nugets', 'staticDotNet');

        for (const element of items.all)
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

                if (!parent) continue;

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
        const elements = document.querySelectorAll('[data-category-link]');

        [...elements].forEach(e=>{
            e.addEventListener('click', ()=>{
                $(`button[data-category-menu="${e.dataset.categoryLink}"]`).tab('show');
            })
        })
    }

    function closeSidebar() {
        sidebar.classList.remove('active');
        sidebarBackdrop.classList.remove('active');
        document.body.classList.remove('sidebar-open');
    }

    function setUpMenuToggle()
    {
        sidebar.addEventListener('click', closeSidebar);
        sidebarBackdrop.addEventListener('click', closeSidebar);
        
        menuToggle.addEventListener('click', function(){
            sidebar.classList.toggle('active');
            sidebarBackdrop.classList.toggle('active');
            document.body.classList.add('sidebar-open');
        });
    }

    function filterToc(query)
    {
        const set = new Set();
        
        menu.forEach((value, key)=>{

            if (key.toLowerCase().startsWith(query))
            {
                set.clear();

                value.elements.forEach(e=>{
                    set.add(e.dataset.pack);
                    totalSet.add(e.dataset.pack);
                })

                if (value.children && value.children.size)
                {
                    value.children.forEach(c => {
                        c.elements.forEach(e=>{
                            set.add(e.dataset.pack);
                            totalSet.add(e.dataset.pack);
                        })
                    })
                }
            }
            else
            {
                set.clear();

                value.elements.forEach(e=>{
                    if (isVisible(e)) 
                    {
                        set.add(e.dataset.pack);
                        totalSet.add(e.dataset.pack);
                    }
                })

                if (value.children && value.children.size)
                {
                    value.children.forEach(c=>{
                        c.elements.forEach(e=>{
                            if (isVisible(e)) 
                            {
                                set.add(e.dataset.pack);
                                totalSet.add(e.dataset.pack);
                            }
                        })
                    })
                }

            }

            const countSpan = value.menuItem.querySelector('[data-count]');

            if (countSpan)
            {
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
            }
            
        })
    }

    function isVisible(e)
    {
        try{
            if (e.dataset.pack.toLowerCase().includes(query))
                return true;
            
            const words = e.dataset.search.split(', ');

            for (const w of words)
            {
                if (w.startsWith(query))
                    return true;
            }    
            return false;
        }
        catch (error) {
            return false;
        }
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

                if (title.textContent.toLowerCase().startsWith(query))
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

        addInfo();
        showFoundCounter();
    }

    function showTitleCount()
    {
        let total = Array.from(contentDiv.getElementsByTagName('article'));

        if (title.textContent !== 'Deprecated')
        {
            total = total.filter(e=>!e.dataset.deprecated);
        }

        const visible = total.filter((a)=>!a.hidden);
        const count = visible.length != total.length ? `${visible.length} of ${total.length}` : total.length; 

        titleCount.textContent = `(${count})`;
    }

    function showFoundCounter(visible = true)
    {

        if (!visible)
        {
            found.hidden = true;
            return;
        }

        const total = totalSet.size;

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
            
            if (e.dataset.type != 'static')
            {
                e.hidden = false;
                e.querySelector('[data-count]').hidden = true;
                e.classList.remove('inactive');
            }
            
        });

        menu.forEach((value)=>{

            value.elements?.forEach(e=>e.hidden = false);
            if (value.children?.length) 
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
        
        title.textContent = currentCategory;
        titleCount.hidden = false;
        
        totalSet.clear();
        
        if (query == "")
        {
            resetFilter(content, toc);
            addInfo();
            showTitleCount();
            return;
        }
        
        if (isStatic)
        {
            $('button[data-category-menu="All"]').tab('show');
        }
        
        
        filterToc(query);
        filterContent(content, query);
        showFoundCounter();
        showTitleCount();

    }

    function addInfo()
    {
        infoDiv.replaceChildren();

        if (query == '')
            return;
                
        const active = Array.from(menu.values()).filter(m => m.menuItem.querySelector('[data-count]').hidden == false);
        const withoutCurrent = active.filter(a=>a.name!=='All' && a.name!==currentCategory && a.menuItem.dataset.type !== 'dynamic')?.sort((a,b)=>a.name.localeCompare(b.name));
        const count = totalSet.size;

        const packsInCurrent = Array.from(contentDiv.getElementsByTagName('article')).filter(e => !e.hidden);

        if (currentCategory != 'All' && withoutCurrent.length)
        {
            const alsoFoundClone = alsoFound.cloneNode(true);
            infoDiv.appendChild(alsoFoundClone);
            
            const content = alsoFoundClone.getElementsByClassName('emptyContent')[0];
            content.replaceChildren();
                        
            const p = document.createElement("p");
            content.appendChild(p);

            const ul = document.createElement("ul");
            content.appendChild(ul);

            const packs = count > 1 ? "Packs" : "Pack"; 

            const also = packsInCurrent.length ? " also " : "";
            
            p.textContent = `${count} ${packs}${also} found in these categories:`;

            withoutCurrent.forEach(i=>{
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
        else if (!active.length)
        {
            title.textContent = 'Nothing Found';
            titleCount.hidden = true;
            const nothingFoundClone = staticOnDemand.cloneNode(true);
            infoDiv.appendChild(nothingFoundClone);
        }

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

            const keyLow = e.key.toLowerCase();

            if ((e.ctrlKey || e.metaKey) && (keyLow === 'k' || keyLow === 'f')) {
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

            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'f') {
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

    function staticClick(event)
    {
        console.log (event);
    }
 
}, true);