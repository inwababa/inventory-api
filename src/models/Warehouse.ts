import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class Warehouse extends Model {
  public id!: number;
  public name!: string;
  public location!: string;
  public capacity!: number;
}

Warehouse.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: new DataTypes.STRING(128),
    allowNull: false,
  },
  location: {
    type: new DataTypes.STRING(255),
    allowNull: false,
  },
  capacity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'warehouses',
  timestamps: true,
});

export default Warehouse;
