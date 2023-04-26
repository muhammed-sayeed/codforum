const Tag = require('../../models/tag')

const addTag = async(req,res)=>{
 
    const data = req.file
    const name = req.body.name
    const description = req.body.description
  
    const imgUrl = `http://localhost:3000/${data.path.substring(6)}`
   
  
    const tag = new Tag ({
     name:name,
     description:description,
     image: imgUrl
    })
   await tag.save()
  
    res.json({
      success:true
  })
  }
  
  const tagList = async(req,res)=>{
    const tags = await Tag.find()
    console.log(tags,'taaaaaaa');
    res.json({
      tags
    })
  }
  
  const editTag = async (req,res)=>{
   
    const name = req.body.name
    const description = req.body.description
    const Id = req.body.Id
   
  
  await Tag.findOneAndUpdate({_id:Id},{$set:{name:name,description:description}})
  res.json({
    success:true
  })
  }
  
  const removeTag = async (req,res)=>{
   
    const Id = req.query.Id
    console.log(Id);
    await Tag.findOneAndDelete({_id:Id})
    res.json({
      success:true
    })
  }

  
module.exports ={
    addTag,
    tagList,
    editTag,
    removeTag,
}