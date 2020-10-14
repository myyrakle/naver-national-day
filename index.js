const axios = require('axios');

async function getNationalDay(year, month){
    try{
        if(month){
            const response = axios.get('https://search.naver.com/p/csearch/content/qapirender.nhn', 
            {params:{where:nexearch, key:CalendarAnniversary, pkid:134}});
        }
    }
    catch(error){
        console.error(error);
        return error;
    }
}

module.exports = {getNationalDay};