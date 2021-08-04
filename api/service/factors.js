const factorsDAO = require('../dao/factors');

class factorsService{
    async getFactors(factorsDto,res){
        const{year} = factorsDto.params;
        const{limit, country} = factorsDto.query;
        const factors = factorsDAO.getFactors(year, limit, country);   
        return factors;
    }
}

module.exports = new factorsService();