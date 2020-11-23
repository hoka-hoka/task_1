import multirange from '../../../js/multiRange';

if (document.body.id === 'product') {
  let range = document.querySelector('.input-range_pull-js');
  if (range) {
    let inputRange = range.querySelector('.input-range__field');
    let priceElem = range.querySelector('.input-range__price');
    multirange(inputRange, priceElem, '5000');
  }
}
