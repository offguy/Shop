const js = require('jsonfile');


const readUsers = async () => {
   const users = await js.readFile('./configs/users.json')
   console.log(users)
   return users
}

const writeUsers = async (data) => {
   const users = await js.readFile('./configs/users.json')
   await js.writeFile('./configs/users.json', data)

}


module.exports = {
    readUsers,
    writeUsers
}