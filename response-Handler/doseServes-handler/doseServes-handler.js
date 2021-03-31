import dose from "../../model/dose.js"

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

export {
    getDoseForPatient,

}