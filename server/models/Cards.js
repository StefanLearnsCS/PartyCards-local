module.exports = (sequelize, DataTypes) => {

    const Cards = sequelize.define("Cards", {
        packId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        prompt: {
            type: DataTypes.STRING(500),
            allowNull: false,
        },
    });

    Cards.associate = models => {
        Cards.belongsTo(models.Posts, {
            foreignKey: 'packId',
            onDelete: 'CASCADE'
        });
    };

    return Cards;
};