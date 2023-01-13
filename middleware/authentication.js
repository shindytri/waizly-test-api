const GLOBAL_VARIABLE = require('../component/globalVariables')
const basicAuth = async (req, res, next) => {

    if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
        return res.status(401).json({ message: 'Missing Authorization Header' });
    }

    const auth = req.headers.authorization
    const base64cred = auth.split(' ')[1]
    const credentials = await Buffer.from(base64cred, 'base64').toString('ascii') // decode authorization
    const [username, password] = credentials.split(':')

    try {
        if (username === GLOBAL_VARIABLE.DEFAULT_CRED.username && password === GLOBAL_VARIABLE.DEFAULT_CRED.password){
            next()  
        } else {
            return res.status(401).send({message : "Please provide correct credential."}) 
        }
    } catch (e) {
	    console.log(e)
        res.status(401).send({message : e.message})
    }
}

module.exports = {basicAuth}