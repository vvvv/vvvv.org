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
    const toSponsor = document.getElementById('toSponsor');
    const sortDiv = document.getElementById('sortDiv'); 
    const sortDropdown = document.getElementById('sort');
    const menuItemButton = document.getElementById('staticContent').querySelector('[data-category-menu]');

    let currentCategory = 'All';
    let currentMenuItem = null;
    let isStatic = false;

    const staticContent = { staticDotNet, staticAddYours, staticOnDemand };
    const menuTitleMap = new Map();

    let sortType = 'newest';
    let selectedMenuType = 'categories';
    let sortChanged = false;

    let query = input.value;

    toc.hidden = true;

    let menu = new Map();
    let owners = new Map();
    let fixed = new Map();

    let escCount = 0;

    const totalSet = new Set();

    const items = {
        all: [],
        deprecated: []
    }

    setTotalPacksCount();
    
    transformSearchField();
    collectOwners();
    collectMenu();
    collectFixed();
    buildMenu();

    setUpSort();
    setUpSearchField();
    setUpCategoryLinks();
    setUpMenuSwitch();
    setUpMenuToggle();

    checkURLParams();
    sortVisible();

    processing.hidden = true;
    toc.hidden = false;

    /////////////////////////////////////////

    function setTotalPacksCount()
    {
        const totalPacksCount = Array.from(contentDiv.getElementsByTagName('article')).filter(e=>!e.dataset.deprecated).length;

        if (totalSpan)
        {
            totalSpan.getElementsByTagName('span')[0].textContent = totalPacksCount;
            totalSpan.hidden = false;
        }

    }

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

        const c = params.get('c');

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

    function getCurrentMenu()
    {
        switch (selectedMenuType)
        {
            case 'categories':
                return menu;
            case 'owners':
                return owners;
        }
    }

    function getMenuEntry(name)
    {
        return getCurrentMenu().get(name);
    }

    function categoryButton(button)
    {
        let categoryTitle = button.dataset.categoryMenu;
        let menuEntry = getMenuEntry(categoryTitle);
                   
        if (!menuEntry) 
           return;
        
        const countSpan = menuEntry.menuItem.querySelector('[data-count]');
        
        if (!query)
            countSpan.hidden = true;
        
        // Set menu Inactive if there is no elements
        let totalCount = menuEntry.elements.length;
        
        menuEntry.children?.forEach(c=>{
            totalCount += c.elements.length;
        });

        if (!totalCount)
        {    
            menuEntry.menuItem.classList.add('inactive');

            if (countSpan)
            {
                countSpan.hidden = true;
            }
        }
    
        //On click, push HTML items into the right panel.
        //jquery - replace it with native addeventlistener, when switching to bootstrap 5.
        $(button).on('shown.bs.tab', () => {

            sortDiv.hidden = false;
            escCount = 0;

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

    function staticButton(button)
    {

        $(button).on('shown.bs.tab', () => {
            
            window.scrollTo(0, 0);
            isStatic = true;
            escCount = 0;

            sortDiv.hidden = true;

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
            infoDiv.replaceChildren();
        })
    }

    function dynamicButton(button)
    {

        $(button).on('shown.bs.tab', () => {

            console.log (button.dataset.categoryMenu)
            
            escCount = 0;
            const category = button.dataset.categoryMenu;

            const menuEntry = fixed.get(category);
            
            if (!menuEntry)
                return;

            sortDiv.hidden = false;

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

    function buildMenu()
    {
        toc.replaceChildren();

        let items = [];

        switch (selectedMenuType)
        {
            case 'categories':
                items = Array.from(menu.values()).sort((a,b) => a.index-b.index);
                break;
            case 'owners':
                items = Array.from(owners.values()).sort((a,b) => a.name.localeCompare(b.name));
                break;
        }

        for (m of items)
        {
            switch (m.menuItem.dataset.type)
            {
                case 'static':
                    staticButton(m.menuItem);
                    break;
                case 'dynamic':
                    dynamicButton(m.menuItem);
                    break;
                default:    
                    categoryButton(m.menuItem);
            }

            toc.appendChild(m.menuItem);
            
        }

        const fixedItems = Array.from(fixed.values()).sort((a,b) => a.index-b.index);

        for (m of fixedItems)
        {
            switch (m.menuItem.dataset.type)
            {
                case 'static':
                    staticButton(m.menuItem);
                    break;
                case 'dynamic':
                    dynamicButton(m.menuItem);
                    break;
                default:    
                    categoryButton(m.menuItem);
            }

            toc.appendChild(m.menuItem);
        }

        showTitleCount();

        const itemToHighlight = items.find(i=>{

            if (i.elements?.some(e=>e.hidden != true))
            {
                return true;
            }

            i.children?.forEach(c=>{
                if (c.elements?.some(e=>e.hidden !== true))
                {
                    return true;
                }
            })

            return false;
        });

        const menuToSelect = itemToHighlight ? itemToHighlight.name : items[0].name;
        
        // Inject Separators     
        const lastItem = items[items.length-1].name;
        injectSeparators(["Extensions", lastItem]);

        toc.querySelector(`button[data-category-menu="${menuToSelect}"]`)?.classList.remove('active');
        $(`button[data-category-menu="${menuToSelect}"]`).tab('show');

    }

    function injectSeparators(elements)
    {
        for (const e of elements)
        {
            const element = toc.querySelector(`[data-category-menu="${e}"]`);
            if (element)
            {
                const div = document.createElement('div');
                div.classList.add('border-bottom', 'my-2');
                element.after(div);
            }
        }
    }

    function updateHistory(category)
    {
        const path = window.location.href.split('?')[0];
        
        const types = {
            categories: "c",
            owners: "o"
        }

        const type = types[selectedMenuType];
        
        const uri = encodeURI(`${path}?${type}=${category}`);

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

    function collectOwners()
    {
        const content = document.querySelector('[data-category-content]');
        const elements = Array.from(content.getElementsByTagName('article'));

        let index = 0;

        for (const e of elements)
        {
            if (e.dataset.deprecated)
                continue;

            const ownersTags = e.getElementsByClassName('owners')[0].getElementsByTagName('a');
            const ownerNames = Array.from(ownersTags).map(o=>o.textContent);

            ownerNames.forEach(o=>{
                
                index++;

                let stripped = o.replace(/,\s*$/, "");
                const owner = owners.get(stripped);
                if (owner)
                {
                    owner.elements.push(e);
                }
                else
                {
                    const menuItem = menuItemButton.cloneNode(true);
                    
                    menuItem.dataset.categoryMenu = stripped;
                    menuItem.prepend(stripped);

                    owners.set(stripped, {
                        name: stripped,
                        index: index,
                        elements: [e],
                        menuItem: menuItem
                    })
                }
            })
        }

    }

    function collectMenu()
    {
        const content = document.querySelector('[data-category-content]');
        const elements = Array.from(content.getElementsByTagName('article'));
        const menuItems = Array.from(document.querySelectorAll('[data-category-menu]'));

        //Inject Packs To Sponsor
        const featured = menuItems.find(m=>m.dataset.categoryMenu=='Featured');
        featured.after(toSponsor);
        menuItems.splice(menuItems.indexOf(featured)+1, 0, toSponsor);
                
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

        let index = 0;

        const all = {
            name: "All",
            index: index,
            elements: items.all,
            children: [],
            menuItem: menuItems.find(m=>m.dataset.categoryMenu == "All")
        };

        const packsToSponsor = {
            name: "toSponsor",
            index: menuItems.findIndex(m=>m.dataset.categoryMenu == 'Featured')+1,
            elements: items.all.filter(e=>e.dataset.sponsor),
            children: [],
            menuItem: toSponsor
        };

        menuTitleMap.set('Packs to sponsor &#9829;', 'toSponsor');

        const unsortedTitle = 'Unsorted';

        for (const element of items.all)
        {
            let paths;
            
            index++;
                
            try {
                paths = JSON.parse(element.dataset.categories);
            }
            catch{
                continue;
            }
                
            if (!paths.length)
            {
               const item = menu.get(unsortedTitle);

                if (item)
                {
                    item.elements.push(element);
                }
                else{
                    menu.set(unsortedTitle,{
                        name: unsortedTitle,
                        index: menuItems.findIndex(m=>m.name == unsortedTitle),
                        elements: [element],
                        children: new Map(),
                        menuItem: menuItems.find(m=>m.dataset.categoryMenu == unsortedTitle)
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
                        index: menuItems.findIndex(m=>m.dataset.categoryMenu == parent),
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

        menu.get('Unsorted').index = menu.size+1;

        const deprecated = {
            name: "Deprecated",
            index: menu.size,
            elements: items.deprecated,
            children: new Map(),
            menuItem: menuItems.find(m=>m.dataset.categoryMenu == "Deprecated")
        };

        menu.set("All", all);
        menu.set("Packs to Sponsor", packsToSponsor);
        menu.set("Deprecated", deprecated);

        return menu;
    }

    function collectFixed()
    {
        const menuItems = Array.from(document.querySelectorAll('[data-category-menu]'));

        let index = 0;

        const staticDotNet = {
            name: ".Net Nugets",
            index: index++,
            menuItem: menuItems.find(m=>m.dataset.categoryMenu == "staticDotNet")
        };

        const addYours = {
            name: "Add your Pack",
            index: index++,
            menuItem: menuItems.find(m=>m.dataset.categoryMenu == "staticAddYours")
        };

        const staticOnDemand = {
            name: "On Demand",
            index: index++,
            menuItem: menuItems.find(m=>m.dataset.categoryMenu == "staticOnDemand")
        };

        fixed.set("addYours", addYours);
        fixed.set("staticDotNet", staticDotNet);
        fixed.set("staticOnDemand", staticOnDemand);

        menuTitleMap.set('On Demand', 'staticOnDemand');
        menuTitleMap.set('Add your Pack', 'staticAddYours');
        menuTitleMap.set('.Net Nugets', 'staticDotNet');
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

    function setUpMenuSwitch()
    {
        const menuSwitch = document.getElementById('menuSwitch');
        const buttons = Array.from(menuSwitch.getElementsByTagName('button'));

        buttons.forEach(b=>{         
            b.addEventListener('click', function(){  
                
                const type = b.dataset.type;

                if (selectedMenuType !== type)
                {
                    buttons.forEach(b=>b.classList.remove('selected'));
                    b.classList.add('selected');
                    selectedMenuType = type;
                    
                    filterToc();
                    filterContent();

                    buildMenu();
                    
                    if (query)
                    {
                        showFoundCounter();
                    }
                    showTitleCount();
                }
            });
        })
    }

    function setUpMenuToggle()
    {        
        menuToggle.addEventListener('click', function(){
            sidebar.classList.toggle('active');
            sidebarBackdrop.classList.toggle('active');
            document.body.classList.add('sidebar-open');
        });

        const elementsToClose = [toc, menuClose, sidebarBackdrop];

        elementsToClose.forEach(e=>{
            e.addEventListener('click', closeSidebar);
        })
    }

    function filterToc()
    {
        const set = new Set();

        const menu = getCurrentMenu();
        
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

                    e.hidden = !isVisible(e);

                    if (!e.hidden) 
                    {
                        set.add(e.dataset.pack);
                        totalSet.add(e.dataset.pack);
                    }
                })

                if (value.children && value.children.size)
                {
                    value.children.forEach(c=>{
                        c.elements.forEach(e=>{

                            e.hidden = !isVisible(e);

                            if (!e.hidden) 
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

    function filterContent()
    {
        let totalCount = 0;

        Array.from(contentDiv.children).forEach (e=>{
            
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

        if (total && query)
        {
            found.getElementsByTagName('span')[0].textContent = total;
            found.hidden = false;
        }
        else{
            found.hidden = true;
        }

    }

    function resetFilter()
    {
        contentDiv.querySelectorAll('[hidden]').forEach(e=>e.hidden = false);
        toc.querySelectorAll('[data-category-menu]').forEach(e=>{
            
            if (e.dataset.type != 'static')
            {
                e.hidden = false;
                e.querySelector('[data-count]').hidden = true;
                e.classList.remove('inactive');
            }
            
        });

        const menu = getCurrentMenu();

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

    function filterItems()
    {     
        title.textContent = currentCategory;
        titleCount.hidden = false;
        
        totalSet.clear();
        
        if (query == "")
        {
            resetFilter();
            addInfo();
            showTitleCount();
            return;
        }
        
        if (isStatic)
        {
            $('button[data-category-menu="All"]').tab('show');
        }
        
        filterToc();
        filterContent();
        showFoundCounter();
        showTitleCount();

    }

    function addInfo()
    {
        infoDiv.replaceChildren();

        if (query == '' || isStatic)
        {
            return;
        }

        const menu = getCurrentMenu();
                
        const active = Array.from(menu.values()).filter(m => m.menuItem.querySelector('[data-count]').hidden == false);
        const withoutCurrent = active.filter(a=>a.name!=='All' && a.name!==currentCategory && a.menuItem.dataset.type !== 'dynamic')?.sort((a,b)=>a.name.localeCompare(b.name));

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

            const foundPacks = new Set();

            withoutCurrent.forEach(i=>{

                let count = 0;

                const li = document.createElement("li");
                const a = document.createElement("a");
                
                i.elements.filter(e=>!e.hidden).forEach(e=>{
                    foundPacks.add(e.dataset.pack);
                    count++;
                });
                
                i.children?.forEach(c=>{
                    c.elements.filter(e=>!e.hidden).forEach(e=>{
                        foundPacks.add(e.dataset.pack);
                        count++;
                    });
                })

                a.textContent = `${i.name} (${count})`;
                a.href = `#`;
                a.dataset.target = i.name;
                a.addEventListener('click', ()=>{
                    $(`button[data-category-menu="${i.name}"]`).tab('show');
                });

                li.appendChild(a);
                ul.appendChild(li);

            });

            const packs = foundPacks.size > 1 ? "Some Packs are" : "A Pack is"; 
            const also = packsInCurrent.length ? " also " : "";
            const categories = withoutCurrent.length > 1 ? "in these categories" : "in this category";
            const owners = withoutCurrent.length > 1 ? "by these owners" : "by this owner";
            const where = selectedMenuType == 'categories' ? categories : owners;           
            p.textContent = `${packs}${also} found ${where}:`;

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
            if (isStatic)
            {
                $(`button[data-category-menu="All"]`).tab('show');
            }
            input.value = '';
            input.focus();
            input.dispatchEvent(new Event('input', { bubbles: true }));
        });
    
        input.addEventListener('input', e=>{
            query = e.target.value.trim().toLowerCase();
            filterItems();
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
                if (!escCount)
                {
                    escCount++;
                    if (isStatic)
                    {
                        $(`button[data-category-menu="All"]`).tab('show');
                    }
                    input.value = '';
                    input.focus();
                    input.dispatchEvent(new Event('input', { bubbles: true }));                       
                }
                else {                 
                    escCount = 0;
                    $(`button[data-category-menu="All"]`).tab('show');
                    input.dispatchEvent(new Event('input', { bubbles: true }));
                }
            }
            else
            {
                escCount = 0;
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