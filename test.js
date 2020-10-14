const {getHolidayListOfMonth, getHolidayListOfYear} = require('./index');

(async ()=>{console.log(await getHolidayListOfYear(2021))})();
