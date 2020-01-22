var Sequelize = require('sequelize');

var sequelize = new Sequelize('Job_Portal', 'root', 'rajib',{
    host: 'localhost',
    dialect: 'mysql',
    logging:false
});

sequelize.authenticate()
    .then(function()  {
         console.log('Database Connection has been established successfully.');
    })
    .catch(function (err) {
        console.log('Unable to connect to the database:', err);
    });
module.exports={
    Sequelize,
    sequelize,

}