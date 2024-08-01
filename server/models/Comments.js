module.exports = (sequelize, DataTypes) => {

    const Comments = sequelize.define("Comments", {
        packId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        commentText: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },

    });

    Comments.associate = models => {
        Comments.belongsTo(models.Posts, {
            foreignKey: 'packId',
            onDelete: 'CASCADE'
        });
    };

    return Comments;
};