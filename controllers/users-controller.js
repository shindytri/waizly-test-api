const User = require('../models/User')
const bcrypt = require("bcryptjs")
const validateRegisterInput = require('../validation/register')
const {errorMessageNotFound, errorMessageBadCastId, errorMessage,errorMessageUnprocessable} = require('../component/errorMessage')

const registerUser = async (req,res) => {
    const {errors, isValid} = validateRegisterInput(req.body)

    if(!isValid){
        return res.status(400).json(errors)
    }

    User.findOne({email:req.body.email})
        .then(user => {
            if(user){
                return res.status(400).json({'email':'Email already used'})
            } else {
                const newUser = new User({
                    username : req.body.username,
                    email:req.body.email,
                    password:req.body.password,
                    deleted:0
                })
                newUser.save()
                return res.json(newUser)
            }
        })
}

const getDataUser = async (req,res) => {
    try {
        const users = await User.find({deleted:0})
        res.send(users)
    } catch (e) {
        let error = errorMessage(500)

        const errorMsg = {
            "error" : error
        }
        res.status(error.code).send(errorMsg)
    }
}

const getDataUserbyId = async (req,res) => {
    const id = req.params.id
    try {
        var query = {_id:id, deleted:0}
        const user = await User.findOne({query})
        if (!user) {
            const message = {
                "message":"User not found"
            }
            return res.status(404).send(message)
        }
        console.log(user)
        res.send(user)
    } catch (e) {
        let error = errorMessage(500)

        const errorMsg = {
            "error" : error
        }
        res.status(error.code).send(errorMsg)
    }
}

const editUser = async (req,res) => {
    const id = req.params.id
    const bodyData = req.body

    if (!bodyData) {
        return res.status(422).send({error: "'data' is required."})
    }
    
    try {
        var query = {_id:id}
        const user_data = await User.findOne(query)

        if (!user_data){
            const error = errorMessageNotFound(id)

            const errorMsg = {
                "error" : error
            }

            return res.status(error.code).send(errorMsg)
        }
        const userCreation = await User.updateOne(query, {$set :bodyData})

        const msg = {
            "message" : `Successfully update data ${id}`,
            "data" : bodyData
        }

        res.status(200).send(msg)
    } catch (e) {
        var errorMsg = {}
        var code = 500
        if (e.name === 'CastError') {
            const error= errorMessageBadCastId(e.value)

            code = error.code

            errorMsg = {
                "error" : error
            }
        } else {
            errorMsg = {
                "error" : errorMessage(code)
            }
        }

        res.status(code).send({error: e.message})
    }
}

const deleteUser = async (req,res) =>{
    const id = req.params.id
    try {
        const user = await User.findOne({_id:id})
        user['deleted'] = 1 // set delete as softdelete
        await user.save()
        res.status(200).send(user)
    } catch (e){
        const error = errorMessageUnprocessable(e)

        const errorMsg = {
            "error" :error
        }

        res.status(error.code).send(errorMsg)
    }
}

module.exports = {
    registerUser: registerUser,
    getDataUser: getDataUser,
    getDataUserbyId: getDataUserbyId,
    editUser: editUser,
    deleteUser:deleteUser
}