const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/the_acme_item_tracker_db');

const { STRING, INTEGER } = Sequelize;

const User = conn.define('user', {
    name: {
        type: STRING
    },
    ranking: {
        type: INTEGER,
        defaultValue: 5
    }
});

const Thing = conn.define('thing', {
    name: {
        type: STRING
    },
    ranking: {
        type: INTEGER,
        defaultValue: 1
    }
});

Thing.belongsTo(User);

Thing.addHook('beforeValidate', (thing) => {
    if (!thing.userId) {
        thing.userId = null;
    }
});

// Don't allow a user to be assigned more than 3 Things.
Thing.beforeUpdate(async (thing, options) => {
    // Get userId that is trying to be added to Thing.
    const { userId } = thing.dataValues;
    // Find all Things associated with userId.
    if (userId) {
        const instances = await Thing.findAll({
            where: {
                userId
            }
        });
        // If there are 3 or more things assigned this userId. Throw an error.
        if (instances.length >= 3) {
            throw new Error("A user can't be assigned more than 3 things!")
        }
    }
})

module.exports = {
    conn,
    User,
    Thing
};
