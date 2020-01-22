var employeemodel=require('../models/EmployeeModel');
var usersmodel=require('../models/UsersModel');


function viewEmployee() {
    employeemodel.Employee.findAll({
        attributes: ['firstName', 'lastName']
    })
        .then(function (result) {

            res.json(result);
        })
        .catch(function (err) {

        })
}

function fullDetailUser() {
    usersmodel.User.findAll({
       include:[{
           model:employeemodel.Employee,
       }]
    })
    then(User => {
        const resObj = User.map(user => {

            //tidy up the user data
            return Object.assign(
                {},
                {
                    user_id: user.userId,
                    firstname: user.firstName,
                    lastname: user.lastName,
                    gender:user.gender,
                    Employee: user.Employee.map(employee => {

                        //tidy up the post data
                        return Object.assign(
                            {},
                            {
                                employee_id: employee.employee_id,
                                user_id: employee.userId,
                    skill: employee.Skill,
                            }
                        )
                    })
                }
            )
        });
        res.json(resObj)
    });
};
module.exports={
    fullDetailUser
}
