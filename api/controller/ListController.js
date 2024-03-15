export  const createList = async(req,res,next) => {
    try {
        const list = await List.create(req.body);
    } catch (error) {
        next(error)
    }
};