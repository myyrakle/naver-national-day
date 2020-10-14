const axios = require('axios');

async function getHolidayListOfMonth(year, month){
    try{
        const response = await axios.get('https://search.naver.com/p/csearch/content/qapirender.nhn', 
        {params:{where:'nexearch', key:'CalendarAnniversary', pkid:134, q:`${year}년${month}월`}});
        return response.data.openCalendar.daysList.filter(e=>e.nationalDay=='true' && e.thisMonth == 'true' && e.dayOff == 'true').map(e=>(e.solarDate));
    }
    catch(error){
        console.error(error);
        return error;
    }
}

async function getHolidayListOfYear(year){
    const lists = await Promise.all([1,2,3,4,5,6,7,8,9,10,11,12].map(e=>getHolidayListOfMonth(year,e)));
    return lists.flat()
}

module.exports = {getHolidayListOfMonth, getHolidayListOfYear};