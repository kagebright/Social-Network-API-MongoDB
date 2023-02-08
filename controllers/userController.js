const { ObjectId } = require('mongoose').Types;
const { User, Thoughts } = require('../models');

//function to get the number of users
const headCount = async () =>
    User.aggregate()
        .count('userCount')
        .then((numberOfUsers) => numberOfUsers);

//Aggregate function for getting the overall user posts 
const post = async(userId) =>
    User.aggregate({
        { $match : {_id: ObjectId(userId) } },
        {
            $unwind: ''
        }
    })

module.exports = {
    //Get all users
    getUsers(req, res) {
        User.find()
            .then(async (users) => {
                const userObj = {
                    users,
                    headcount: await  headCount(),
                };
            })
    }
};