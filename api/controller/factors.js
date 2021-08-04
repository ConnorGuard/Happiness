const factorsService = require('../service/factors')
const jwt = require('jsonwebtoken');

class FactorsController{
    async getFactors(req, res){
        try{
            const bearerHeader = req.headers["authorization"];
            if (typeof bearerHeader == 'undefined') {
                res.status(401).json({
                    "error": true,
                    "message": "Authorization header ('Bearer token') not found"
                  });
                return
            }
            jwt.verify(req.token, 'CAB230', async function(err, data){
                if(err){
                    res.status(401).json({
                        "error": true,
                        "message": "JWT token has expired"
                      })
                      return
                }else{
                    //test year format
                    if(!(/^\d{4}$/.test(req.params.year))){
                     res.status(400).json({
                        "error": true,
                        "message": "Invalid year format. Format must be yyyy."
                    });
                    return
                    }
                    const factors = await factorsService.getFactors(req);
                    res.status(200).json(factors);
                }
            });
        }catch(err){
            res.status(500).json(err);
        }
    }
}

module.exports = new FactorsController();