const axios = require('axios');

async function getHolidayListImpl(year, month){
    const LINK = 'https://search.naver.com/p/csearch/content/qapirender.nhn';

    const response = await axios.get(LINK, 
        {
            params:{
                where:'nexearch', 
                key:'CalendarAnniversary', 
                pkid:134, 
                q:`${year}년${month}월`
            }
        }
    );
    return response.data.openCalendar.daysList.filter(e=>e.nationalDay=='true' && e.thisMonth == 'true' && e.dayOff == 'true').map(e=>(e.solarDate));
}

async function getHolidayList(year, month){
    if(!year){
        new Error("year parameter not passed");
    }

    if(String(year).split('').every(e=>['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(e)) == false){
        new Error("The year value is not valid.");
    }

   if(month){
       month = parseInt(month);
       if(isNaN(month) || month<=0 || month>12){
        new Error("The month value is not valid.");
       }
       return await getHolidayListImpl(year, month);
   }
   else {
       const lists = await Promise.all([1,2,3,4,5,6,7,8,9,10,11,12].map(e=>getHolidayListImpl(year,e)));
       return lists.flat();
   }
    
}

module.exports = {getHolidayList};