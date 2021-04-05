import './input-dropdown.scss';
import DropDown from '../../common/DropDown';

const $drop = $('.input-dropdown_js');
if ($drop.length) {
  $drop.each((index, item) => {
    const $interact = $(item).find(
      '.input__field_clicked-js, .button_clicked-js',
    );
    const $par = $(item).find('.input-dropdown__field');
    const listOptions = {
      $elem: $interact,
      $par: $par,
      $list: $drop.find('.input-options'),
      $focus: $par,
      addedClass: 'input-dropdown__field_active',
      aria: true,
    };
    new DropDown(listOptions);
  });
}
