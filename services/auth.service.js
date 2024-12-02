import {sequelize} from '../libs/sequelize.js'

async function signup(username, password){
    const user = await sequelize.models.user.create({
        username,
        password
    })
    return user
}

export {
    signup
}