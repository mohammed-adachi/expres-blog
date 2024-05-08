const express = require('express');
const router=express.Router()
const user=require('../models/user');
const post=require('../models/post');
const jwt=require('jsonwebtoken');
const authence =(req,res,next)=>{
const token=req.cookies.token;
if(!token){
    return res.send('unvvvvv')
}
}

router.get('/admin', async (req, res) => {
  try {
    const locals = {
      title: "admin",
      description: "Simple Blog created with NodeJs, Express & MongoDb."
    }

  

  
    res.render('../views/pages/index', {
      locals
    
     
    });

  } catch (error) {
    console.log(error);
  }

});

router.post('/admin', async (req, res) => {
   try{


      const data ={name:req.body.username,password:req.body.password }
    const verifierDataname= await user.findOne({name:data.name});
    const verifierDatapassword= await user.findOne({password:data.password});
    if (!verifierDataname || !verifierDatapassword) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

const token = jwt.sign({ userId: user._id }, 'MySecretKey', { expiresIn: '1h' });
 res.cookie('token',token,{httpOnly:true});
  res.redirect('/dashbord')  
 

      
  
  
    
    
  
    } catch (error) {
      console.log(error);
    }
  
  });
router.get('/dashbord',async(req,res)=>{
    
const data= await post.find();


res.render('../views/layouts/dashbord',{data})

}

)
router.get('/edit-post',async(req,res)=>{
    
    const data= await post.find();
    
    
    res.render('../views/partials/add_dash',{data})
    
    }
    
    )
    router.post('/edit-post',async(req,res)=>{
    
        const  title=req.body.title;
        const   input =req.body.input;
        const data={textarea,input}
        const post= await post.insertMany(data);

        
        
        res.redirect('/dashbord')
        
        }
        
        )
            

  router.post('/register', async (req, res) => {
    try {
      
        const data={name:req.body.usernamee,password:req.body.passwordd };
        console.log(data)
        const userdata= await user.insertMany(data);
        console.log(userdata);
  
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Erreur lors de la création de l'utilisateur." });
    }
});


module.exports=router;

// function insertPostData () {
//       user.insertMany([
//          {
//                 name: "moahhmeds",
//                  password: "salam"
//                },
             
                

//        ])
//      }
    
//      insertPostData();
    