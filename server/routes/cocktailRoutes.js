const express = require('express');
const router = express.Router();
const Cocktail = require('../models/Cocktail');
const uploadMagic = require('../config/cloudinary');


router.get('/yourowncocktail',(req,res,next)=>{

  Cocktail.find({owner: req.user._id}).populate('owner')
  .then((AllTheCocktails)=>{
        
    res.json(AllTheCocktails);
  })
  .catch((err)=>{
    res.json(err);
  })
})


router.post('/create-cocktail',uploadMagic.single('theImage'),(req,res,next)=>{

  
  let name = req.body.theName;
  let ingredients = req.body.theIngredients;
  let Instruction = req.body.theInstruction;
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
    instruction:Instruction,
    img:img,
    owner: owner,
  })
  .then((response)=>{
    res.json(response);
  })
  .catch((err)=>{
    res.json(err);
  })
})


router.post('/update-cocktail/:id', uploadMagic.single('theImage'), (req, res, next)=>{

  let theUpdate = {};
  theUpdate.name = req.body.theName;
  theUpdate.ingredients = req.body.theIngredients
  theUpdate.instruction = req.body.theInstruction;

  if(req.file){
    theUpdate.image = req.file.url
  }

  Cocktail.findByIdAndUpdate(req.params.id, theUpdate)
  .then((singleCocktail)=>{
    res.json(singleCocktail);
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

router.post('/delete-ingredient/:CocktailId/:Ingredient',(req,res,next)=>{
  
  theID = req.params.CocktailId;
  theIngredient = req.params.Ingredient;

  console.log('4545454545454545454545>>>>>>>>>>',req.params.Ingredient)
  Cocktail.findById(theID)
  .then((theCocktail)=>{

    console.log(theCocktail)
    
    let i = theCocktail.ingredients.indexOf(theIngredient)
    
        
   
        theCocktail.ingredients.splice(i,1)
      
      

    theCocktail.save()
    .then(()=>{
      res.json(response);
    })
    .catch((err)=>{
      res.json(err);
    }) 
  
  })
  .catch((err)=>{
    res.json(err);
  })
})


module.exports = router;