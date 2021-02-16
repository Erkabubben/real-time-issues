import '../socket.io/socket.io.js'

const issueTemplate = document.querySelector('#issue-template')

const baseURL = document.querySelector('base').getAttribute('href')

// If issueTemplate is not present on the page, just ignore and do not listen for issues
if (issueTemplate) {
    // Create a Handlebars template from the template-tag (rendered from index.hbs)
    const hbsTemplate = window.Handlebars.compile(issueTemplate.innerHTML)

    // Create a socket connection using Socket.io
    const socket = window.io({path: `${baseURL}socket.io`})

    // Listen for message "new issue" from the server
    socket.on('new-issue', arg => {
        const issueString = hbsTemplate(arg)
        const div = document.createElement('div')
        div.classList.add('issue')
        div.id = 'issueid_' + arg.issueid
        div.innerHTML = issueString

        const issueList = document.querySelector('#issue-list')
        issueList.appendChild(div)
    })
    
    socket.on('update-issue', arg => {
        const issueString = hbsTemplate(arg)
        const newIssue = document.createElement('div')
        newIssue.classList.add('issue')
        newIssue.id = 'issueid_' + arg.issueid
        newIssue.innerHTML = issueString
        //console.log('update-issue')
        //console.log(arg.issueid)
        const issueList = document.querySelector('#issue-list')
        const oldIssue = issueList.querySelector('div#issueid_' + arg.issueid)
        issueList.replaceChild(newIssue, oldIssue)
    })
}
