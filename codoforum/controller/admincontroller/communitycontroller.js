const Community = require("../../models/community");
const user = require('../../models/user')
const Tags = require('../../models/tag')

const moderatorlist = async (req, res) => {
  const moderators = await user.find(
    { category: "moderator" },
    { username: 1, email: 1, _id: 1, phone: 1, access: 1 }
  );
  const tagList = await Tags.find()
console.log('moderators',moderators);
  res.json({
    moderators,
    tagList
  });
};

const addCommunity = async (req, res) => {
  const data = req.file;
  const name = req.body.name;
  const members = req.body.members;
  const tags = req.body.tags
  const description = req.body.description

  imgUrl = `http://localhost:3000/${data.path.substring(6)}`;

  const community = new Community({
    name: name,
    image: imgUrl,
    admins: JSON.parse(members),
    tags:JSON.parse(tags),
    description:description
  });
  await community.save();
  res.json({
    success: true,
  });
};

const communityList = async (req, res) => {
  const community = await Community.find().populate('admins');
console.log('community',community);
  res.json({
    community,
  });
};

const removeCommunity = async (req, res) => {
  
  const Id = req.body.Id;

  await Community.findOneAndDelete({ _id: Id });
  res.json({
    success: true,
  });
};

const updateImg = async (req, res) => {
  const Id = req.body.id;
  const data = req.file;
 console.log('kkkokoo',req.body);
  imgUrl = `http://localhost:3000/${data.path.substring(6)}`;
  await Tags.findOneAndUpdate({ _id: Id }, { $set: { image: imgUrl } });

  res.json({
    success: true,
  });
};

const removeMember = async (req, res) => {
  const Id = req.body.Id;
  const id = req.body.ID;
  await Community.findOneAndUpdate({ _id: id }, { $pull: { admins: Id } });
  res.json({
    success: true,
  });
};

module.exports = {
  removeMember,
  moderatorlist,
  addCommunity,
  communityList,
  removeCommunity,
  updateImg
};
