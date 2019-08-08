const express = require('express');
const router = express.Router();
const axios = require('axios');
const Cocktail = require('../models/Cocktail');
const uploadMagic = require('../config/cloudinary');


router.get('/yourowncocktail',(req,res,next)=>{

  Cocktail.find({owner: req.user._id}).populate('owner')
  .then((AllTheCocktails)=>{
    
    console.log('MyOwnCocktail=========',AllTheCocktails)
    
    res.json(AllTheCocktails);
  })
  .catch((err)=>{
    res.json(err);
  })
})


router.post('/create-cocktail',uploadMagic.single('theImage'),(req,res,next)=>{
  
  let name = req.body.theName;
  let ingredients = req.body.theIngredients;
  let instruction = req.body.theInstruction;
  let owner = req.user._id;

  let img;

  if(req.file){
    img = req.file.url
  } else{
    img = 'http://getwallpapers.com/wallpaper/full/e/1/2/41252.jpg'
  }


  Cocktail.create({
    name: name,
    ingredients:ingredients,
    instruction:instruction,
    img:img,
    owner: owner,
  })
  .then((response)=>{
    console.log('successfully create new cocktail')
    res.json(response);
  })
  .catch((err)=>{
    res.json(err);
  })
})




router.post('/delete-cocktail/:id',(req,res,next)=>{
  theID = req.params.id;

  Cocktail.findByIdAndRemove(theID)
  .then((response)=>{
    res.json(response);
  })
  .catch((err)=>{
    res.json(err);
  })
})


module.exports = router;