const express = require('express');
const router=express.Router()
const Post=require('../models/post')

router.get('', async (req, res) => {
  try {
    const locals = {
      title: "NodeJs Blog",
      description: "Simple Blog created with NodeJs, Express & MongoDb."
    }

    let perPage = 4;
    let page = req.query.page || 1;

    const data = await Post.aggregate([ { $sort: { createdAt: -1 } } ])
    .skip(perPage * page - perPage)
    .limit(perPage)
    .option({ maxTimeMS: 30000 })
    .exec();

    // Count is deprecated - please use countDocuments
    // const count = await Post.count();
    const count = await Post.count;
    const nextPage = parseInt(page) + 1;

    const hasNextPage = nextPage <= Math.ceil(count / perPage);
    nextPage: hasNextPage ? nextPage : null    
    res.render('../views/pages/home', {
      locals,
      data,
      current: page,
      nextPage,
      hasNextPage,
      currentRoute: '/'
    });

  } catch (error) {
    console.log(error);
  }

});
router.post('/search', async (req, res) => {
  try {
   
    let inputValue = req.body.inputValue;
    const searchNoSpecialChar = inputValue.replace(/[^a-zA-Z0-9 ]/g, "")
    const data = await Post.find({
      $or: [
        { title: { $regex: new RegExp(searchNoSpecialChar, 'i') }},
        { body: { $regex: new RegExp(searchNoSpecialChar, 'i') }}
      ]
    });
    res.render( '../views/partials/serach' , {data,inputValue} );

  } catch (error) {
    console.log(error);
  }

});




router.get('/post/:id', async (req, res) => {
  try {
    const locals = {
      title: "NodeJs Blog",
      description: "Simple Blog created with NodeJs, Express & MongoDb."
    }
    let slug=req.params.id;
 
   const data= await Post.findById({_id:slug})
   
   
    
    // const title = req.params.title;
    // const data = await Post.findOne({title:title})

    // Count is deprecated - please use countDocuments
    // const count = await Post.count();
    
    // console.log(data)
    res.render('../views/pages/posts', { data,
      locals });

  } catch (error) {
    console.log(error);
  }

});




module.exports=router; 




// function insertPostData () {
//       Post.insertMany([
//          {
//                 title: "Learn Morgan - HTTP Request logger for NodeJs",
//                  body: "Learn Morgan."
//                },
//                {
//                      title: "NodeJs Limiting Network Traffic",
//                        body: "Learn how to limit netowrk traffic."
//                     },
//                     {
//                       title: "Learn Morgan - HTTP Request logger for NodeJs",
//                        body: "Learn Morgan."
//                      },
//                      {
//                       title: "Learbdgggdger for NodeJs",
//                        body: "Learn Morgan."
//                      },
//                      {
//                       title: "Learnhhsffgdttdr for NodeJs",
//                        body: "Learn Morgan."
//                      },
//                      {
//                       title: "Lvvvvvvvvvvvvvvv",
//                        body: "Learn Morgan."
//                      },
                

//        ])
//      }
    
//      insertPostData();
    
  