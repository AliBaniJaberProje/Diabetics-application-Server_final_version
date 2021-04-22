import jwt from "jsonwebtoken"
import mongoose from "mongoose"
import event from "../../model/event.js";
import patient from "../../model/users/patient.js"
import * as event_mid from "../../middleware/eventMiddleware.js"
import eventHistory from "../../model/eventHistory.js";

let tmp=111001

const addNewEvent=async (req,res,_)=>{
    try{

        const token=req.headers.authorization.split(" ")[1]
        const resultDecodeJWT=  jwt.decode(token);
        console.log("eeeeeeeeeeeeee")

        console.log(req.body)

        const newEvent=new event({
            startEventTime:new Date(Number(req.body.event.startTimeEvent)),
            endEventTime:new Date(Number(req.body.event.endTimeEvent)),
            typeEvent:req.body.event.typeEvent,
            title:req.body.event.titleEvent,
            color:req.body.event.color,
            taken:{
                available:true,
                userTake:null,
            },
            idDoctor:resultDecodeJWT.id,
        })
        console.log("22222222222222222")
        var result= await newEvent.save()
        console.log("tttttttttttttttt")

        console.log("add done ")
        res.status(200).json({
            msg:result
        })
    }catch(error){
        console.log(error.message)
        res.status(400).json({
            msg:error.message
        })
    }
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
        const eventToSelect=await event.findById(req.body.id)
        if(eventToSelect.taken.available==false){
             return res.status(400).json({
                 msg:"this event was seleted"
             })
        }
        if(patientResult[0].idAppointment==undefined){

            const  result=await event.findByIdAndUpdate(req.body.id,{
                "taken.available":false,
                "taken.userTake":resultDecodeJWT.id,
                "title":patientResult[0].username,
                "taken.patientRef":resultDecodeJWT._id,
                "imagePatient":patientResult[0].imgURL,
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
                "taken.userTake":resultDecodeJWT.id,
                "title":patientResult[0].username,
                "imagePatient":patientResult[0].imgURL,
            });
            await patient.findOneAndUpdate({id:resultDecodeJWT.id},{idAppointment:result._id})
            return res.status(200).json({
                msg:"selected operation done"
            })
        }
        else{
            console.log("ppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppp")
            return res.status(401).json({
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

const getAllAvailableEvent=async (req,res,_)=>{
    try{
        const resultDecodeJWT= await jwt.decode(req.headers["x-auth-token"]);
         const pationInfo=await  patient.findOne({id:resultDecodeJWT.id}).select({currentDoctor:true})

       let startDate;

        if(new Date(Date.now()).getDate()===Number(req.body["start"].split("-")[2].split(" ")[0])){
            startDate=new Date(Number(req.body["start"].split('-')[0]),
                Number(req.body["start"].split('-')[1]),
                Number(req.body["start"].split("-")[2].split(" ")[0]),new Date(Date.now()).getHours(),new Date(Date.now()).getMinutes(),0,0)

        }else{
            startDate=new Date(Number(req.body["start"].split('-')[0]),
                Number(req.body["start"].split('-')[1]),
                Number(req.body["start"].split("-")[2].split(" ")[0]),0,0,0,0)

        }




        const endDate=new Date(Number(req.body["start"].split('-')[0]),
            Number(req.body["start"].split('-')[1]),
            Number(req.body["start"].split("-")[2].split(" ")[0]),23,59,59,0)


        const  result=await event.find({$and:[{startEventTime: { $gte: startDate, $lte: endDate }},{"taken.available":true,},{"typeEvent":"1"},{idDoctor:pationInfo['currentDoctor']}]},"typeEvent taken startEventTime endEventTime ").sort("startEventTime")
        console.log(result.length)
        res.status(200).json({
            msg:result
        })
    }catch(error){
        res.status(400).json({
            msg:error.message
        })
    }
}

const deleteEvent=async(req,res,_)=>{

    try {
        const resultDecodeJWT= await jwt.decode(req.headers["x-auth-token"]);
        await patient.findOneAndUpdate({id:resultDecodeJWT.id},{idAppointment:undefined})
        await event.findByIdAndUpdate(req.param("id"),{"taken.available":true,"title":"موعد متاح"})
        res.status(200).json({
            "msg":"delete done"
        })
    }catch(error){
        res.status(400).json({
            "msg":"error"
        })
    }




}

const getAllEventToDoctor=async (req,res,_)=>{

    try{
        const token=req.headers.authorization.split(" ")[1]
        const resultDecodeJWT=  jwt.decode(token);
        const events=await event.find({idDoctor:resultDecodeJWT.id}).select({_id:true,startEventTime:true,endEventTime:true,title:true,typeEvent:true,taken:true,color:true})

        res.status(200).json(events)
    }catch (e) {
        res.status(400).json({"msg":"errrorororor"})

    }

}

const deleteEventFromDoctor=async (req,res,_)=>{

    try {
        console.log("_---------------------------------")
        console.log(req.params.id)
        const result=await event.findByIdAndDelete(req.params.id)
        const patientr=await patient.findOne({"idAppointment":req.params.id})
        const r=await patient.findOneAndUpdate({"idAppointment":req.params.id},{idAppointment:null})


        console.log(result)
        console.log("***********************************************")
        console.log(patientr)
        if(patientr!=null){
            res.status(200).json({
                  "msg":"send notification to this user",
                  "userId":patientr.id,
                  "phoneToken":patientr.phoneToken,

            })

        }
        else{
            res.status(200).json({

                msg:"delete success ",
            })
        }

        console.log("_---------------------------------")

    }catch (e) {
        console.log(e.message)
        res.status(404).json(e.message)
    }

}

const updateEventFromDoctor=async (req,res,_)=>{

    try {
        const token=req.headers.authorization.split(" ")[1]
        const resultDecodeJWT=  jwt.decode(token);
        console.log("_---------------------------------")
        console.log(req.params.id)
        const patientr=await patient.findOne({"idAppointment":req.params.id})
       // const r=await patient.findOneAndUpdate({"idAppointment":req.params.id},{idAppointment:null})


        const result=await event.findByIdAndUpdate(req.params.id,{
            startEventTime:req.body.event.startTimeEvent,
            endEventTime:req.body.event.endTimeEvent,
            typeEvent:req.body.event.typeEvent,
            title:req.body.event.titleEvent,
            // taken:{
            //     available:true,
            //     userTake:null,
            // },
            idDoctor:resultDecodeJWT.id

        })
        console.log(result)

        if(patientr!=null){
            res.status(200).json({
                "msg":"send notification to this user",
                "userId":patientr.id,
                "phoneToken":patientr.phoneToken,

            })
        }else{
            res.status(200).json({
                msg:"update  success ",
            })
        }

        console.log("_---------------------------------")

    }catch (e) {
        console.log(e.message)
        res.status(404).json(e.message)
    }

}

const getAllEventInThisDay=async (req,res,_)=>{

    try{
        const token=req.headers.authorization.split(" ")[1]
        const resultDecodeJWT=  jwt.decode(token);

        let nowDate=new Date()


        console.log(nowDate)

        const startDate=new Date(nowDate.getFullYear() , nowDate.getMonth(), nowDate.getDate() , 0,0,0,0,)

        const endDate=new Date(nowDate.getFullYear() , nowDate.getMonth(), nowDate.getDate() , 23,59,59,59,)

        const events=await event.find({$and:[
            {idDoctor:resultDecodeJWT.id}, {startEventTime:{ $gte: startDate, $lte: endDate }},
                {"taken.available":false}

                ]}).populate("taken.patientRef","imgURL id phoneToken").select({_id:true,startEventTime:true,endEventTime:true,title:true,typeEvent:true,taken:true,})

        res.status(200).json(events)
    }catch (e) {
        res.status(400).json({"msg":e.message})

    }

}


const moveEventToHistory=async (req,res,_)=>{

    try{
        console.log(req.body)
        const token=req.headers.authorization.split(" ")[1]
        const resultDecodeJWT=  jwt.decode(token);

        const r=await patient.findOneAndUpdate({"idAppointment":req.body.idEvent},{$set:{idAppointment:null}})

        const eventInfo=await event.findById(req.body.idEvent)
        console.log(eventInfo)

        const deletEvent=await event.findByIdAndDelete(req.body.idEvent)
        console.log(req.body)
        const newEventHistory=new eventHistory({
            idPatient:req.body.idPatient,
            idDoctor:resultDecodeJWT._id,
            startTime:eventInfo.startEventTime,
            endTime:eventInfo.endEventTime,
            isCome:req.body.isCome,
            note:req.body.note,
            idD:req.body.idd,
            idEvent:tmp

        })
        tmp=tmp+1
        console.log("------------------------------------")
        console.log(tmp)
        console.log("------------------------------------")

        await  newEventHistory.save()
        console.log("await  newEventHistory.save()")
        res.status(200).json({
            "msg":"done"
        })


    }
    catch (e) {
        res.status(404).json({
            "msg":e.message
        })
    }
}


export{
    getAllEventToDoctor,
    addNewEvent,
    getEventWhereUserId,
    selectEventForUser,
    getMyEvent,
    getAllAvailableEvent,
    deleteEvent,
    deleteEventFromDoctor,
    updateEventFromDoctor,
    getAllEventInThisDay,
    moveEventToHistory
}