const socket = io()


const $form = document.querySelector('#message-form')
const $input = $form.querySelector('input')
const $button = $form.querySelector('button')
const $messages = document.querySelector('#messages')
const $messageTemplate = document.querySelector('#message-template').innerHTML
const $location = document.querySelector('#location')
const $locationTemplate = document.querySelector('#location-template').innerHTML

//options
// returns query string as object
const {username,room} =Qs.parse(location.search, { ignoreQueryPrefix:true}) 


socket.emit('join', {username,room}, (error)=> {
if (error) {
    alert(error)
    location.href = '/'
}
})   

$location.addEventListener('click', () => {
    if (!navigator.geolocation) {
        console.log('Browser not supports Gelo  location')
    } else {
        navigator.geolocation.getCurrentPosition((position) => {
            socket.emit('sendLocation',
                {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                }
            )
        })
    }
})
socket.on('message', (inputmessage) => {
    // Render the template with the message data
    const html = Mustache.render($messageTemplate, {
        username: inputmessage.username,
        time: moment(inputmessage.createdAt).format('h:mm a'),
        message: inputmessage.message,
        // object properties should be same order of template
    })

    // Insert the template into the DOM
    $messages.insertAdjacentHTML('beforeend', html)
})


socket.on('location-message', (inputData) => {
    // Render the template with the message data
    const html = Mustache.render($locationTemplate, {
        username: inputmessage.username,
        time: moment(inputData.createdAt).format('h:mm a'),
        url: inputData.url
    })
    // Insert the template into the DOM
    $messages.insertAdjacentHTML('beforeend', html)
})
$form.addEventListener('submit', (e) => {
    e.preventDefault()
   
    const message = e.target.elements.message.value
    if (message.length>0) {
        $button.setAttribute('disabled', 'disabled')
    socket.emit('sendMessage',message, (error) => {
        $button.removeAttribute('disabled')
        $input.value = ''
        $input.focus()
        if (error) {
            console.log(error)
        }
    })

    }

   
})