const db = require('../db/db');

class CountriesDAO{
    async getCountries(){ 
        const countries = await db.distinct('country').from('rankings').orderBy('country'); 
        return countries;
    }
}

module.exports = new CountriesDAO();