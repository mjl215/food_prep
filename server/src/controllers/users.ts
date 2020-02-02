import { Request, Response, NextFunction } from 'express';
import User from '../models/user';
import Order from '../models/order'
import bcrypt from 'bcrypt';

//Create a User
export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    const user = new User(req.body);
    const token = await user.generateAuthToken();
    user.save((err: any) => {
        if (err) {
            res.send(err);
        } else {
            console.log('saving')
            res.send({token, user});
        }
    });
};


//Login User
export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password} = req.body
    
    try {
        const user = await User.findOne({ email });

    if (!user) {
        throw new Error('Unable to login');
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('Unable to login');
    }
    
    const token = await user.generateAuthToken();
    res.send({token, user});

    } catch (error) {
        res.status(400).send();
    }
}

//Logout User
export const logoutUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        req.user.tokens = req.user.tokens.filter((token: {token: string}) => {
        return token.token !== req.token
        })
    
        await req.user.save();
    
        res.send();
    } catch (e) {
        res.status(500).send(e);
    }
}

//Check Auth of User
export const authUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.send({user: req.user, token: req.token});
    } catch (e) {
        console.log(e)
    }
}

//Add User Basked
export const addBasket = async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body.basket);
    try {
        const user = await User.updateOne(
            {_id: req.user.id}, 
            {basket: req.body.basket}
        );
        
        if(!user){
            throw new Error('user not found')
        }

        const updatedUser = await User.findOne({_id: req.user.id})
        res.send(updatedUser);
        
        // const newBasket = {recipe: req.body.recipe, quantity: req.body.quantity}
        // user.basket = [...user.basket, newBasket];
    } catch (e) {
        console.log(e)
    }
}

export const checkout = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const basket = req.body.basket
        basket.forEach((basketItem: any) => {
            

                const newOrder = {
                    recipe: basketItem.recipe,
                    buyer: req.user._id,
                    suplier: basketItem.owner,
                    quantity: basketItem.quantity,
                    status: 'OPEN'
                }
    
                const order = new Order(newOrder);
                order.save();
        });
        
        const user = await User.updateOne(
            {_id: req.user.id}, 
            {basket: []}
        );

        res.send();

        
    } catch (e) {
        
    }
}

//Edit basket item
export const editBasketItem = async (req: Request, res: Response, next: NextFunction) => {
    try {

        console.log(req.body)
    //const user = await User.findOneAndUpdate({}, { })
    
  //   if(!user){
  //     throw new Error('user not found')
  // }



  // console.log(user._id)

        res.send();
    } catch (e) {
        
    }
}
//remove basket item
export const removeBasketItem = async (req: Request, res: Response, next: NextFunction) => {
    try {
        
    } catch (e) {
        
    }
}

//Remove basket
export const removeBasket = async (req: Request, res: Response, next: NextFunction) => {
    try {
        
    } catch (e) {
        
    }
}