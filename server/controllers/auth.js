const users = []
const bcrypt = require('bcryptjs')

module.exports = {
  login: (req, res) => {
    const { username, password } = req.body

    for (let i = 0; i < users.length; i++){
      if (users[i].username === username) {
        const validPassword = bcrypt.compareSync(password, users[i].passwordHash)
        if (validPassword) {
          let userToReturn = {...users[i]}
          delete userToReturn.passwordHash
          res.status(200).send(userToReturn)
        } 
      }
    }
    res.status(400).send("User not found.")
  },
  register: (req, res) => {
    const {username, email, firstName, lastName, password} = req.body
    const salt = bcrypt.genSaltSync(10)
    const passwordHash = bcrypt.hashSync(password, salt)
    let user = {
      username,
      email,
      firstName,
      lastName,
      passwordHash
    }
    users.push(user)
    let userToReturn = {...user}
    delete userToReturn.passwordHash
    res.status(200).send(userToReturn)
  }
}