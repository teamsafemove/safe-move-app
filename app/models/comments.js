module.exports = function (sequelize, DataTypes) {
    var Post = sequelize.define("comments", {
        Comment: {
            type: DataTypes.STRING,
            len: [1, 150],
            allowNull: false
        },
        City: {
            type: DataTypes.STRING,
        }
    });
    return Post;
};