var moment = require("../../moment");


    /**************************************************
      Finnish
     *************************************************/

exports["lang:fi"] = {
    "parse" : function(test) {
        test.expect(96);
        moment.lang('fi');
        var tests = 'tammikuu tam_helmikuu hel_maaliskuu maa_huhtikuu huh_toukokuu tou_kesäkuu kes_heinäkuu hei_elokuu elo_syyskuu syys_lokakuu lok_marraskuu mar_joulukuu jou'.split("_");
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
        moment.lang('fi');
        var a = [
                ['dddd, MMMM Do YYYY, h:mm:ss a',      'sunnuntai, helmikuu 14. 2010, 3:25:50 pm'],
                ['ddd, hA',                            'su, 3PM'],
                ['M Mo MM MMMM MMM',                   '2 2. 02 helmikuu hel'],
                ['YYYY YY',                            '2010 10'],
                ['D Do DD',                            '14 14. 14'],
                ['d do dddd ddd',                      '0 0. sunnuntai su'],
                ['DDD DDDo DDDD',                      '45 45. 045'],
                ['w wo ww',                            '8 8. 08'],
                ['h hh',                               '3 03'],
                ['H HH',                               '15 15'],
                ['m mm',                               '25 25'],
                ['s ss',                               '50 50'],
                ['a A',                                'pm PM'],
                ['vuo\\den DDDo päivä', 'vuoden 45. päivä'],
                ['L',                                  '14.02.2010'],
                ['LL',                                 '14. helmikuuta 2010'],
                ['LLL',                                '14. helmikuuta 2010, klo 15.25'],
                ['LLLL',                               'sunnuntai, 14. helmikuuta 2010, klo 15.25']
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
        moment.lang('fi');
        test.equal(moment([2011, 0, 1]).format('DDDo'), '1.', '1st');
        test.equal(moment([2011, 0, 2]).format('DDDo'), '2.', '2nd');
        test.equal(moment([2011, 0, 3]).format('DDDo'), '3.', '3rd');
        test.equal(moment([2011, 0, 4]).format('DDDo'), '4.', '4th');
        test.equal(moment([2011, 0, 5]).format('DDDo'), '5.', '5th');
        test.equal(moment([2011, 0, 6]).format('DDDo'), '6.', '6th');
        test.equal(moment([2011, 0, 7]).format('DDDo'), '7.', '7th');
        test.equal(moment([2011, 0, 8]).format('DDDo'), '8.', '8th');
        test.equal(moment([2011, 0, 9]).format('DDDo'), '9.', '9th');
        test.equal(moment([2011, 0, 10]).format('DDDo'), '10.', '10th');

        test.equal(moment([2011, 0, 11]).format('DDDo'), '11.', '11th');
        test.equal(moment([2011, 0, 12]).format('DDDo'), '12.', '12th');
        test.equal(moment([2011, 0, 13]).format('DDDo'), '13.', '13th');
        test.equal(moment([2011, 0, 14]).format('DDDo'), '14.', '14th');
        test.equal(moment([2011, 0, 15]).format('DDDo'), '15.', '15th');
        test.equal(moment([2011, 0, 16]).format('DDDo'), '16.', '16th');
        test.equal(moment([2011, 0, 17]).format('DDDo'), '17.', '17th');
        test.equal(moment([2011, 0, 18]).format('DDDo'), '18.', '18th');
        test.equal(moment([2011, 0, 19]).format('DDDo'), '19.', '19th');
        test.equal(moment([2011, 0, 20]).format('DDDo'), '20.', '20th');

        test.equal(moment([2011, 0, 21]).format('DDDo'), '21.', '21st');
        test.equal(moment([2011, 0, 22]).format('DDDo'), '22.', '22nd');
        test.equal(moment([2011, 0, 23]).format('DDDo'), '23.', '23rd');
        test.equal(moment([2011, 0, 24]).format('DDDo'), '24.', '24th');
        test.equal(moment([2011, 0, 25]).format('DDDo'), '25.', '25th');
        test.equal(moment([2011, 0, 26]).format('DDDo'), '26.', '26th');
        test.equal(moment([2011, 0, 27]).format('DDDo'), '27.', '27th');
        test.equal(moment([2011, 0, 28]).format('DDDo'), '28.', '28th');
        test.equal(moment([2011, 0, 29]).format('DDDo'), '29.', '29th');
        test.equal(moment([2011, 0, 30]).format('DDDo'), '30.', '30th');

        test.equal(moment([2011, 0, 31]).format('DDDo'), '31.', '31st');
        test.done();
    },

    "format month" : function(test) {
        test.expect(12);
        moment.lang('fi');
        var expected = 'tammikuu tam_helmikuu hel_maaliskuu maa_huhtikuu huh_toukokuu tou_kesäkuu kes_heinäkuu hei_elokuu elo_syyskuu syy_lokakuu lok_marraskuu mar_joulukuu jou'.split("_");
        var i;
        for (i = 0; i < expected.length; i++) {
            test.equal(moment([2011, i, 1]).format('MMMM MMM'), expected[i], expected[i]);
        }
        test.done();
    },

    "format week" : function(test) {
        test.expect(7);
        moment.lang('fi');
        var expected = 'sunnuntai su_maanantai ma_tiistai ti_keskiviikko ke_torstai to_perjantai pe_lauantai la'.split("_");
        var i;
        for (i = 0; i < expected.length; i++) {
            test.equal(moment([2011, 0, 2 + i]).format('dddd ddd'), expected[i], expected[i]);
        }
        test.done();
    },

    "from" : function(test) {
        test.expect(30);
        moment.lang('fi');
        var start = moment([2007, 1, 28]);
        test.equal(start.from(moment([2007, 1, 28]).add({s:44}), true),  "muutama sekunti", "44 seconds = few seconds");
        test.equal(start.from(moment([2007, 1, 28]).add({s:45}), true),  "minuutti",      "45 seconds = a minute");
        test.equal(start.from(moment([2007, 1, 28]).add({s:89}), true),  "minuutti",      "89 seconds = a minute");
        test.equal(start.from(moment([2007, 1, 28]).add({s:90}), true),  "kaksi minuuttia",     "90 seconds = 2 minutes");
        test.equal(start.from(moment([2007, 1, 28]).add({m:44}), true),  "44 minuuttia",    "44 minutes = 44 minutes");
        test.equal(start.from(moment([2007, 1, 28]).add({m:45}), true),  "tunti",       "45 minutes = an hour");
        test.equal(start.from(moment([2007, 1, 28]).add({m:89}), true),  "tunti",       "89 minutes = an hour");
        test.equal(start.from(moment([2007, 1, 28]).add({m:90}), true),  "kaksi tuntia",       "90 minutes = 2 hours");
        test.equal(start.from(moment([2007, 1, 28]).add({h:5}), true),   "viisi tuntia",       "5 hours = 5 hours");
        test.equal(start.from(moment([2007, 1, 28]).add({h:21}), true),  "21 tuntia",      "21 hours = 21 hours");
        test.equal(start.from(moment([2007, 1, 28]).add({h:22}), true),  "päivä",         "22 hours = a day");
        test.equal(start.from(moment([2007, 1, 28]).add({h:35}), true),  "päivä",         "35 hours = a day");
        test.equal(start.from(moment([2007, 1, 28]).add({h:36}), true),  "kaksi päivää",        "36 hours = 2 days");
        test.equal(start.from(moment([2007, 1, 28]).add({d:1}), true),   "päivä",         "1 day = a day");
        test.equal(start.from(moment([2007, 1, 28]).add({d:5}), true),   "viisi päivää",        "5 days = 5 days");
        test.equal(start.from(moment([2007, 1, 28]).add({d:25}), true),  "25 päivää",       "25 days = 25 days");
        test.equal(start.from(moment([2007, 1, 28]).add({d:26}), true),  "kuukausi",       "26 days = a month");
        test.equal(start.from(moment([2007, 1, 28]).add({d:30}), true),  "kuukausi",       "30 days = a month");
        test.equal(start.from(moment([2007, 1, 28]).add({d:45}), true),  "kuukausi",       "45 days = a month");
        test.equal(start.from(moment([2007, 1, 28]).add({d:46}), true),  "kaksi kuukautta",      "46 days = 2 months");
        test.equal(start.from(moment([2007, 1, 28]).add({d:74}), true),  "kaksi kuukautta",      "75 days = 2 months");
        test.equal(start.from(moment([2007, 1, 28]).add({d:76}), true),  "kolme kuukautta",      "76 days = 3 months");
        test.equal(start.from(moment([2007, 1, 28]).add({M:1}), true),   "kuukausi",       "1 month = a month");
        test.equal(start.from(moment([2007, 1, 28]).add({M:5}), true),   "viisi kuukautta",      "5 months = 5 months");
        test.equal(start.from(moment([2007, 1, 28]).add({d:344}), true), "11 kuukautta",     "344 days = 11 months");
        test.equal(start.from(moment([2007, 1, 28]).add({d:345}), true), "vuosi",        "345 days = a year");
        test.equal(start.from(moment([2007, 1, 28]).add({d:547}), true), "vuosi",        "547 days = a year");
        test.equal(start.from(moment([2007, 1, 28]).add({d:548}), true), "kaksi vuotta",       "548 days = 2 years");
        test.equal(start.from(moment([2007, 1, 28]).add({y:1}), true),   "vuosi",        "1 year = a year");
        test.equal(start.from(moment([2007, 1, 28]).add({y:5}), true),   "viisi vuotta",       "5 years = 5 years");
        test.done();
    },

    "suffix" : function(test) {
        test.expect(2);
        moment.lang('fi');
        test.equal(moment(30000).from(0), "muutaman sekunnin päästä",  "prefix");
        test.equal(moment(0).from(30000), "muutama sekunti sitten", "suffix");
        test.done();
    },

    "now from now" : function(test) {
        test.expect(1);
        moment.lang('fi');
        test.equal(moment().fromNow(), "muutama sekunti sitten",  "now from now should display as in the past");
        test.done();
    },

    "fromNow" : function(test) {
        test.expect(2);
        moment.lang('fi');
        test.equal(moment().add({s:30}).fromNow(), "muutaman sekunnin päästä", "in a few seconds");
        test.equal(moment().add({d:5}).fromNow(), "viiden päivän päästä", "in 5 days");
        test.done();
    },

    "calendar day" : function(test) {
        test.expect(6);
        moment.lang('fi');

        var a = moment().hours(2).minutes(0).seconds(0);

        test.equal(moment(a).calendar(),                     "tänään klo 02.00",     "today at the same time");
        test.equal(moment(a).add({ m: 25 }).calendar(),      "tänään klo 02.25",     "Now plus 25 min");
        test.equal(moment(a).add({ h: 1 }).calendar(),       "tänään klo 03.00",     "Now plus 1 hour");
        test.equal(moment(a).add({ d: 1 }).calendar(),       "huomenna klo 02.00",  "tomorrow at the same time");
        test.equal(moment(a).subtract({ h: 1 }).calendar(),  "tänään klo 01.00",     "Now minus 1 hour");
        test.equal(moment(a).subtract({ d: 1 }).calendar(),  "eilen klo 02.00", "yesterday at the same time");
        test.done();
    },

    "calendar next week" : function(test) {
        test.expect(15);
        moment.lang('fi');

        var i;
        var m;

        for (i = 2; i < 7; i++) {
            m = moment().add({ d: i });
            test.equal(m.calendar(),       m.format('dddd [klo] LT'),  "today + " + i + " days current time");
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            test.equal(m.calendar(),       m.format('dddd [klo] LT'),  "today + " + i + " days beginning of day");
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            test.equal(m.calendar(),       m.format('dddd [klo] LT'),  "today + " + i + " days end of day");
        }
        test.done();
    },

    "calendar last week" : function(test) {
        test.expect(15);
        moment.lang('fi');

        for (var i = 2; i < 7; i++) {
            var m = moment().subtract({ d: i });
            test.equal(m.calendar(),       m.format('[viime] dddd[na] [klo] LT'),  "today - " + i + " days current time");
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            test.equal(m.calendar(),       m.format('[viime] dddd[na] [klo] LT'),  "today - " + i + " days beginning of day");
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            test.equal(m.calendar(),       m.format('[viime] dddd[na] [klo] LT'),  "today - " + i + " days end of day");
        }
        test.done();
    },

    "calendar all else" : function(test) {
        test.expect(4);
        moment.lang('fi');
        var weeksAgo = moment().subtract({ w: 1 });
        var weeksFromNow = moment().add({ w: 1 });

        test.equal(weeksAgo.calendar(),       weeksAgo.format('L'),  "yksi viikko sitten");
        test.equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  "yhden viikon päästä");

        weeksAgo = moment().subtract({ w: 2 });
        weeksFromNow = moment().add({ w: 2 });

        test.equal(weeksAgo.calendar(),       weeksAgo.format('L'),  "kaksi viikkoa sitten");
        test.equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  "kaden viikon päästä");
    test.done();
    }
};