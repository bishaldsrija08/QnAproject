const dbConfig = require("../config/dbConfig");
const { Sequelize, DataTypes } = require("sequelize");

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
db.blogs = require("./userModel")(sequelize, DataTypes);

//dB migration code here
db.sequelize.sync({ force: false }).then(() => {
    console.log("yes re-sync done");
});

module.exports = db;