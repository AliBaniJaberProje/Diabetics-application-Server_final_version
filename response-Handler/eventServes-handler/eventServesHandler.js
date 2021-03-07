import jwt from "jsonwebtoken"
import mongoose from "mongoose"
import event from "../../model/event.js";
import patient from "../../model/users/patient.js"
import * as event_mid from "../../middleware/eventMiddleware.js"
function addDays(date, days) {
    const copy = new Date(Number(date))
    copy.setDate(date.getDate() + days)
    return copy
}

const getEventWhereUserId=async (req,res,_)=>{
    const resultDecodeJWT= await jwt.decode(req.headers["x-auth-token"]);
    try{
        var date=new Date()
        console.log(date.getFullYear())
        var start =new  Date(date.getFullYear(),date.getMonth()+1,date.getDate());
        var end =new  Date(date.getFullYear(),date.getMonth()+1,date.getDate()+2);



   //"taken.userTake":resultDecodeJWT.id,
        const  result=await event.find({startEventTime: { $gt: start, $lt: end },"taken.userTake":resultDecodeJWT.id})//.select('- _id')
        console.log(result)
        if(result.length==0){
            res.status(400).json({
                msg:"not found any event for this user"
            },)
        }else{
            res.status(200).json({
                event:result
            })
        }

    }catch(error){
        res.status(400).json({
            msg:error.message
        })
    }
}

const selectEventForUser=async (req,res,_)=>{
    try{
        const resultDecodeJWT= await jwt.decode(req.headers["x-auth-token"]);
        const patientResult =await patient.find({"id":resultDecodeJWT.id})
        if(patientResult[0].idAppointment===undefined){

            const  result=await event.findByIdAndUpdate(req.body.id,{
                "taken.available":false,
                "taken.userTake":resultDecodeJWT.id
            });
            await patient.findOneAndUpdate({id:resultDecodeJWT.id},{idAppointment:result._id})
           return res.status(200).json({
                msg:"selected operation done"
            })
        }
        /// valedation proccess fo select multe time
        const selectedEvent=await event.findById(patientResult[0].idAppointment) //event from ui
        const selectedEventDate= Date.parse(selectedEvent["endEventTime"])
        if(selectedEventDate < Date.now()){
            const  result=await event.findByIdAndUpdate(req.body.id,{
                "taken.available":false,
                "taken.userTake":resultDecodeJWT.id
            });
            await patient.findOneAndUpdate({id:resultDecodeJWT.id},{idAppointment:result._id})
            return res.status(200).json({
                msg:"selected operation done"
            })
        }else{
            console.log("ppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppp")
            return res.status(200).json({
                msg:"error operation"
            })
        }
       // const e=event.find({endEventTime:{ $gte: startDate, $lte: endDate }})
        res.status(200).json({
            msg:result
        })
    }catch(error){
        res.status(400).json({
            msg:error.message
        })
    }
}

const getMyEvent=async (req,res,_)=>{
  try{
      console.log("hjkgffffff")
      const resultDecodeJWT= await jwt.decode(req.headers["x-auth-token"]);
      const patientUser=await patient.findOne({id:resultDecodeJWT.id})
      if(patientUser.idAppointment===undefined){
         return res.status(400).json({
              msg:"user not selected time"
          })
      }else{
       const myEvent=await event.findById(patientUser.idAppointment)
       return  res.status(200).json({
              msg:myEvent
          })
      }

  }catch(error){
      return res.status(400).json({
          msg:"user not selected time"
      })
  }
}


export{
    getEventWhereUserId,
    selectEventForUser,
    getMyEvent
}