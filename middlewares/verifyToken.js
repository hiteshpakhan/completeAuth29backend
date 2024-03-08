const jwt = require("jsonwebtoken");

const verifyTokens = async (req, res, next)=>{
    // const headers = req.headers["authorization"];
    // const token = headers.split(" ")[1];   

    const cookies = await req.headers.cookie;
    const token = cookies.split("=")[1];   

    if(!token){
        return res.status(404).json({ message: "no token found" });
    }

    // verify method has 3 parameters token, secretkey, callback
    jwt.verify(String(token), process.env.SECRETKEY, (error, user)=>{   // this callback has 2 things first error and second is decoded data

        if(error){
            return res.json({message: "invalid token"});
        }

        req.id = user.id;   //here we are sending the decoded id and seting it to our request id
    })
    next(); // here we are going our of the middleware
}

module.exports = verifyTokens;