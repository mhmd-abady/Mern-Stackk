const router = require('express').Router();
const auth = require('../middleware/auth');
const Customer = require('../models/customerModel');


router.post('/',auth,async(req,res)=>{

    try {
        const {name,address,phoneNumber} = req.body;
        
        if( !name || !address || !phoneNumber){
            return res.status(400).json({
                errorMessage:'please enter all fields'
            })
        }

        const exist = await Customer.findOne({name});
        if(exist){ 
            if(exist.address===address && exist.phoneNumber===phoneNumber){
            return res.status(400).json({
                errorMessage:'customer is already there'
            })
        }}else{
            const newCustomer = new Customer({
                name,
                address,
                phoneNumber
            });
    
            const savedCustomer = await newCustomer.save();
    
            res.json(savedCustomer);
        }
    
    } catch (error) {
        console.log(error);
        res.status(400).send();
    }
});

router.get('/',auth, async(req,res)=>{
    try {
        const allCustomers = await Customer.find();
        res.json(allCustomers);
    } catch (error) {
        console.log(error);
        res.status(500).send();
    }
})

router.delete('/:id',auth,async(req,res)=>{
     Customer.findByIdAndDelete(req.params.id)
    .then(()=>res.json('cutomer deleted'))
    .catch(err=>res.json('err: '+err));
})

router.post('/update/:id',auth,async(req,res)=>{
    await Customer.findById(req.params.id).then(cust=>{
        cust.name = req.body.name,
        cust.address= req.body.address,
        cust.phoneNumber = req.body.phoneNumber

        cust.save().then(()=>res.json('customer updated')).catch(err=>res.json('err: '+err))
    }).catch(err => res.json('err: '+err))
})

router.get('/:id',auth,async(req,res)=>{
    await Customer.findById(req.params.id)
    .then(cust=>res.json(cust))
})

module.exports = router;