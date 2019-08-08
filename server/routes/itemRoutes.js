const express = require('express');
const router = express.Router();
const axios = require('axios')
const Item = require('../models/Item');
// let ItemIHave =[];

//in this route find all items that are owned by req.user
router.get('/ingredient-you-have',(req,res,next)=>{

  Item.find({owner: req.user._id}).populate('owner')
  .then((AllTheItems)=>{
    
    // AllTheItems.forEach((eachItem)=>{
    //   ItemIHave.push(eachItem.name);
    // })
    // console.log('0-0-0-0-0=====',ItemIHave);
    
    res.json(AllTheItems);
  })
  .catch((err)=>{
    res.json(err);
  })
})

//route to see all ingredients
router.get('/ingredients-list', (req, res, next) => {
  let ingrediantlist = [];
  axios.get('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list')
  .then((theItems) => {
    // console.log('<<<<<<<<<<<',theItems)
    theItems.data.drinks.forEach(oneItem => {
      ingrediantlist.push(oneItem.strIngredient1)
    })
    res.status(200).json(ingrediantlist)
  })
  .catch((err) => {
    res.status(400).json(err)
  })
})


router.post('/create-item',(req,res,next)=>{
  let name = req.body.name;
  let owner = req.user._id;


  Item.create({
    name:name,
    owner:owner,
  })
  .then((response)=>{
    console.log('successfully create new item')
    res.json(response);
  })
  .catch((err)=>{
    res.json(err);
  })
})


router.post('/delete-item/:id',(req,res,next)=>{
  theID = req.params.id;

  Item.findByIdAndRemove(theID)
  .then((response)=>{
    res.json(response);
  })
  .catch((err)=>{
    res.json(err);
  })
})





// router.get('/search-for/:whatToSearch', (req, res, next) => {
//   axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?${req.params.whatToSearch}`)
//   .then(apiResponse => {
//     console.log('the info form api ========= ', apiResponse.data)
//     res.status(200).json(apiResponse.data);
//   }).catch(err => res.status(400).json(err))
// });




module.exports = router;