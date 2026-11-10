let selectedTab;
const userAgent = navigator.userAgent.toLowerCase();

if (userAgent.includes('macintosh'))
{
    selectedTab = '#tabs-download-mac'
}
else if (userAgent.includes('arm'))
{
    selectedTab = '#tabs-download-arm'
}
else
{
    selectedTab = '#tabs-download-x64';
}

$(selectedTab).tab('show')

const tip = tippy('.previewButton', {
    content: 'Loading...',
    placement:'right',
    arrow:true,
    trigger:'click',
    animation: 'fade',
    allowHTML: true,
    hideOnClick: true,
    interactive: true,
    maxWidth: 'none',
    duration: [200, 0],
    onCreate(instance) {
        instance._isLoaded = false;
      },

    async onShow(instance) {

        if (instance._isLoaded) {
            return;
        }

        const buildType = instance.reference.dataset.link;
        let buildHtml = '';

        try {
            var response = await getLatestBuild(buildType, "");
            console.log (response);
            buildHtml = `
                <div class="row">
                    <div class="col mx-0 mb-4">
                        ${response}
                    </div>
                </div>`;
            
        }  catch (error) {
            console.error("Failed to fetch previews:", error);
            buildHtml = `
                <div class="row">
                    <div class="col mx-0 mb-4 text-muted">
                        Unable to load previews.
                    </div>
                </div>`;
        }

        const container = document.getElementById('gammaPreviews');
        if (container) {
            container.innerHTML = buildHtml;
        }

        const template = document.getElementById('previewDownloadTemplate');
        if (template) {
            instance.setContent(template.innerHTML);
            instance._isLoaded = true;
            const closeButton = instance.popper.querySelector('.close');
            if (closeButton) {
                closeButton.onclick = () => instance.hide();
            }
        }
      },
  });

function getTeamcity()
{
    var teamcity = "https://teamcity.vvvv.org";
    
    return teamcity;
}

function getBuildsLink(buildType, branch)
{
    if (branch != "")
    {
        _b = branch;
    }
    else
    {
        _b = '%3Cdefault%3E';
    }

    return getTeamcity() + `/guestAuth/app/rest/builds?locator=branch:name:${_b},buildType:${buildType},status:SUCCESS,state:finished&count=4`;
}

async function getLatestBuild(buildType, branch)
{
    var previews = [];

    var previews = await fetchData(getBuildsLink(buildType, branch));

    var div="<table>";

    if (previews.length > 0)
    {
        for (var preview of previews)
        {
            div +=`<tr>  
                <td><a href="${getTeamcity()}${preview.link}" class="btn btn-secondary previewButton" onclick="plausible('downloadPreview')">${preview.buildNumber}</a></td>
                <td class="date">${preview.date}<br><a href="${preview.changesLink}" target="_blank" class="changes">Changes</a></td>
            </tr>`; 
        }
    }
    else
    {
        div += "<p>No builds available.</p>";
    }

    div+="</table>";

    return div;
}

async function fetchData(link)
{
    const versionPattern = /\d{4}\.(.*?)\+/;

    const doc = await fetchXML(link);
    const builds = Array.from(doc.getElementsByTagName("build"));

    const previewPromises = builds.map(async (build) => {
        const buildNumber = build.getAttribute("number");
        const id = build.getAttribute ("id");
        const href = build.getAttribute ("href");

        if (!href) return null;

        try {
            const details = await fetchXML(`${getTeamcity()}${href}/artifacts/children`);

            // Skip if no files exist (<files count="0"/>)
            const files = details.querySelector('files');
            const fileCount = files?.getAttribute('count') ?? '0';

            if (fileCount === '0') {
                return null;
            }
            
            const file = details.querySelector('file content[href$=".exe"]');
            const modTimeEl = details.querySelector('file[modificationTime]');
            const stamp = modTimeEl ? modTimeEl.getAttribute('modificationTime') : null;
            if (file) {
                const exeLink = file.getAttribute('href');
                if (exeLink) {
                    const match = buildNumber ? buildNumber.match(versionPattern) : null;
                    const shortNumber = match ? match[1] : buildNumber;
                    const changes = `${getTeamcity()}/viewLog.html?buildId=${id}&tab=buildChangesDiv&user=guest`;
                    return {
                        link: exeLink,
                        buildNumber: shortNumber,
                        changesLink: changes,
                        date: stamp ? getDate(stamp) : ''
                    };
                }
            }
        } catch (err) {
            console.warn(`Failed to fetch artifacts for build ${buildNumber}:`, err);
        }

        return null;
    });

    const results = await Promise.all(previewPromises);
    return results.filter(Boolean);
}

async function fetchXML(url)
{
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP ${response.status} fetching ${url}`);
    }
    const text = await response.text();
    return new window.DOMParser().parseFromString(text, "text/xml");
}

function getDate(stamp)
{
    var yyyy = stamp.substring(0,4);
    var mm = stamp.substring(4,6);
    var dd = stamp.substring(6,8);
    var H = stamp.substring(9,11);
    var M = stamp.substring(11,13);
                
    return `${dd}.${mm}.${yyyy} ${H}:${M}`;
}


