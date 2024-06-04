let courseTable = document.querySelector('#tests');

courseTable.addEventListener('click', (e) => {
    let target = e.target;
    if (target.tagName != 'DIV') {
        return;
    } else if (target.dataset.action == "show") {
      
        let id = target.parentElement.parentElement.getAttribute("testId");
       
        if(!localStorage.hasOwnProperty('currenttestid')){
            localStorage.setItem('currenttestid', id);
        }
        else {
            localStorage.currenttestid = id;
        }
       let a = target.querySelector('a');
       a.href = `/test/${localStorage.currenttestid}`;
        a.click();
        
    } else if (target.dataset.action == "delete") {
        let id = target.parentElement.parentElement.getAttribute("testId")
        if(!localStorage.hasOwnProperty('currenttestid')){
            localStorage.setItem('currenttestid', id);
        }
        else {
            localStorage.currenttestid = id;
        }
        DeleteTest(id);
    }
})