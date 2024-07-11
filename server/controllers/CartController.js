import userModel from '../models/UserModel.js'

// add to cart(user cart)
const addToCart = async(req,res) => {
    try {
        let userData = await userModel.findById(req.body.userId)
        let cartData = await userData.cartData;
        if(!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1;
        }
        else {
            cartData[req.body.itemId] += 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId,{ cartData });
        res.json({success:true,message:"Item Added to Cart "})
    } catch (error) {
        console.log(error);
        res.json({sucess:false,message:"Item not added to cart"})
        
    }
}

//remove from usercart
const removeFromCart = async(req,res) => {
    try {
        let userData = await userModel.findById(req.body.userId)
        let cartData  =await userData.cartData
        if(cartData[req.body.itemId]>0) {
            cartData[req.body.itemId] -= 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId,{ cartData })
        res.json({success:true,message:'item removed from cart'})
    } catch (error) {
        console.log(error);
        res.json({sucess:false,message:'Not able to remove from cart'})
    }
}

//fetch user CART DATA
const getCart = async(req,res) => {
    try {
        let userData = await userModel.findById(req.body.userId)
        let cartData = await userData.cartData
        res.json({success:true,cartData})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:'Unable to fetch Cart'})
    }
}

export  { addToCart, removeFromCart, getCart }