const Sequelize = require('sequelize');
const db = require('../config/database');

const User = db.define('user', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true
    },
    name: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});

module.exports = User;