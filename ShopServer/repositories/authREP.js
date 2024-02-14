const js = require('jsonfile');


const readUsers = () => {
   return js.readFile('../configs/users.json')
}

const writeUsers = (data) => {
   return js.writeFile('../configs/users.json', data)
}


module.exports = {
    readUsers,
    writeUsers
}