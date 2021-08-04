const countriesService = require('../service/countries')

class CountriesController{
    async getCountries(req, res){
        try{
            //Check for query parameters
            if(Object.keys(req.query).length !==0){
                res.status(400).json(
                    {
                        "error": true,
                        "message": "Invalid query parameters. Query parameters are not permitted."
                    }
                )
                return
            }
            const countries = await countriesService.getCountries();
            res.status(200).end(JSON.stringify(countries).replace(/{\"country\":/gi,"").replace(/}/gi,""));
        }catch(err){
            res.status(500).json(err);
        }
    }
}

module.exports = new CountriesController();