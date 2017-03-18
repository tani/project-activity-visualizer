async function getCommitFrequency(url) {
    if(! /github.com\/[^\/]+\/[^\/]+/.test(url)){
        return ["","",0,0,0];
    }
    const user = /github.com\/([^\/]+)/.exec(url)[1];
    const repo = /github.com\/[^\/]+\/([^\/]+)/.exec(url)[1];
    const request = `https://api.github.com/repos/${user}/${repo}/stats/commit_activity`;
    try {
        const response = await fetch(request);
        const stats = await response.json();
        const week = stats[stats.length - 1].total;
        const month = stats.slice(-4).map(s=>s.total).reduce((x,y)=>x+y);
        const year = stats.map(s=>s.total).reduce((x,y)=>x+y);
        return [user, repo, week, month, year];
    } catch(e) {
        return getCommitFrequency(url);
    }
}


function createBadge(user: string, repo, status, color) {
    let li = document.createElement('li');
    li.style.borderColor  = color;
    li.style.boxSizing    = 'border-box';
    li.style.borderWidth  = '1px';
    li.style.borderStyle  = 'solid';
    li.style.padding      = '5px';
    li.style.borderRadius = '3px';

    let a = document.createElement('a');
    a.innerHTML   = status;
    a.style.color = color;
    a.href = `https://github.com/${user}/${repo}/graphs/commit-activity`
    li.appendChild(a)

    return li;
}

function insertBadge(user, repo, status,color) {
    const element = createBadge(user, repo, status, color);
    const container = document.querySelector('.pagehead-actions');
    container.insertBefore(element, container.firstChild);
}

(async () => {
    const [user, repo, week, month, year] = await getCommitFrequency(location.href)
    if(week >= 10){
        insertBadge(user, repo, 'Development','red');
    }else if(month >= 10){
        insertBadge(user, repo, 'Common','#f4b342');
    }else if(year >= 10){
        insertBadge(user, repo, 'Maintenance','green');
    }else{
        insertBadge(user, repo, 'Freeze','blue');
    }
})();
