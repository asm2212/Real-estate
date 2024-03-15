import List from "../model/Listmodel.js";


export  const createList = async(req,res,next) => {
    try {
        const list = await List.create(req.body);
        return res.status(201).json(list);
    } catch (error) {
        next(error)
    }
};