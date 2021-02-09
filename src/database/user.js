const {ObjectID} = require('mongodb')
const {getDatabase} = require('./mongo')

const collectionName = 'users'

async function insertUser(user){
    const database = await getDatabase()
    const {insertedId} = await database.collection(collectionName).insertOne(user)

    return insertedId
}

async function findUser(id){
    const database = await getDatabase()

    return await database.collection(collectionName).findOne(ObjectID(id))
}

module.exports = {
    insertUser,
    findUser
}