export default async function getCommitFrequency(url: string): Promise<any[]> {
    if(! /github.com\/[^\/]+\/[^\/]+/.test(url)){
        return ["","",0,0,0];
    }
    const user:    string = /github.com\/([^\/]+)/.exec(url)[1];
    const repo:    string = /github.com\/[^\/]+\/([^\/]+)/.exec(url)[1];
    const request: string = `https://api.github.com/repos/${user}/${repo}/stats/commit_activity`;
    try {
        const response = await fetch(request);
        const stats: {total: number}[] = await response.json();
        const week:  number  = stats[stats.length - 1].total;
        const month: number  = stats.slice(-4).map(s=>s.total).reduce((x,y)=>x+y);
        const year:  number  = stats.map(s=>s.total).reduce((x,y)=>x+y);
        return [user, repo, week, month, year];
    } catch(e) {
        return getCommitFrequency(url);
    }
}
