function badge(user: string, repo: string, status:string, color:string): HTMLElement {
    let li: HTMLElement   = document.createElement('li');
    li.style.borderColor  = color;
    li.style.boxSizing    = 'border-box';
    li.style.borderWidth  = '1px';
    li.style.borderStyle  = 'solid';
    li.style.padding      = '5px';
    li.style.borderRadius = '3px';

    let a: HTMLAnchorElement = document.createElement('a');
    a.innerHTML   = status;
    a.style.color = color;
    a.href = `https://github.com/${user}/${repo}/graphs/commit-activity`
    li.appendChild(a)

    return li;
}

export default function insertBadge(user: string, repo: string, status:string,color:string): void {
    const element: HTMLElement = badge(user, repo, status, color);
    const container: Element = document.querySelector('.pagehead-actions');
    container.insertBefore(element, container.firstChild);
}
