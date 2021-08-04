const rankingsService = require('../service/rankings')

class RankingsController{
    async getRankings(req, res){
        try{
            //test for numbers
            if(/\d/.test(req.query.country)){
                res.status(400).json({
                    "error": true,
                    "message": "Invalid country format. Country query parameter cannot contain numbers."
                });
                return
            }
            //query
            const rankings = await rankingsService.getRankings(req.query);
            //respond
            res.status(200).json(rankings);
        }catch(err){
            res.status(500).json(err);
        }
    }
}

module.exports = new RankingsController();