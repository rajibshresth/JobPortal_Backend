var bookmodel=require('../models/BookemployeeModel');

function bookDetail(req,res,next){
    bookmodel.Book.create({
        hirerid:req.body.hirerid,
        hirerfirstName:req.body.hirerfirstName,
        hirerlastName:req.body.hirerlastName,
        hirerphone:req.body.hirerphone,
        hireraddress:req.body.hireraddress,
        hireremail:req.body.hireremail,
        hirerimage:req.body.hirerimage,
        employeeId:req.body.employeeId,
        userId:req.body.userId,
        Skill:req.body.Skill,
        Experiance:req.body.Experiance,
        JobCompleted:req.body.JobCompleted,
        Language:req.body.Language,
        Payment:req.body.Payment,
        Working:req.body.Working,
        Cost:req.body.Cost,
        Available:req.body.Available,
        image:req.body.image,
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        phone:req.body.phone,
        address:req.body.address,
        email:req.body.email,
        gender:req.body.gender,
        status:req.body.status


    })
        .then(function (result) {
            // console.log(result);
            next();
        })
        .catch(function (err) {
            // console.log(err);
            next({"status":500,"message":"DB errors"})

        })
}

module.exports={
bookDetail
}
