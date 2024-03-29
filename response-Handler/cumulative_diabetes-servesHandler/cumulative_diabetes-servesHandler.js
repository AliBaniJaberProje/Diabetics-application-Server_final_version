import cumulative_diabetes from "../../model/cumulative-diabetes.js"
import jwt from "jsonwebtoken";


const addNewCumulative =async (req,res,_)=>{
    try{
        console.log(req.body)
        const NewCumulative=new cumulative_diabetes({
            idPatient:req.body.id,
            value:req.body.value,
            date:req.body.date
        })
        const result=await NewCumulative.save()
        res.status(200).json({
            "msg":"operation done"
        })

    }catch (e) {
        console.log(e.message)
        res.status(404).json({
            "error":e.message
        })
    }


}

const getCumulativeByYear=async (req,res,_)=>{
    try {
        console.log(req.params)
        const startDate=new Date(Number(req.params.year),0,0,0,0,0,0)
        const endDate=new Date(Number(req.params.year),11,31,23,59,59,59)

        const result=await cumulative_diabetes.find({$and:[
                {idPatient:req.params.id},
                {date:{ $gte: startDate, $lte:endDate }},

            ]}).select({date:true,value:true})
        res.status(200).json(result)

    }catch (e) {
        console.log(e.message)
        res.status(404).json({
            "msg":e.message
        })
    }
}

const getCumulativeToPatient=async (req,res,_)=>{
    try {
        console.log(req.params)
        const startDate=new Date(Number(req.params.year),0,0,0,0,0,0)
        const endDate=new Date(Number(req.params.year),11,31,23,59,59,59)
        const resultDecodeJWT= await jwt.decode(req.headers["x-auth-token"]);

        const result=await cumulative_diabetes.find({$and:[
                {idPatient:resultDecodeJWT.id},
                {date:{ $gte: startDate, $lte:endDate }},

            ]}).select({date:true,value:true})
        res.status(200).json(result)

    }catch (e) {
        console.log(e.message)
        res.status(404).json({
            "msg":e.message
        })
    }
}



export {
    addNewCumulative,
    getCumulativeByYear,
    getCumulativeToPatient
}
