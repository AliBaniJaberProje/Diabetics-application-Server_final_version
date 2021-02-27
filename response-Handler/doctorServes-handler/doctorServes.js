import Patient from "../../model/users/patient.js"

const addNewPatient=async (req,res,_)=>{
    try{

        const newPatient=new Patient(req.body)
        console.log(newPatient)
        await newPatient.save()
        res.status(200).json({
            msg:"operation accomplished successfully",
            status:200,
        })


    }catch(e){
        res.status(400).json({
            msg:e.message,
            status:400,
        })
    }
}

export {
    addNewPatient
}