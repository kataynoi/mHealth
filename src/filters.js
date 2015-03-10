
App.filter('toThaiDate', function () {

    return function (t) {
        if (!t || !moment(t).isValid()) {
            return '-';
        } else {
            var year = moment(t).get('year'),
                month = moment(t).get('month') + 1,
                day = moment(t).get('date'),

                newYear = year + 543,
                thaiYear = [day, month, newYear].join('/');

            return thaiYear;
        }
    };

});

App.filter('countAge', function () {

    return function (t) {
        if (!t || !moment(t).isValid()) {
            return '-';
        } else {

               var Age = moment().get('year')-moment(t).get('year');

            return Age;
        }
    };

});

App.filter('sexName', function () {
    return function (sex) {
        return sex == '1' ? 'ชาย' : sex == '2' ? 'หญิง' : 'ไม่ทราบ';
    };
});

App.filter('winBit', function () {
    return function (bit) {
        return bit == 'x64' ? 'Windows 64 bit' : bit == 'ia32' ? 'Windows 32 bit' : 'ไม่ทราบ';
    };
});