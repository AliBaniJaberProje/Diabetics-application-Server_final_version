import cumulative_diabetes from "../../model/cumulative-diabetes.js"


const addNewCumulative =async (req,res,_)=>{
    try{
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
        res.status(404).json({
            "error":e.message
        })
    }


}



export {
    addNewCumulative
}
