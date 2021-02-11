import '../socket.io/socket.io.js'

const taskTemplate = document.querySelector('#task-template')

// If taskTemplate is not present on the page, just ignore and do not listen for tasks
if (taskTemplate) {
    // Create a Handlebars template from the template-tag (rendered from index.hbs)
    const template = window.Handlebars.compile(taskTemplate.innerHTML)

    // Create a socket connection using Socket.io
    const socket = window.importScripts()

    // Listen for message "new task" from the server
    socket.on('task', arg => {
        const taskString = template(arg)
        const tr = document.createElement('tr')
        tr.innerHTML = taskString
    })
}