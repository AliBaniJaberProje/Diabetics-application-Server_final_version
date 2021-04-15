import number_of_step from "../../model/number-of-step.js"
import jwt from "jsonwebtoken";


const addNewStep=async (req,res,_)=>{

  try{
      const resultDecodeJWT= await jwt.decode(req.headers["x-auth-token"]);

      const nowDate=new Date()

      const startDate=new Date(nowDate.getFullYear() , nowDate.getMonth(), nowDate.getDate() , 0,0,0,0,)

      const endDate=new Date(nowDate.getFullYear() , nowDate.getMonth(), nowDate.getDate() , 23,59,59,59,)

       const resultCheekIfFondInThisDay=await number_of_step.find({$and:[{idPatient:resultDecodeJWT.id},{startDate:{ $gte: startDate.getTime(), $lte: endDate.getTime() }}]})

      if(resultCheekIfFondInThisDay.length==0){
          console.log("eoteeeeeeee")
          const newStep= new number_of_step({
              idPatient:resultDecodeJWT.id,
              startDate:req.body['startTime'],
              endDate:new Date(Date.now()).getTime(),
              numberStep:req.body['numberOfStep'],
          })
          const result=await newStep.save()
      }else{

      }


      res.status(200).json(
          { "msg":result}
      )
  }catch (e){
      res.status(400).json(
          { "msg":"errorrrr"}
      )
  }

}

const selectInLastWeek=async (req,res,_)=> {

    const resultDecodeJWT= await jwt.decode(req.headers["x-auth-token"]);
    var end =new  Date();
    const startDate=new Date()
    startDate.setDate(startDate.getDate()-7)
    const result=await  number_of_step.find({$and:[{'idPatient':resultDecodeJWT.id},
            {startDate:{ $gte: startDate, $lte: end }}
        ]})

    let resultToResponse=[]
    resultToResponse[0]=0
    resultToResponse[1]=0
    resultToResponse[2]=0

    resultToResponse[3]=0
    resultToResponse[4]=0
    resultToResponse[5]=0

    resultToResponse[6]=0


    for(var index=0;index<result.length;index++){
        resultToResponse[new Date(result[index]['startDate']).getDay()]+= result[index]['numberStep']

    }

   await res.status(200).json(resultToResponse)

}

const getTimestamp=async (req,res,_)=>{
    res.status(200).json(
        {"now":new Date(Date.now()).getTime()}
    )

}

export  {
    addNewStep,
    selectInLastWeek,
    getTimestamp
}