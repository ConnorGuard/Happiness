const db = require('../db/db');

class factorsdDAO{
    async getFactors(year, limit, country){     
        let query = db.select("rank",
        "country",
        "score",
        "economy",
        "family",
        "health",
        "freedom",
        "generosity",
        "trust").from('rankings').where("year",year);
        if(country !==undefined) query = query.where("country",country);
        if(limit !==undefined) query = query.limit(limit);
        return await query;
    }
}

module.exports = new factorsdDAO();