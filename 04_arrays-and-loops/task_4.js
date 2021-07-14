let days_week = ['понедельник','вторник','среда','четверг','пятница','суббота','воскресенье'];
let k = 6;
for (let day_month = 1;day_month<=31;++day_month) {
    console.log(`${day_month} января, ${days_week[k]}`);
    k += 1;
    if (k === 7) k = 0;
}