function func(summ, count, promo=null) {
    if (promo === 'ДАРИМ300') {
        if (summ < 300) summ = 0;
        summ -= 300;
    }
    if (count >= 10) summ -= 0.05*summ;
    if (summ >= 50000) {
        summ -= (summ-50000) * 0.2
    }
    if (promo === 'СКИДКА15') {
        if (summ >= 20000) summ -= 0.15 * summ;
    }
    return summ
}

// console.log(func(54000, 10, 'ДАРИМ300'))

export default check_valid;