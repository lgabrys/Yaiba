var moment = require("../../moment");


    /**************************************************
      Icelandic
     *************************************************/

exports["lang:is"] = {
    "parse" : function(test) {
        test.expect(96);
        moment.lang('is');
        var tests = 'janúar jan_febrúar feb_mars mar_apríl apr_maí maí_júní jún_júlí júl_ágúst ágú_september sep_október okt_nóvember nóv_desember des'.split("_");
        var i;
        function equalTest(input, mmm, i) {
            test.equal(moment(input, mmm).month(), i, input + ' should be month ' + (i + 1));
        }
        for (i = 0; i < 12; i++) {
            tests[i] = tests[i].split(' ');
            equalTest(tests[i][0], 'MMM', i);
            equalTest(tests[i][1], 'MMM', i);
            equalTest(tests[i][0], 'MMMM', i);
            equalTest(tests[i][1], 'MMMM', i);
            equalTest(tests[i][0].toLocaleLowerCase(), 'MMMM', i);
            equalTest(tests[i][1].toLocaleLowerCase(), 'MMMM', i);
            equalTest(tests[i][0].toLocaleUpperCase(), 'MMMM', i);
            equalTest(tests[i][1].toLocaleUpperCase(), 'MMMM', i);
        }
        test.done();
    },

    "format" : function(test) {
        test.expect(18);
        moment.lang('is');
        var a = [
                ['dddd, Do MMMM YYYY, h:mm:ss a',      'sunnudagur, 14. febrúar 2010, 3:25:50 pm'],
                ['ddd, hA',                            'sun, 3PM'],
                ['M Mo MM MMMM MMM',                   '2 2. 02 febrúar feb'],
                ['YYYY YY',                            '2010 10'],
                ['D Do DD',                            '14 14. 14'],
                ['d do dddd ddd',                      '0 0. sunnudagur sun'],
                ['DDD DDDo DDDD',                      '45 45. 045'],
                ['w wo ww',                            '8 8. 08'],
                ['h hh',                               '3 03'],
                ['H HH',                               '15 15'],
                ['m mm',                               '25 25'],
                ['s ss',                               '50 50'],
                ['a A',                                'pm PM'],
                ['t\\he DDDo \\d\\ay of t\\he ye\\ar', 'the 45. day of the year'],
                ['L',                                  '14/02/2010'],
                ['LL',                                 '14. febrúar 2010'],
                ['LLL',                                '14. febrúar 2010 kl. 15:25'],
                ['LLLL',                               'sunnudagur, 14. febrúar 2010 kl. 15:25']
            ],
            b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
            i;
        for (i = 0; i < a.length; i++) {
            test.equal(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
        }
        test.done();
    },

    "format ordinal" : function(test) {
        test.expect(31);
        moment.lang('is');
        test.equal(moment([2011, 0, 1]).format('DDDo'), '1.', '1.');
        test.equal(moment([2011, 0, 2]).format('DDDo'), '2.', '2.');
        test.equal(moment([2011, 0, 3]).format('DDDo'), '3.', '3.');
        test.equal(moment([2011, 0, 4]).format('DDDo'), '4.', '4.');
        test.equal(moment([2011, 0, 5]).format('DDDo'), '5.', '5.');
        test.equal(moment([2011, 0, 6]).format('DDDo'), '6.', '6.');
        test.equal(moment([2011, 0, 7]).format('DDDo'), '7.', '7.');
        test.equal(moment([2011, 0, 8]).format('DDDo'), '8.', '8.');
        test.equal(moment([2011, 0, 9]).format('DDDo'), '9.', '9.');
        test.equal(moment([2011, 0, 10]).format('DDDo'), '10.', '10.');
    
        test.equal(moment([2011, 0, 11]).format('DDDo'), '11.', '11.');
        test.equal(moment([2011, 0, 12]).format('DDDo'), '12.', '12.');
        test.equal(moment([2011, 0, 13]).format('DDDo'), '13.', '13.');
        test.equal(moment([2011, 0, 14]).format('DDDo'), '14.', '14.');
        test.equal(moment([2011, 0, 15]).format('DDDo'), '15.', '15.');
        test.equal(moment([2011, 0, 16]).format('DDDo'), '16.', '16.');
        test.equal(moment([2011, 0, 17]).format('DDDo'), '17.', '17.');
        test.equal(moment([2011, 0, 18]).format('DDDo'), '18.', '18.');
        test.equal(moment([2011, 0, 19]).format('DDDo'), '19.', '19.');
        test.equal(moment([2011, 0, 20]).format('DDDo'), '20.', '20.');
    
        test.equal(moment([2011, 0, 21]).format('DDDo'), '21.', '21.');
        test.equal(moment([2011, 0, 22]).format('DDDo'), '22.', '22.');
        test.equal(moment([2011, 0, 23]).format('DDDo'), '23.', '23.');
        test.equal(moment([2011, 0, 24]).format('DDDo'), '24.', '24.');
        test.equal(moment([2011, 0, 25]).format('DDDo'), '25.', '25.');
        test.equal(moment([2011, 0, 26]).format('DDDo'), '26.', '26.');
        test.equal(moment([2011, 0, 27]).format('DDDo'), '27.', '27.');
        test.equal(moment([2011, 0, 28]).format('DDDo'), '28.', '28.');
        test.equal(moment([2011, 0, 29]).format('DDDo'), '29.', '29.');
        test.equal(moment([2011, 0, 30]).format('DDDo'), '30.', '30.');
    
        test.equal(moment([2011, 0, 31]).format('DDDo'), '31.', '31.');
        test.done();
    },

    "format month" : function(test) {
        test.expect(12);
        moment.lang('is');
        var expected = 'janúar jan_febrúar feb_mars mar_apríl apr_maí maí_júní jún_júlí júl_ágúst ágú_september sep_október okt_nóvember nóv_desember des'.split("_");
        var i;
        for (i = 0; i < expected.length; i++) {
            test.equal(moment([2011, i, 1]).format('MMMM MMM'), expected[i], expected[i]);
        }
        test.done();
    },

    "format week" : function(test) {
        test.expect(7);
        moment.lang('is');
        var expected = 'sunnudagur sun_mánudagur mán_þriðjudagur þri_miðvikudagur mið_fimmtudagur fim_föstudagur fös_laugardagur lau'.split("_");
        var i;
        for (i = 0; i < expected.length; i++) {
            test.equal(moment([2011, 0, 2 + i]).format('dddd ddd'), expected[i], expected[i]);
        }
        test.done();
    },

    "from" : function(test) {
        test.expect(34);
        moment.lang('is');
        var start = moment([2007, 1, 28]);
        test.equal(start.from(moment([2007, 1, 28]).add({s:44}), true),  "nokkrar sekúndur", "44 seconds = a few seconds");
        test.equal(start.from(moment([2007, 1, 28]).add({s:45}), true),  "mínúta",      "45 seconds = a minute");
        test.equal(start.from(moment([2007, 1, 28]).add({s:89}), true),  "mínúta",      "89 seconds = a minute");
        test.equal(start.from(moment([2007, 1, 28]).add({s:90}), true),  "2 mínútur",     "90 seconds = 2 minutes");
        test.equal(start.from(moment([2007, 1, 28]).add({m:44}), true),  "44 mínútur",    "44 minutes = 44 minutes");
        test.equal(start.from(moment([2007, 1, 28]).add({m:21}), true),  "21 mínúta",    "21 minutes = 21 minutes");
        test.equal(start.from(moment([2007, 1, 28]).add({m:45}), true),  "klukkustund",       "45 minutes = an hour");
        test.equal(start.from(moment([2007, 1, 28]).add({m:89}), true),  "klukkustund",       "89 minutes = an hour");
        test.equal(start.from(moment([2007, 1, 28]).add({m:90}), true),  "2 klukkustundir",       "90 minutes = 2 hours");
        test.equal(start.from(moment([2007, 1, 28]).add({h:5}), true),   "5 klukkustundir",       "5 hours = 5 hours");
        test.equal(start.from(moment([2007, 1, 28]).add({h:21}), true),  "21 klukkustund",      "21 hours = 21 hours");
        test.equal(start.from(moment([2007, 1, 28]).add({h:22}), true),  "dagur",         "22 hours = a day");
        test.equal(start.from(moment([2007, 1, 28]).add({h:35}), true),  "dagur",         "35 hours = a day");
        test.equal(start.from(moment([2007, 1, 28]).add({h:36}), true),  "2 dagar",        "36 hours = 2 days");
        test.equal(start.from(moment([2007, 1, 28]).add({d:1}), true),   "dagur",         "1 day = a day");
        test.equal(start.from(moment([2007, 1, 28]).add({d:5}), true),   "5 dagar",        "5 days = 5 days");
        test.equal(start.from(moment([2007, 1, 28]).add({d:25}), true),  "25 dagar",       "25 days = 25 days");
        test.equal(start.from(moment([2007, 1, 28]).add({d:11}), true),  "11 dagar",       "11 days = 11 days");
        test.equal(start.from(moment([2007, 1, 28]).add({d:21}), true),  "21 dagur",       "21 days = 21 days");
        test.equal(start.from(moment([2007, 1, 28]).add({d:26}), true),  "mánuður",       "26 days = a month");
        test.equal(start.from(moment([2007, 1, 28]).add({d:30}), true),  "mánuður",       "30 days = a month");
        test.equal(start.from(moment([2007, 1, 28]).add({d:45}), true),  "mánuður",       "45 days = a month");
        test.equal(start.from(moment([2007, 1, 28]).add({d:46}), true),  "2 mánuðir",      "46 days = 2 months");
        test.equal(start.from(moment([2007, 1, 28]).add({d:74}), true),  "2 mánuðir",      "75 days = 2 months");
        test.equal(start.from(moment([2007, 1, 28]).add({d:76}), true),  "3 mánuðir",      "76 days = 3 months");
        test.equal(start.from(moment([2007, 1, 28]).add({M:1}), true),   "mánuður",       "1 month = a month");
        test.equal(start.from(moment([2007, 1, 28]).add({M:5}), true),   "5 mánuðir",      "5 months = 5 months");
        test.equal(start.from(moment([2007, 1, 28]).add({d:344}), true), "11 mánuðir",     "344 days = 11 months");
        test.equal(start.from(moment([2007, 1, 28]).add({d:345}), true), "ár",        "345 days = a year");
        test.equal(start.from(moment([2007, 1, 28]).add({d:547}), true), "ár",        "547 days = a year");
        test.equal(start.from(moment([2007, 1, 28]).add({d:548}), true), "2 ár",       "548 days = 2 years");
        test.equal(start.from(moment([2007, 1, 28]).add({y:1}), true),   "ár",        "1 year = a year");
        test.equal(start.from(moment([2007, 1, 28]).add({y:5}), true),   "5 ár",       "5 years = 5 years");
        test.equal(start.from(moment([2007, 1, 28]).add({y:21}), true),  "21 ár",       "21 years = 21 years");
        test.done();
    },

    "suffix" : function(test) {
        test.expect(3);
        moment.lang('is');
        test.equal(moment(30000).from(0), "eftir nokkrar sekúndur",  "prefix");
        test.equal(moment(0).from(30000), "fyrir nokkrum sekúndum síðan", "suffix");
        test.equal(moment().subtract({m:1}).fromNow(), "fyrir mínútu síðan", "a minute ago");
        test.done();
    },

    "now from now" : function(test) {
        test.expect(1);
        moment.lang('is');
        test.equal(moment().fromNow(), "fyrir nokkrum sekúndum síðan",  "now from now should display as in the past");
        test.done();
    },

    "fromNow" : function(test) {
        test.expect(3);
        moment.lang('is');
        test.equal(moment().add({s:30}).fromNow(), "eftir nokkrar sekúndur", "in a few seconds");
        test.equal(moment().add({m:1}).fromNow(), "eftir mínútu", "in a minute");
        test.equal(moment().add({d:5}).fromNow(), "eftir 5 daga", "in 5 days");
        test.done();
    },

    "calendar day" : function(test) {
        test.expect(6);
        moment.lang('is');
    
        var a = moment().hours(2).minutes(0).seconds(0);
    
        test.equal(moment(a).calendar(),                     "í dag kl. 2:00",     "today at the same time");
        test.equal(moment(a).add({ m: 25 }).calendar(),      "í dag kl. 2:25",     "Now plus 25 min");
        test.equal(moment(a).add({ h: 1 }).calendar(),       "í dag kl. 3:00",     "Now plus 1 hour");
        test.equal(moment(a).add({ d: 1 }).calendar(),       "á morgun kl. 2:00",  "tomorrow at the same time");
        test.equal(moment(a).subtract({ h: 1 }).calendar(),  "í dag kl. 1:00",     "Now minus 1 hour");
        test.equal(moment(a).subtract({ d: 1 }).calendar(),  "í gær kl. 2:00", "yesterday at the same time");
        test.done();
    },

    "calendar next week" : function(test) {
        test.expect(15);
        moment.lang('is');
    
        var i;
        var m;
    
        for (i = 2; i < 7; i++) {
            m = moment().add({ d: i });
            test.equal(m.calendar(),       m.format('dddd [kl.] LT'),  "Today + " + i + " days current time");
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            test.equal(m.calendar(),       m.format('dddd [kl.] LT'),  "Today + " + i + " days beginning of day");
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            test.equal(m.calendar(),       m.format('dddd [kl.] LT'),  "Today + " + i + " days end of day");
        }
        test.done();
    },

    "calendar last week" : function(test) {
        test.expect(15);
        moment.lang('is');
    
        for (i = 2; i < 7; i++) {
            m = moment().subtract({ d: i });
            test.equal(m.calendar(),       m.format('[síðasta] dddd [kl.] LT'),  "Today - " + i + " days current time");
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            test.equal(m.calendar(),       m.format('[síðasta] dddd [kl.] LT'),  "Today - " + i + " days beginning of day");
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            test.equal(m.calendar(),       m.format('[síðasta] dddd [kl.] LT'),  "Today - " + i + " days end of day");
        }
        test.done();
    },

    "calendar all else" : function(test) {
        test.expect(4);
        moment.lang('is');
        var weeksAgo = moment().subtract({ w: 1 });
        var weeksFromNow = moment().add({ w: 1 });
        
        test.equal(weeksAgo.calendar(),       weeksAgo.format('L'),  "1 week ago");
        test.equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  "in 1 week");
    
        weeksAgo = moment().subtract({ w: 2 });
        weeksFromNow = moment().add({ w: 2 });
        
        test.equal(weeksAgo.calendar(),       weeksAgo.format('L'),  "2 weeks ago");
        test.equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  "in 2 weeks");
    test.done();
    }
};
