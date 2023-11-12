import auth from "../middlewares/auth.mjs"
import menumodel from "../models/menuModels.mjs"


const menuController = {
  addMenu: [auth.isAdminAuth, async (req, res) => {
    try {
      const { name, subCategory, price } = req.body;
      const parentCategory = subCategory[subCategory.length - 1];
  
      const categories = subCategory.map((subCat, index) => {
        const subcategories = subCategory.slice(0, index + 1);
        return { name: subCat, subcategories };
      });
  
      const newMenuItem = await menumodel.create({
        name,
        subcategories: subCategory,
        price,
        parentCategory,
      });
  
      return res
        .status(200)
        .json({ message: "Menu item created successfully", newMenuItem });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "Some error occurred on the server", error: error.message });
    }
  }]
    
,
editMenu: [auth.isAdminAuth, async (req, res) => {
  try {
    const { id, name, subCategory, price } = req.body;
    const parentCategory = subCategory[subCategory.length - 1];

    const categories = subCategory.map((subCat, index) => {
      const subcategories = subCategory.slice(0, index + 1);
      return { name: subCat, subcategories };
    });

    const updatedMenuItem = await menumodel.findByIdAndUpdate(
      id,
      {
        name,
        subcategories: subCategory,
        price,
        parentCategory,
      },
      { new: true } 
    );

    if (!updatedMenuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    return res
      .status(200)
      .json({ message: 'Menu item updated successfully', updatedMenuItem });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: 'Some error occurred on the server', error: error.message });
  }
}]
,
    viewMenu: [async(req,res)=>{
        try {
            const menu = await menumodel.find()
            console.log("🚀 ~ file: menuController.mjs:53 ~ viewMenu:[async ~ menu:", menu)
           if(menu){
            const Menus = menu.map(({ _id,name, subcategories, price }) => ({_id, name, subcategories, price }));
            console.log("?>>>>>>>>>>>>>",Menus)
            return res.status(200).json({message:"Menu fetched successfully",Menus})
           }
           return res.status(404).json({message:"Menu not found"})
        } catch (error) {
            console.log(error)
            return res.status(500).json({message:"some error occured in server",error:error.message})
        }
    }]






}




export default menuController