const userDAO = require('../dao/user');
const bcrypt = require('bcrypt');

class UserService{

    async Register(regDto, res){
        const {email, password} = regDto; 
        const hash = await bcrypt.hash(password, 10);
        return userDAO.register(email, hash);
    }

    async getUser(loginDto, res){
        const {email} = loginDto; 
        return  userDAO.getUser(email);
    }

    async getPrivateProfile(profileDto, res){
        const {email} = profileDto; 
        return  userDAO.getPrivateProfile(email);
    }

    async getPublicProfile(profileDto, res){
        const {email} = profileDto; 
        return  userDAO.getPublicProfile(email);
    }

    async updateProfile(profileDto, res){
        const email = profileDto.params.email;
        const {first_name, last_name, dob, address} = profileDto.body;
        //update
        await userDAO.updateProfile(email, first_name, last_name, dob, address);
        //get
        return  userDAO.getPrivateProfile(email);
    }
}

module.exports = new UserService();