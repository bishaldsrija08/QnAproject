module.exports = (sequelize, DataTypes) => {
    const Blog = sequelize.define("blog", {
        blogTitle: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        blogDescription: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        blogAuthor: {
            type: DataTypes.STRING,
            allowNull: false
        }


    });
    return Blog;
};