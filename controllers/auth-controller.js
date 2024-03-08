const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signUp = async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
      // CHECKING IF THE USER ALREADY EXISTS
      let existingUser;
      try {
        existingUser = await User.findOne({ email });
      } catch (error) {
        console.log(error.message);
      }
  
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }
  
      // hashing the password
      const hashedPassword = await bcrypt.hash(password, 10)  //here 10 are the salt rounds that we are giving by default its 10

      // CREATING A NEW USER
      const user = new User({
        name,
        email,
        password: hashedPassword,
      });

      await user.save();
      
      return res.status(201).json({ message: user });
    } catch (error) {
      console.log(error.message);
    }
  };

exports.login = async (req, res) => {
  const {email, password} = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({email});    
  } catch (error) {
    console.log(error.message);
  }
  if(!existingUser){
    return res.status(404).json({message: "User does not exist"});
  }
  const isPsaawordCorrect = await bcrypt.compare(password, existingUser.password);
  if(!isPsaawordCorrect){
    return res.status(404).json({message: "Password is incorrect"});
  }
  // creating a token 
  //for this we need some things payload, secret key, and in the third options we have many things like here we have set the expiration limit
  const token = jwt.sign({id: existingUser._id}, process.env.SECRETKEY, { expiresIn: "1h" });

  // here we have to create the cookie after we have created the token
  // it takes 3 parameters name, value, options
  res.cookie(String(existingUser.id), token, {
    path: "/",
    expires: new Date(Date.now() + 1000 * 30),  // here thousend means 1 second
    httpOnly: true, //you can only access the cookies on browser if you add the httpOnly property true
    sameSite: "lax",
  })  

  return res.status(200).json({message: "Successfullly Login"}); 
}