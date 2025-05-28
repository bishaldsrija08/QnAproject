const dbConfig = require("../config/dbConfig");
const { Sequelize, DataTypes } = require("sequelize");
const userModel = require("./userModel");
const questionModel = require("./questionModel");
const answerModel = require("./answerModel");

// la sequelize yo config haru lag ani database connect gardey vaneko hae 
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    port: 3306,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle,
    },
});

sequelize
    .authenticate()
    .then(() => {
        console.log("CONNECTED!!");
    })
    .catch((err) => {
        console.log("Error" + err);
    });

const db = {}; // euta empty object banako

db.Sequelize = Sequelize; //db vanni object ma Sequelize vanni key ma Sequelize value lai rakheko
db.sequelize = sequelize;

// importing model files 
db.Users = userModel(sequelize, DataTypes);
db.Questions = questionModel(sequelize, DataTypes);
db.Answers = answerModel(sequelize, DataTypes)

//Tabels relations
db.Users.hasMany(db.Questions)
db.Questions.belongsTo(db.Users)

db.Questions.hasMany(db.Answers)
db.Answers.belongsTo(db.Questions)

db.Users.hasMany(db.Answers)
db.Answers.belongsTo(db.Users)

//dB migration code here
db.sequelize.sync({ alter: false }).then(() => {
    console.log("yes re-sync done");
});

module.exports = db;