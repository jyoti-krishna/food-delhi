import foodModel from "../models/foodModel.js";
import fs from 'fs';

const addFood = async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    let image_filename = `${req.file.filename}`;
    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        image: image_filename,
        category: req.body.category,
    });

    try{
        await food.save();
        res.json({success:true, message:"food Added Successfully"});
    }
    catch(error){
        console.log(error);
        res.json({success:false, message:error.message});
    }
};

const getFoodList = async (req,res) => {
    try{
        const food = await foodModel.find();
        res.json({success:true, data:food});
    }
    catch(error){
        console.log(error);
        res.json({success:false, message:error.message});
    }
}

const removeFood = async (req,res) => {
    try{
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`,()=>{});
        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success:true, message:"Food Removed Successfully"});
    }
    catch(error){
        console.log(error);
        res.json({success:false, message:error.message});
    }
}

export { addFood,getFoodList,removeFood };