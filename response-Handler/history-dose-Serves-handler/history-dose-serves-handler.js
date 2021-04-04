import doseHistory from "../../model/doseHistory.js"
import jwt from "jsonwebtoken";

const getHistoryDosesToDoctor=async (req,res,_)=>{




    try {
        const toFindNumberOfDays=new Date(Number(req.params['year']),Number(req.params['month']),0,0,0,0,0)

        const startDate1=new Date(Number(req.params['year']),Number(req.params['month'])-1,0,0,0,0,0)
        const endDate1=new Date(Number(req.params['year']),Number(req.params['month'])-1,toFindNumberOfDays.getDate(),23,59,59,59)

        let resultReading=await doseHistory.find({
            $and:[
                 {$or:[
                    {$and:
                        [
                            {
                                startDate:
                                    {$gte:startDate1 }
                            },
                            {
                                endDate:
                                    {$lte: endDate1 }
                            }
                        ]
                    },
                    {$and:[
                            {
                                startDate: {$lte:startDate1  },
                            },
                            {endDate:
                                    {$gte:startDate1  },
                            },
                        ],},
                    {endDate: { $gte: startDate1, $lte: endDate1 },},
                    {startDate: { $gte: startDate1, $lte: endDate1 },}
                ]
            },{"doseItem.idPatient":req.params.id},]})




        console.log(resultReading)
        res.status(200).json(resultReading)
    }
    catch (e) {
        console.log(e.message)
        res.status(404).json({
            msg:"error"
        })
    }




}

const getDoseHistoryToPatient=async (req,res,_)=>{


    try {
        const resultDecodeJWT= await jwt.decode(req.headers["x-auth-token"]);
        const toFindNumberOfDays=new Date(2021,req.params.month,0,0,0,0,0)

        const startDate1=new Date(2021,Number(req.params.month)-1,0,0,0,0,0)
        const endDate1=new Date(2021,Number(req.params.month)-1,toFindNumberOfDays.getDate(),23,59,59,59)

        let resultReading=await doseHistory.find({
            $and:[
                {$or:[
                        {$and:
                                [
                                    {
                                        startDate:
                                            {$gte:startDate1 }
                                    },
                                    {
                                        endDate:
                                            {$lte: endDate1 }
                                    }
                                ]
                        },
                        {$and:[
                                {
                                    startDate: {$lte:startDate1  },
                                },
                                {endDate:
                                        {$gte:startDate1  },
                                },
                            ],},
                        {endDate: { $gte: startDate1, $lte: endDate1 },},
                        {startDate: { $gte: startDate1, $lte: endDate1 },}
                    ]
                },{"doseItem.idPatient":resultDecodeJWT.id},]}).sort({startDate:1})

        let result=[]
        let id=1



        let startDate//=new Date(resultReading[index]["startDate"])
        let endDate
        for(var index=0;index<resultReading.length;index++){
            startDate=new Date(resultReading[index]["startDate"])
            endDate=new Date(resultReading[index]["endDate"])

            for(var i=0;i<resultReading[index]["doseItem"]["inject"].length;i++){

                if(resultReading[index]["doseItem"]["inject"][i]["flag"]=="0"){
                    result.push({
                        "الرقم":id++,
                        "نوع العلاج":resultReading[index]["doseItem"]["inject"][i]["typeOfinj"],
                        "الكمية":resultReading[index]["doseItem"]["inject"][i]["amountOfinj"],
                        "وقت الجرعة":resultReading[index]["doseItem"]["inject"][i]["dateOfMed"],
                        "من":startDate.getUTCDate()+"-"+(startDate.getMonth()+1)+"-"+startDate.getFullYear(),
                        "الى":endDate.getUTCDate()+"-"+(endDate.getMonth()+1)+"-"+endDate.getFullYear(),
                    })
                }
                else if(resultReading[index]["doseItem"]["inject"][i]["flag"]=="1"){

                    result.push({
                        "الرقم":id++,
                        "نوع العلاج":resultReading[index]["doseItem"]["inject"][i]["typeOfBill"],
                        "الكمية":resultReading[index]["doseItem"]["inject"][i]["amountOfBill"],
                        "وقت الجرعة":resultReading[index]["doseItem"]["inject"][i]["dateOfMed"],
                        "من":startDate.getUTCDate()+"-"+(startDate.getMonth()+1)+"-"+startDate.getFullYear(),
                        "الى":endDate.getUTCDate()+"-"+(endDate.getMonth()+1)+"-"+endDate.getFullYear(),
                    })

                }
                else if(resultReading[index]["doseItem"]["inject"][i]["flag"]=="2"){
                    result.push({
                        "الرقم":id++,
                        "نوع العلاج":resultReading[index]["doseItem"]["inject"][i]["typeOfinj"],
                        "الكمية":resultReading[index]["doseItem"]["inject"][i]["amountOfinj"],
                        "وقت الجرعة":resultReading[index]["doseItem"]["inject"][i]["dateOfMed"],
                        "من":startDate.getUTCDate()+"-"+(startDate.getMonth()+1)+"-"+startDate.getFullYear(),
                        "الى":endDate.getUTCDate()+"-"+(endDate.getMonth()+1)+"-"+endDate.getFullYear(),
                    })
                    result.push({
                        "الرقم":id++,
                        "نوع العلاج":resultReading[index]["doseItem"]["inject"][i]["typeOfBill"],
                        "الكمية":resultReading[index]["doseItem"]["inject"][i]["amountOfBill"],
                        "وقت الجرعة":resultReading[index]["doseItem"]["inject"][i]["dateOfMed"],
                        "من":startDate.getUTCDate()+"-"+(startDate.getMonth()+1)+"-"+startDate.getFullYear(),
                        "الى":endDate.getUTCDate()+"-"+(endDate.getMonth()+1)+"-"+endDate.getFullYear(),

                    })
                }
            }

        }

        if(resultReading.length==0){
            res.status(201).json(result)
        }else{
            console.log(resultReading)
            res.status(200).json(result)
        }

    }
    catch (e) {
        console.log(e.message)
        res.status(404).json({
            msg:"error"
        })
    }


}

export{
    getHistoryDosesToDoctor,
    getDoseHistoryToPatient
}