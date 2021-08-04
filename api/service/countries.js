const countriesDAO = require('../dao/countries');

class countriesService{
    async getCountries(){
        const countries = countriesDAO.getCountries();   
        return countries;
    }
}

module.exports = new countriesService();