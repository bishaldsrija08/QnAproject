module.exports = (sequelize, DataTypes) => {
    const Answer = sequelize.define("answer", {
        ansText: {
            type: DataTypes.STRING
        }
    });
    return Answer;
};