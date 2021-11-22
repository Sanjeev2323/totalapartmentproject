require('dotenv').config();

const express = require('express');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const router = express.Router()
const Admin = require('../models/admin')

const User = require('../models/user');
const apartment = require('../models/apartment');
const auth = require("../middleware/auth");
const isadmin=require("../middleware/isadmin");
const {adduservalidation}=require('../validation/users/user.validation')

router.post('/register', async (req, res) => {
  const newadmin = new Admin({

    name: "sanjeev",

    role: "admin",
    email: "sanjeevpadma2323@gmail.com",
    password: "76989"
  })

  try {


    const s1 = await newadmin.save()
    res.json(s1)


  } catch (err) {
    res.send('error')
  }

})


router.post("/admin/login", async (req, res) => {

  // Our login logic starts here
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const admin = await Admin.findOne({ email , password});

    if (admin ) {
      // Create token
      const token = jwt.sign(
        { admin_id: admin._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      // save user token
      admin.token = token;

      // user
      res.status(200).json(admin);
    }
    res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
  // Our register logic ends here
});


router.post("/createuser",adduservalidation,async (req, res) => {

  // Our register logic starts here
  try {
    // Get user input
    const { first_name, last_name, email, password } = req.body;

    // Validate user input
    if (!(email && password && first_name && last_name)) {
      res.status(400).send("All input is required");
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    //Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const user = await User.create({
      first_name,
      last_name,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      password: encryptedPassword,
    });

    /*
    // Create token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    // save user token
    user.token = token;
   */
    // return new user
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
  // Our register logic ends here
});





  router.post("/login", async (req, res) => {

    // Our login logic starts here
    try {
      // Get user input
      const { email, password } = req.body;
  
      // Validate user input
      if (!(email && password)) {
        res.status(400).send("All input is required");
      }
      // Validate if user exist in our database
      const user = await User.findOne({ email });
  
      if (user && (await bcrypt.compare(password, user.password))) {
        // Create token
        const token = jwt.sign(
          { user_id: user._id, email },
          process.env.TOKEN_KEY,
          {
            expiresIn: "2h",
          }
        );
  
        // save user token
        user.token = token;
  
        // user
        res.status(200).json(user);
      }
      res.status(400).send("Invalid Credentials");
    } catch (err) {
      console.log(err);
    }
    // Our register logic ends here
  });

router.get('/getuser',isadmin,async (req, res) => {
  try {

      const allusers = await User.find();
      res.json(allusers).status(200);
  }
  catch (err) {
      res.send(err);
  }
})



router.get('/getuser/:id',async (req, res) => {
  try {
      const oneUser = await User.findById(req.params.id);
      res.json(oneUser);

  }
  catch (err) {
      res.json(err);
  }
})


router.delete('/deleteuser/:id', async (req, res) => {
  try {
      const oneUser = await User.findById(req.params.id);
      const remaining=await oneUser.delete();
      res.json("user delted");

  }
  catch (err) {
      res.json(err);
  }
})


router.get('/getap', async (req, res) => {
  try {

    const s2 = await apartment.find();
    res.json(s2);
  }
  catch (err) {
    res.send(err);
  }
})

router.get('/dashboard',async(req,res)=>{
  try{
       const paidp=await apartment.find({
         billPaid :false
       });
    /*   const list=[];
       var j=0;
       for(var i=0;i<paidp.length;i++){
         if(paidp[i].billPaid===true){
           list[j]=paidp[i];
           j++;
         }
       }
       */
       res.json(paidp);
  }
  catch(err){
          res.json(err);
  }
})


router.get('/apartm',(req,res,next)=>{
  const searchField= req.query.ownerName;
    apartment.find({ownerName:{$regex: searchField, $options :'$i'}})
    .then(data=>{
      res.send(data);
    })
})


module.exports = router