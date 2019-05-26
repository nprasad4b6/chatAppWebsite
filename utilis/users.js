const users = []
const addUser = ({ id, username, room }) => {
    username = username.trim().toLowerCase()
    room = room.trim().toLowerCase()
    if (!username || !room) {
        return {
            error: 'Please provide username and room'
        }
    }

    const existingUser = users.find((user) => {
        return user.username === username && user.room === room
    })
    if (existingUser) {
        return {
            error: "same user is already there "
        }
    }
    const user = {
        id, username, room
    }
    users.push(user)
    return { user }
}

const removeUser = (id) => {
    const index = users.findIndex((user) => {
        return user.id === id
    })
    if (index !== -1) {
        const user = users.splice(index, 1)[0]
        return user
    }
}

const getUser = (id) => {
    return users.find((user) => user.id === id)
}

const getUsersInRoom = (room) => {
    return users.filter((user) => user.room === room)
}

// addUser({
//     id:'1',
//     username:'prasad',
//     room:'room1'
// })

// addUser({
//     id:'2',
//     username:'vamsi',
//     room:'room1'
// })

// console.log(users)
// const user =getUser('1')

// console.log('user',user)

module.exports = {
    addUser,
    removeUser,
    getUser,
    getUsersInRoom
}