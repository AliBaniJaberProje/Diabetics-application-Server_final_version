import dose from "../../model/dose.js"
import doseHistory from "../../model/doseHistory.js"


const getDoseForPatient=async (req,res,next)=>{

  try{

      const result=await dose.findOne({idPatient:req.params.id})
      let inject=[]

      if(result){
           for(var i=0;i<result['inject'].length;i++){
               if(result['inject'][i]['flag']!=="")
                   inject.push(result['inject'][i])
           }
          result['inject']=inject
          res.status(200).json(result)

      }
  }catch (e) {
     res.status(400).json(
         {mag:"error"}
     )
  }

}

const updateDose=async (req,res,_)=>{

   try{
       const previousDose=await dose.findOne({idPatient:req.params.id})
       const deleteResult=await dose.deleteOne({idPatient:req.params.id})
       const newHistoryObject=new doseHistory({
           startDate:previousDose['date'],
           doseItem:previousDose
       })

       const newdose= new dose({
           idPatient:req.params.id,
           inject:req.body['inj']
       })
       await newdose.save()
       const result=await newHistoryObject.save()

       res.status(200).json({
           msg:"update success"
       })
   }catch (e) {
       res.status(404).json({
           msg:e.message
       })
   }

}


export {
    getDoseForPatient,
    updateDose

}