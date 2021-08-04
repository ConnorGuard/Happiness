const rankingsDAO = require('../dao/rankings');

class rankingsService{
    async getRankings(rankReq){
        const {year, country} = rankReq;
        const ranks = rankingsDAO.getRankings(year, country);   
        return ranks;
    }
}

module.exports = new rankingsService();