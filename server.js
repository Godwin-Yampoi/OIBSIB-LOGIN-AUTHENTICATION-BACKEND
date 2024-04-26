const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const cors = require('cors')
const validator = require('validator')

const app = express()
const PORT = process.env.PORT || 3001

//Middleware
app.use(bodyParser.json())
app.use(cors())


//connecting to mongoDb
mongoose.connect('mongodb+srv://Godwin:wq4za3fhCRyEEQ20@clustergodwin.hi4yvkw.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDb connection error:'))


//user Schema

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required:true,
        unique:true

    },

    email: {
        type: String,
        required:true,
        unique:true
        
    },

    password: {
        type: String,
        required:true,
        
    }

})

userSchema.pre('save',  async function (next) {
    const user = this

    if(!user.isModified('password'))
    return next()

    try {
        const hash = await bcrypt.hash(user.password,10)
        console.log('hashed password:', hash)
        user.password = hash
        next()
    }catch(error) {
        return next(error)
    }
})

const User = mongoose.model('user', userSchema)


app.post('/register', async(req,res) => {
    try{
        const {username,email,password} = req.body
        if(!validator.isEmail(email))
        return res.status(400).json({message: 'Invalid email format!'})

        const existingUser = await User.findOne({ $or: [{username}, {email}]})
            if(existingUser) {
            return res.status(400).json({message: 'User already exists!'})
            }

    const user = new User ({username,email,password})
    await user.save()
    res.status(201).json({message: 'User registered successfully'})
} catch (error) {
    console.log(error)
    res.status(500).json({message: 'Error registering user'})

}

})

//login
app.post('/login', async(req,res) => {
    try{
        const {email,password} = req.body

        const user = await User.findOne({email})
        if(!user) {
            return res.status(401).json({message: 'Invalid email or password'})
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) {
            return res.status(401).json({message: 'Invalid email or password'})
        }
        res.status(200).json({message: 'login succesfully'})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Error logging in, please try again!'})
    }
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})