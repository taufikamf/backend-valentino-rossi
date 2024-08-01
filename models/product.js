module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
      name: DataTypes.STRING,
      price: DataTypes.FLOAT,
      merchantId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Merchants',
          key: 'id'
        }
      }
    });
    Product.associate = models => {
        Product.hasMany(models.Order, { foreignKey: 'productId' });
        Product.belongsTo(models.Merchant, { foreignKey: 'merchantId' });
    };
    return Product;
  };
  