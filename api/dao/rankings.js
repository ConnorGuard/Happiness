const db = require('../db/db');

class RankingsDAO{
    async getRankings(year, country){ 
        let query = db.select('rank', 'country', 'score', 'year').from('rankings'); 

        if(year != null){
            query = query.where("year", year);
        }
        if(country != null){
            query = query.where("country", country);
        }

       return await query;
    }
}

module.exports = new RankingsDAO();