module.exports = function (sequelize, DataTypes) {
    var Post = sequelize.define("zhvis", {
        Zip: {
            type: DataTypes.STRING,
            unique: true,
        },
        City: {
            type: DataTypes.STRING,
        },
        Zhvi: {
            type: DataTypes.INTEGER,
        },
    });
    return Post;
};