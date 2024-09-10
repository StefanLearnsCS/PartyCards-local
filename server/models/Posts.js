module.exports = (sequelize, DataTypes) => {

    const Posts = sequelize.define("Posts", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        postText: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        clickCount: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        instructions: {
            type: DataTypes.TEXT,
            allowNull: true, 
        },
        playerMin: {
            type: DataTypes.INTEGER,
            allowNull: false, 
        },
        playerMax: {
            type: DataTypes.INTEGER,
            allowNull: false, 
        },
    });

    Posts.associate = (models) => {
        Posts.hasMany(models.Likes, {
            onDelete: "cascade",
        });
    };

    return Posts;
};