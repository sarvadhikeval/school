import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/sequelize';
import User from './User';

interface AttendanceInterface extends Model{
  id: number,
  date: Date,
  status: 'present' | 'absent',
  student_id: number
}

const Attendance = sequelize.define<AttendanceInterface>('Attendance', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  date: {
    type: DataTypes.STRING,
    defaultValue: DataTypes.NOW,
  },
  status: {
    type: DataTypes.ENUM,
    values: [
      'present',
      'absent',
    ]
  }
}, {
  indexes: [{
    unique: true,
    fields: [ 'student_id', 'date' ],
  }],
});

User.hasMany(Attendance, {
  foreignKey: 'student_id'
});

export default Attendance;