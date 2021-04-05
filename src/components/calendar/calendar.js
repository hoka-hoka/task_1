import './calendar.scss';
import Sibling from '../../common/Sibling';
import createCalendar from '../../common/createCalendar';
import { month } from '../../js/constants';

const $date = $('.input-date__field_js');

if ($date.length) {
  $date.each((_, item) => {
    const $interact = $(item).find(
      '.input__field_clicked-js, .button_clicked-js',
    );

    $(item).on('click', () => {
      const calendar = Sibling.getOlderSibling({
        iter: 2,
        $elem: $(item),
        find: 'calendar',
      });
      if (calendar.length) {
        createCalendar(calendar.get(0));
      }
    });
  });
}

const calendarDay = document.querySelectorAll('.input-date_js');
const btn = document.querySelectorAll('.calendar .button_purple');

if (document.body.id === 'form') {
  let calendar = document.querySelector(
    '.uikit-forms__calendar_create-js>.calendar',
  );
  if (calendar) {
    calendar.style.display = 'block';
    createCalendar(calendar);
  }
}

if (btn.length) {
  btn[0].addEventListener('click', (event) => {
    clearDate(calendarDay);
  });

  btn[1].addEventListener('click', (event) => {
    clearDate(calendarDay);
    let tdActive = document.querySelectorAll(
      '.calendar__day-num.calendar__day-num_active',
    );
    tdActive.forEach((v, i, arr) => {
      let checkDate = Sibling.getOlderSibling({
        iter: 4,
        $elem: $(v),
        find: 'calendar__month',
      });
      if (!checkDate) {
        return;
      }
      checkDate = checkDate.get(0).innerHTML.split(' ');
      let day = new Date(
        checkDate[1],
        month.indexOf(checkDate[0]),
        v.innerText,
      );
      if (calendarDay.length !== 1) {
        if (arr.length === 1) {
          [...calendarDay].map((num) => {
            return (num.value = day
              .toLocaleString('ru')
              .slice(0, 10)
              .split('.')
              .reverse()
              .join('-'));
          });
        } else {
          calendarDay[i].querySelector(
            '.input__field_clicked-js',
          ).value = day
            .toLocaleString('ru')
            .slice(0, 10)
            .split('.')
            .reverse()
            .join('-');
        }
      } else {
        calendarDay[0].querySelector('.input__field_clicked-js').value += `${
          v.innerText
        } ${checkDate[0].slice(0, 3)}. ${
          i == 0 && arr.length !== 1 ? '- ' : ''
        }`;
      }
    });
    closeCalendar();
  });
}

function closeCalendar() {
  let eventArrow = new Event('click');
  let eventTarget = event.target
    .closest('.calendar')
    .parentNode.querySelector('.button_clicked-js');
  eventTarget.dispatchEvent(eventArrow);
}

function clearDate(num) {
  for (let elem of num) {
    elem.querySelector('.input__field_clicked-js').value = '';
  }
}
