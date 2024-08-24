module.exports = (sequelize, DataTypes) => {

    const Users = sequelize.define("Users", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        googleId: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true,
        }
    });

    Users.associate = (models) => {
        Users.hasMany(models.Likes, {
            onDelete: "cascade",
        });

        Users.hasMany(models.Posts, {
            onDelete: "cascade",
        });
    };

    return Users;
};