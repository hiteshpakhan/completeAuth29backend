const User = require("../models/User");

exports.getUser = async (req, res) => {
    const userid = req.id;
    let user;
    try {
        user = await User.findById(userid, "-password"); //by putting the - sign and the name of the property inside a string that you want to prevent from getting and passing it as second parameter will prevent from the value of that property
    } catch (error) {
        console.log(error.message);
    }

    if(!user){
        return res.status(404).json({message: "user not found"});
    }

    return res.status(200).json({message: user});
}