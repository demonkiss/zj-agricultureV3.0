//>>built
(function(b,a){"object"===typeof exports&&"undefined"!==typeof module&&"function"===typeof require?a(require("../moment")):"function"===typeof define&&define.amd?define("moment/locale/ro",["../moment"],a):a(b.moment)})(this,function(b){function a(a,b,c){b=" ";if(20<=a%100||100<=a&&0===a%100)b=" de ";return a+b+{mm:"minute",hh:"ore",dd:"zile",MM:"luni",yy:"ani"}[c]}return b.defineLocale("ro",{months:"ianuarie februarie martie aprilie mai iunie iulie august septembrie octombrie noiembrie decembrie".split(" "),
monthsShort:"ian. febr. mart. apr. mai iun. iul. aug. sept. oct. nov. dec.".split(" "),weekdays:"duminic\u0103 luni mar\u021bi miercuri joi vineri s\u00e2mb\u0103t\u0103".split(" "),weekdaysShort:"Dum Lun Mar Mie Joi Vin S\u00e2m".split(" "),weekdaysMin:"Du Lu Ma Mi Jo Vi S\u00e2".split(" "),longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"DD.MM.YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY H:mm",LLLL:"dddd, D MMMM YYYY H:mm"},calendar:{sameDay:"[azi la] LT",nextDay:"[m\u00e2ine la] LT",nextWeek:"dddd [la] LT",
lastDay:"[ieri la] LT",lastWeek:"[fosta] dddd [la] LT",sameElse:"L"},relativeTime:{future:"peste %s",past:"%s \u00een urm\u0103",s:"c\u00e2teva secunde",m:"un minut",mm:a,h:"o or\u0103",hh:a,d:"o zi",dd:a,M:"o lun\u0103",MM:a,y:"un an",yy:a},week:{dow:1,doy:7}})});