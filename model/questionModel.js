module.exports = (sequelize, DataTypes) => {
    const Question = sequelize.define("question", {
        quesTitle: {
            type: DataTypes.STRING
        },
        quesDescription: {
            type: DataTypes.STRING
        },
        quesImage: {
            type: DataTypes.STRING
        }

    });
    return Question;
};