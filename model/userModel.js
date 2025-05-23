module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("user", {
        userEmail: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        userPassword: {
            type: DataTypes.STRING,
            allowNull: false
        },
        userName: {
            type: DataTypes.STRING,
            allowNull: false
        }

    });
    return User;
};