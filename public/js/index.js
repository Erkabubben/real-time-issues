import '../socket.io/socket.io.js'

const taskTemplate = document.querySelector('#task-template')

const baseURL = document.querySelector('base').getAttribute('href')

// If taskTemplate is not present on the page, just ignore and do not listen for tasks
if (taskTemplate) {
    // Create a Handlebars template from the template-tag (rendered from index.hbs)
    const hbsTemplate = window.Handlebars.compile(taskTemplate.innerHTML)

    // Create a socket connection using Socket.io
    const socket = window.io({path: `${baseURL}socket.io`})

    // Listen for message "new task" from the server
    socket.on('task', arg => {
        const taskString = hbsTemplate(arg)
        const div = document.createElement('div')
        div.classList.add('codesnippet')
        tr.innerHTML = taskString

        const taskList = document.querySelector('#task-list')
        taskList.appendChild(div)
    })
}
