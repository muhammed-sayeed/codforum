const user = require("../../models/user");

const userList = async (req, res) => {
    const users = await user.find(
      { category: { $ne: "admin" } },
      { username: 1, email: 1, _id: 1, phone: 1, access: 1 }
    );
    res.json({
      users,
    });
  };
  
  const manageUser = async (req, res) => {
    const acc = req.body.access;
    const ID = req.body.Id;
    const newacc = !acc;
  
    await user.findOneAndUpdate({ _id: ID }, { $set: { access: newacc } });
    res.json({
      success: true,
    });
  };
  
  const ediUser = async (req, res) => {
    const id = req.body.Id
    const username = req.body.username
    const email = req.body.email
    const phone = req.body.phone
  
    await user.findOneAndUpdate({_id:id},{$set:{username:username,email:email,phone:phone}})
    res.json({
      success:true
    })
  }

  module.exports ={
    userList,
    manageUser,
    ediUser,
  }