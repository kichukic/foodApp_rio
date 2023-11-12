import mongoose from 'mongoose';

const menuSchema = new mongoose.Schema({
  name: { type: String, required: true },
  subcategories: [{ type: String, required: true }],
  price: { type: Number, required: true },
  parentCategory: { type: String, required: true },
});

const menumodel = mongoose.model('Menu', menuSchema);

export default menumodel;
