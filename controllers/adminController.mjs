import auth from '../middlewares/auth.mjs';
import Menu from '../models/menuModels.mjs';
import users  from "../models/userModels.mjs"
const adminController = {
  
  addMenu: (req, res) => {
    const { name, category, description, price } = req.body;

    if (!name || !category || !description || !price) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newMenu = new Menu({
      name,
      category,
      description,
      price,
    });

    newMenu.save((err, menu) => {
      if (err) {
        return res.status(500).json({ message: 'Error adding menu', error: err.message });
      }
      res.status(201).json({ message: 'Menu added successfully', menu });
    });
  },

  editMenu:[ (req, res) => {
    const { menuId } = req.params;
    const { name, category, description, price } = req.body;

    if (!name || !category || !description || !price) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    Menu.findByIdAndUpdate(
      menuId,
      { name, category, description, price },
      { new: true, useFindAndModify: false },
      (err, updatedMenu) => {
        if (err) {
          return res.status(500).json({ message: 'Error updating menu', error: err.message });
        }

        res.status(200).json({ message: 'Menu updated successfully', menu: updatedMenu });
      }
    );
  }],

  
    listUsers:[auth.isAdminAuth,async(req,res)=>{
        const userData =  await users.find()
        const listUsers = userData.map((user)=>{
          return {
            name:user.name,
            email:user.email,
            age:user.age
          }
        })
       console.log(listUsers)
        return res.status(200).json({message:"Users fetched successfully",listUsers})
    }]
,

changeUserPrivilage:[auth.isAdminAuth,async(req,res)=>{
  const {email} = req.body
  const findUser = await users.findOne({email:email})
  console.log(findUser)
if(findUser){
  if(findUser.isAdmin){
    return res.status(400).json({message:"User is already an admin"})
  }
  await users.updateOne({email:email},{isAdmin:true})
  return res.status(200).json({message:"User changed to admin successfully"})
}else{
  return res.status(404).json({message:"User not found"})
}
}]


};

export default adminController;
