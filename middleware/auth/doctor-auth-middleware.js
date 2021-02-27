const signUpValidationDoctor=async (req,res,next)=>{
    console.log("Middleware");
    console.log("userName")
    next()
}

const signInValidationDoctor=async (req,res,next)=>{

    console.log("Middleware");
    next()

}

export {
    signInValidationDoctor,
    signUpValidationDoctor
}