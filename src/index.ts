import check from './checker'
import insertBadge from './badge'

(async () => {
    const [user, repo, week, month, year] = await check(location.href)
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
