const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
class Post extends Model {}

      Post.init({
          //id username text title date
          id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
          },
          text: {
            tyoe: DataTypes.STRING,
            allowNull: false
          },
          title: {
            type: DataTypes.STRING,
            allowNull: false
          },
          date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
          },
          user_id: {
            references: {
              model: 'user',
              key: 'id',
            }},
            sequelize,
            freezeTableName: true,
            underscored: true,
            modelName: 'post'
          });
          
          module.exports = Post;




























// module.exports = (sequelize, DataTypes) => {
//     const Post = sequelize.define("Post", {
//       title: {
//         type: DataTypes.STRING,
//         allowNull: false
//       },
//       content: {
//         type: DataTypes.TEXT,
//         allowNull: false
//       },
//       userId: {
//         type: DataTypes.INTEGER,
//         references: {
//           model: "Users",
//           key: "id"
//         }
//       }
//     });
  
//     Post.associate = models => {
//       Post.belongsTo(models.User, { foreignKey: "userId" });
//       Post.hasMany(models.Comment, { foreignKey: "postId" });
//     };
  
//     return Post;
//   };
  