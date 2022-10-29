const router = require('express').Router();
const User = require('../models/Usermodel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

router.post('/', async (req,res)=>{
    try {
        const {email,password} = req.body

        //validation
        if(!email || !password ){
            return res.status(400).json({
                errorMessage: 'Please enter all require fields'
            })
        }

        const user = await User.findOne({email});
        
        if(user){
            return res.status(400).json({
                errorMessage:'User already exists'
            })
        }

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password,salt);

        //save new user
        const newUser = new User({
            email,
            passwordHash
        })

        const savedUser = await newUser.save();

        //login the user once created ??sign the token
        const token = jwt.sign({
            user: savedUser._id
        },process.env.JWT_SECRET)
        //send the token in cookie
        res.cookie('token',token,{
            httpOnly:true,
        }).send();
      
        
    } catch (error) {
        console.log(error);
        res.status(500).send();
    }
})

router.post('/login', async (req,res)=>{

    try {
        const {email,password} = req.body;

        if(!email || !password){
            return res.status(400).json({
                errorMessage:'Please enter all fields'
            })
        }
    
        const existUser = await User.findOne({email});
    
        if(!existUser){
            res.status(401).json({
                errorMessage:'User doesnt exist'
            })
        }

        const passwordCorrect = await bcrypt.compare(password,existUser.passwordHash);
        if(!passwordCorrect){
            return res.status(401).json({errorMessage:'wrong password'})
        }
    
        const token = jwt.sign({
            user: existUser._id
        },process.env.JWT_SECRET);

        res.cookie('token',token,{
            httpOnly:true
        }).send();
      
    } catch (error) {
        console.log(error);
        res.status(400).send();
    }
})


router.get('/logout',(req,res)=>{
    res.cookie('token','',{
        httpOnly:true,
        expires: new Date(0)
    }).send();

})

router.get('/loggedIn',(req,res)=>{
    try {
        const token = req.cookies.token;
        if(!token){
            return res.json(false);
        }

        jwt.verify(token,process.env.JWT_SECRET);
        res.send(true);

    } catch (error) {
        res.json(false);
    }
});

router.get('/refresh',(req,res)=>{
    const token = req.cookies.token
  // console.log('basic: ' + token)
    
    //res.send(token);
    
    jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
        if(err){
            console.log(err)
            return res.json({message:'auth failed'})
        }
        //console.log(verified.user)
    /*res.cookie('token','',{
        httpOnly:true,
        expires: new Date(0)
    }).send();*/
    res.clearCookie(`${user}`)
    req.cookies[`${user.id}`] = '';
    const refreshToken = jwt.sign({id:user.id},process.env.JWT_SECRET,{
        expiresIn:'1d'
    });
    console.log('refresh tam ya kbeer')
    
    res.cookie('token',refreshToken,{
        httpOnly:true,
    }).send();
   
    })
    
    

})


module.exports = router;