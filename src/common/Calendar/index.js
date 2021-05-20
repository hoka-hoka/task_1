import CalendarDOM from './CalendarDOM';
import Mark from './Mark';
import Sibling from '../Sibling';
import { calendar } from '../../js/constants';

export default class Calendar {
  constructor(calendar, options = { dateFields, btnClear, bntApply, trigger }) {
    if (!calendar) {
      console.error('узел календаря не передан в класс Calendar');
    }
    this.options = { ...options };
    this.cont = calendar.querySelector('.swiper-container');
    this.swiper = this.cont.swiper;
    this.initCalendar();
  }

  initCalendar = () => {
    const { btnClear, bntApply } = this.options;
    this.createCalendar();
    this.createMarks();
    if (btnClear) {
      btnClear.addEventListener('click', this.clearDate);
    }
    if (bntApply) {
      bntApply.addEventListener('click', () => {
        this.applyDate();
        this.closeCalendar();
      });
    }
  };

  createCalendar = () => {
    let date = new Date();
    date.setDate(1);
    let dateArr = [
      new Date(date.setMonth(date.getMonth() - 1)),
      new Date(date.setMonth(date.getMonth() + 1)),
      new Date(date.setMonth(date.getMonth() + 1)),
    ];
    dateArr.forEach((date) => {
      this.swiper.appendSlide(new CalendarDOM(date).table);
    });
  };

  initMarks = () => {
    const { cont, marks } = this;
    let tdToday = cont.querySelector('.calendar__day-num_current');
    let cell = cont.querySelectorAll('.calendar__day-num'); // cells
    marks.today.moveAt(tdToday);
    for (let i in cell) {
      if (cell[i] == tdToday) {
        marks.first.moveAt(cell[i]);
        marks.second.moveAt(cell[+i + 1]);
      }
    }
  };

  createMarks = () => {
    const { cont } = this;
    this.marks = {
      today: new Mark('calendar__today-mark', cont),
      first: new Mark(
        'calendar__day-mark calendar__day-mark_1',
        cont,
        this.applyDate,
      ),
      second: new Mark(
        'calendar__day-mark calendar__day-mark_2',
        cont,
        this.applyDate,
      ),
    };
    const { marks } = this;

    let table = cont.querySelectorAll('.calendar__box'); // boxes cell
    this.initMarks();
    for (let val of table) {
      val.onmousedown = function (event) {
        if (event.target.contains(marks.first.mark)) {
          marks.first.i = 1;
          marks.second.i = 0;
        } else if (event.target.contains(marks.second.mark)) {
          marks.first.i = 0;
          marks.second.i = 1;
        }
        marks.first.i
          ? marks.first.markFullStack(event.target)
          : marks.second.markFullStack(event.target);
      };
    }
  };

  closeCalendar = () => {
    const { trigger } = this.options;
    if (!trigger) {
      return;
    }
    debugger;
    const e = new Event('click');
    trigger.dispatchEvent(e);
  };

  applyDate = () => {
    const getDate = (day) => {
      const today = this.marks.today.day;
      let checkDate = Sibling.getOlderSibling({
        iter: 4,
        $elem: $(today),
        find: 'calendar__month',
      });
      if (!checkDate.length) {
        return;
      }
      const [month, year] = checkDate.get(0).innerHTML.split(' ');
      if (!month && !year) {
        return;
      }
      const date = new Date(year, calendar.months.indexOf(month), day);
      const rezult = date
        ? date.toLocaleString('ru').slice(0, 10).split('.').join('-')
        : '';
      return rezult;
    };

    const {
      marks: { first, second },
      options: { dateFields },
    } = this;

    const [start = '', end = ''] = [
      getDate(first.day ? first.day.innerText : ''),
      getDate(second.day ? second.day.innerText : ''),
    ].sort();

    if (!dateFields.length) {
      return;
    }
    dateFields.forEach((field, index) => {
      !index ? (field.value = start) : (field.value = end);
    });
  };

  clearDate = () => {
    const { dateFields, trigger } = this.options;
    if (!dateFields?.length && !trigger) {
      return;
    }
    dateFields.forEach((field, index) => {
      field.value = '';
      this.initMarks();
    });
  };
}
