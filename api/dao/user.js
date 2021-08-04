const db = require('../db/db');

class userDAO{
    async register(email, password){ 
        await db('user').insert({
            email:email,
            password:password
        });
        const [user_id] = await db.select('id').from('user').orderBy('id', 'desc').limit(1);
         await db('profile').insert({
           user_id:user_id.id,
        }); 
        return {"message": "User created"};
    }

    async getUser(email){ 
        const [user] = await db.from('user').where("email",email);
        return user;
    }

    async getPublicProfile(email){ 
        const [profile] = await db.select('email','first_name','last_name').from('user').innerJoin('profile', 'user.id', 'profile.user_id').where("email",email);
        return profile;
    }

    async getPrivateProfile(email){ 
        const [profile] = await db.select('email','first_name','last_name','dob','address').from('user').innerJoin('profile', 'user.id', 'profile.user_id').where("email",email);
        return profile;
    }
    
    async updateProfile(email, first_name, last_name, dob, address){ 
        await db('user').innerJoin('profile', 'user.id', 'profile.user_id').where("email",email).update({
            first_name:first_name,
            last_name:last_name,
            dob:dob,
            address: address
        });
        return;
    }
}

module.exports = new userDAO();