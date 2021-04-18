import number_of_step from "../../model/number-of-step.js"
import jwt from "jsonwebtoken";


const addNewStep=async (req,res,_)=>{

  try{
      console.log(req.body)
      const resultDecodeJWT= await jwt.decode(req.headers["x-auth-token"]);

      const nowDate=new Date()

      const startDate=new Date(nowDate.getFullYear() , nowDate.getMonth(), nowDate.getDate() , 0,0,0,0,)

      const endDate=new Date(nowDate.getFullYear() , nowDate.getMonth(), nowDate.getDate() , 23,59,59,59,)

       const resultCheekIfFondInThisDay=await number_of_step.find({$and:[{idPatient:resultDecodeJWT.id},{startDate:{ $gte: startDate.getTime(), $lte: endDate.getTime() }}]})

      console.log("----------------------------------------")
      console.log(resultCheekIfFondInThisDay)
      console.log("----------------------------------------")
      console.log("----------------------------------------")
     // console.log(resultCheekIfFondInThisDay[0]["_id"])
     // console.log(resultCheekIfFondInThisDay[0]["numberStep"])
      console.log("----------------------------------------")
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

          const resultupdate=await number_of_step.findByIdAndUpdate(resultCheekIfFondInThisDay[0]["_id"],{$set:{numberStep:Number(Number(req.body['numberOfStep'])+Number(resultCheekIfFondInThisDay[0]["numberStep"]))}})
          console.log(resultupdate)

      }


      res.status(200).json(
          { "msg":"done"}
      )
  }catch (e){
      res.status(400).json(
          { "msg":e.message}
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

const getAllStepsToPatient=async (req,res,_)=>{
    try{


        const toFindNumberOfDays=new Date(Number(req.params.year),Number(req.params.month),0,0,0,0,0)

        const startDate1=new Date(Number(req.params.year),Number(req.params.month)-1,0,0,0,0,0)
        const endDate1=new Date(Number(req.params.year),Number(req.params.month)-1,toFindNumberOfDays.getDate(),23,59,59,59)


        const resultDecodeJWT= await jwt.decode(req.headers["x-auth-token"]);
        let resultServes=[]


        const result=await number_of_step.find({$and:[{idPatient:resultDecodeJWT.id},{endDate:{ $gte: startDate1.getTime(), $lte: endDate1.getTime() }}]}).sort({endDate:1}).select({startDate:true,numberStep:true,_id:false})
        let date;
        for(var i=0;i<result.length;i++){
            date=new Date(result[i]["startDate"])
           resultServes.push({
               "numberStep":result[i]["numberStep"],
               "date":date.getMonth()+1+"-"+date.getDate()
           })
       }

        res.status(200).json(
            {
                "msg":resultServes
            }
        )
    }
    catch (e) {
        res.status(404).json({
            "error":e.message
        })
    }

}
const getAllStepsToDoctor=async (req,res,_)=>{
    try{
        console.log("*/////////////***************")
        console.log(req.params)


        const toFindNumberOfDays=new Date(Number(req.params.year),Number(req.params.month),0,0,0,0,0)

        const startDate1=new Date(Number(req.params.year),Number(req.params.month)-1,0,0,0,0,0)
        const endDate1=new Date(Number(req.params.year),Number(req.params.month)-1,toFindNumberOfDays.getDate(),23,59,59,59)



        let resultServes=[]


        const result=await number_of_step.find({$and:[{idPatient:req.params.id},{endDate:{ $gte: startDate1.getTime(), $lte: endDate1.getTime() }}]}).sort({endDate:1}).select({startDate:true,numberStep:true,_id:false})
        let date;
        for(var i=0;i<result.length;i++){
            date=new Date(result[i]["startDate"])
            resultServes.push({
                "numberStep":result[i]["numberStep"],
                "date":date.getFullYear()+"-"+Number(Number(date.getMonth())+1)+"-"+date.getDate()
            })
        }

        res.status(200).json(
            {
                "msg":resultServes
            }
        )
    }
    catch (e) {
        res.status(404).json({
            "error":e.message
        })
    }
}

export  {
    addNewStep,
    selectInLastWeek,
    getTimestamp,
    getAllStepsToPatient,
    getAllStepsToDoctor,


}