const express = require('express');
const router = express.Router();

const apartment = require('../models/apartment');
const auth = require("../middleware/auth");
const tenant=require('../models/tenants');


router.post('/add',auth,async (req, res) => {
    const newapartment = new apartment({

        apId: req.body.apId,
        floorno: req.body.floorno,
        bedRoomSize: req.body.bedRoomSize,
        ownerName:req.body.ownerName,
        occupied: req.body.occupied,
        billPaid: req.body.billPaid
    })

    try {


        const s1 = await newapartment.save()
        res.json(s1)


    } catch (err) {
        res.send('error')
    }

})
router.get('/getap',auth, async (req, res) => {
    try {

        const s2 = await apartment.find();
        res.json(s2);
    }
    catch (err) {
        res.send(err);
    }
})

router.get('/getap/:id',auth, async (req, res) => {
    try {
        const getapartment = await apartment.findById(req.params.id);
        res.json(getapartment);

    }
    catch (err) {
        res.json(err);
    }
})


router.patch('/updateap/:id',auth, async (req, res) => {
    try {
        const updateapartment=await apartment.findById(req.params.id);
        updateapartment.occupied =req.body.occupied;

        const newdetails= await updateapartment.save();
        res.json(newdetails);
    }
    catch (err) {
        res.send(err);
    }
})


router.delete('/deleteap/:id',auth, async (req, res) => {
    try {
        const oneapartment = await User.findById(req.params.id);
        const remaining=await oneUser.delete();
        res.json("apartment delted");
  
    }
    catch (err) {
        res.json(err);
    }
  })

  router.post('/addtenant',auth, async (req, res) => {
    const newtenant = new tenant({

        first_name:req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password,
        role:req.body.role,
      apId:req.body.apId
       
    })

    try {


        const s3 = await newtenant.save()
        res.json(s3)


    } catch (err) {
        res.send('error')
    }

})


router.get('/gettenant',auth, async (req, res) => {
    try {

        const s2 = await tenant.find();
        res.json(s2);
    }
    catch (err) {
        res.send(err);
    }
})

router.get('/gettenant/:id',auth, async (req, res) => {
    try {
        const gettenant = await tenant.findById(req.params.id);
        res.json(gettenant);

    }
    catch (err) {
        res.json(err);
    }
})


router.delete('/deletetenant/:id',auth, async (req, res) => {
    try {
        const onetenant = await tenant.findById(req.params.id);
        const remaining=await onetenant.delete();
        res.json("tenant deleted");
  
    }
    catch (err) {
        res.json(err);
    }
  })

module.exports = router;