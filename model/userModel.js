module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("user", {
        userEmail: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        userPassword: {
            type: DataTypes.STRING,
            allowNull: false
        },
        userName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        otp: {
            type: DataTypes.INTEGER
        }

    });
    return User;
};