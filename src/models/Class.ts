import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize';
import User from './User';
import errHelper from '../utils/errorHelper';
import errorTypes from '../utils/errorTypes';

const Class = sequelize.define('Class', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  grade: {
    type: DataTypes.STRING(30),
    allowNull: false
  }
});

User.hasMany(Class, {
  foreignKey: 'teacher_id',
  onDelete: 'CASCADE',
});

Class.beforeCreate(async (value:any) => {
  const findUser: any = await User.findByPk(value.teacher_id);
  if (findUser?.role === 'teacher') {
    value.save();
  } else throw new errHelper(errorTypes.not_found, 'Teacher not found');
});
export default Class;