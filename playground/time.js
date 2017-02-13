var moment = require('moment');

// var date = new Date();
// var months = ['Jan', 'Feb'];
// console.log(months[date.getMonth()]);

// var date = moment();
// date.add(14, 'years').subtract(102, 'months');
// console.log(date.format('MMM Do, YYYY'));

// var someTimestamp

var createdAt = 12345;
var date = moment(createdAt);
console.log(date.format('h.mma'));
