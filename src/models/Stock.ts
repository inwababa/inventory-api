import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import Product from './Product';
import Warehouse from './Warehouse';

class Stock extends Model {
  public id!: number;
  public productId!: number;
  public warehouseId!: number;
  public quantity!: number;
}

Stock.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  productId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    references: {
      model: Product,
      key: 'id',
    },
  },
  warehouseId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    references: {
      model: Warehouse,
      key: 'id',
    },
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'stocks',
  timestamps: true,
});

export default Stock;
