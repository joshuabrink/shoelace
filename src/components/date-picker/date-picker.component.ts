import { classMap } from 'lit/directives/class-map.js';
import { defaultValue } from '../../internal/default-value.js';
import { FormControlController } from '../../internal/form.js';
import { html } from 'lit';
import { LocalizeController } from '../../utilities/localize.js';
import { property, query, state } from 'lit/decorators.js';
import { watch } from '../../internal/watch.js';
import componentStyles from '../../styles/component.styles.js';
import ShoelaceElement from '../../internal/shoelace-element.js';
import SlButtonGroup from '../button-group/button-group.component.js';
import SlDropdown from '../dropdown/dropdown.component.js';
import SlFormatDate from '../format-date/format-date.component.js';
import SlIcon from '../icon/icon.component.js';
import SlIconButton from '../icon-button/icon-button.component.js';
import SlInput from '../input/input.component.js';
import SlTag from '../tag/tag.component.js';
import styles from './date-picker.styles.js';
import type { CSSResultGroup } from 'lit';
import type { ShoelaceFormControl } from '../../internal/shoelace-element.js';
import type { SlChangeEvent } from '../../events/sl-change.js';
import type { SlInputEvent } from '../../events/sl-input.js';
import type { SlRemoveEvent } from '../../events/sl-remove.js';

/**
 * @summary Date pickers allow the user to select a date or date range.
 * @documentation https://shoelace.style/components/date-picker
 * @status stable
 * @since 2.0
 *
 * @dependency sl-icon-button
 * @dependency sl-button-group
 * @dependency sl-dropdown
 * @dependency sl-input
 * @dependency sl-tag
 * @dependency sl-format-date
 *
 * @slot label - The color picker's form label. Alternatively, you can use the `label` attribute.
 *
 * @event sl-blur - Emitted when the color picker loses focus.
 * @event sl-change - Emitted when the color picker's value changes.
 * @event sl-focus - Emitted when the color picker receives focus.
 * @event sl-input - Emitted when the color picker receives input.
 * @event sl-invalid - Emitted when the form control has been checked for validity and its constraints aren't satisfied.
 *
 * @csspart base - The component's base wrapper.
 * @csspart trigger - The date picker's dropdown trigger.
 * @csspart calendar - The date picker's calendar.
 * @csspart input - The text input.
 *
 * @cssproperty --calendar-width - The width of the calendar grid.
 * @cssproperty --calendar-height - The height of the color grid.
 */
export default class SlDatePicker extends ShoelaceElement implements ShoelaceFormControl {
  static styles: CSSResultGroup = [componentStyles, styles];

  static dependencies = {
    'sl-button-group': SlButtonGroup,
    'sl-icon-button': SlIconButton,
    'sl-dropdown': SlDropdown,
    'sl-icon': SlIcon,
    'sl-input': SlInput,
    'sl-format-date': SlFormatDate,
    'sl-tag': SlTag
  };

  private readonly formControlController = new FormControlController(this);
  // private isSafeValue = false;
  private readonly localize = new LocalizeController(this);

  @query('[part~="base"]') base: HTMLElement;
  @query('[part~="trigger"]') trigger: SlIconButton;
  @query('[part~="input"]') input: SlInput;
  @query('.date-picker__dropdown') dropdown: SlDropdown;
  @query('.date-picker__previous-month') previousMonth: HTMLButtonElement;
  @query('.date-picker__next-month') nextMonth: HTMLButtonElement;
  @query('.month-button-group') monthButtonGroup: SlButtonGroup;

  @state() private hasFocus = false;
  @state() private inputValue = '';
  @state() private selectedDays: Date[] = [];
  @state() private isSelectingRange: boolean = false;
  @state() private currentDay: HTMLButtonElement;

  @property({
    type: Boolean,
    reflect: true
  })
  dual = false;

  @property() private mode: 'single' | 'multiple' | 'range' = 'single';
  @property() calendarDate: Date = new Date();

  /** The format for displaying the weekday. */
  @property() weekday: 'narrow' | 'short' | 'long';

  /** The format for displaying the era. */
  @property() era: 'narrow' | 'short' | 'long';

  /** The format for displaying the year. */
  @property() year: 'numeric' | '2-digit';

  /** The format for displaying the month. */
  @property() month: 'numeric' | '2-digit' | 'narrow' | 'short' | 'long';

  /** The format for displaying the day. */
  @property() day: 'numeric' | '2-digit';

  /** The format for displaying the hour. */
  @property() hour: 'numeric' | '2-digit';

  /** The format for displaying the minute. */
  @property() minute: 'numeric' | '2-digit';

  /** The format for displaying the second. */
  @property() second: 'numeric' | '2-digit';

  /** The format for displaying the time. */
  @property({ attribute: 'time-zone-name' }) timeZoneName: 'short' | 'long';

  /** The time zone to express the time in. */
  @property({ attribute: 'time-zone' }) timeZone: string;

  /** The format for displaying the hour. */
  @property({ attribute: 'hour-format' }) hourFormat: 'auto' | '12' | '24' = 'auto';

  get format(): Intl.DateTimeFormatOptions {
    const hour12 = this.hourFormat === 'auto' ? undefined : this.hourFormat === '12';
    return {
      weekday: this.weekday,
      era: this.era,
      year: this.year,
      month: this.month,
      day: this.day,
      hour: this.hour,
      minute: this.minute,
      second: this.second,
      timeZoneName: this.timeZoneName,
      timeZone: this.timeZone,
      hour12: hour12
    };
  }

  /**
   * The current value of the color picker. The value's format will vary based the `format` attribute. To get the value
   * in a specific format, use the `getFormattedValue()` method. The value is submitted as a name/value pair with form
   * data.
   */
  @property({
    converter: {
      fromAttribute: (value: string) => value.split(' – ').map(date => new Date(date)),
      toAttribute: (value: Date[]) => value.join(' – ')
    }
  })
  value: Date | Date[] = new Date();

  /** The default value of the form control. Primarily used for resetting the form control. */
  @defaultValue() defaultValue = '';

  /**
   * The color picker's label. This will not be displayed, but it will be announced by assistive devices. If you need to
   * display HTML, you can use the `label` slot` instead.
   */
  @property() label = '';

  /** Renders the color picker inline rather than in a dropdown. */
  @property({ type: Boolean, reflect: true }) inline = false;

  /** Determines the size of the color picker's trigger. This has no effect on inline color pickers. */
  @property({ reflect: true }) size: 'small' | 'medium' | 'large' = 'medium';

  /** The name of the form control, submitted as a name/value pair with form data. */
  @property() name = '';

  /** Disables the color picker. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /**
   * By default, form controls are associated with the nearest containing `<form>` element. This attribute allows you
   * to place the form control outside of a form and associate it with the form that has this `id`. The form must be in
   * the same document or shadow root for this to work.
   */
  @property({ reflect: true }) form = '';

  /** Makes the color picker a required field. */
  @property({ type: Boolean, reflect: true }) required = false;

  /** Gets the validity state object */
  get validity() {
    return this.input.validity;
    // return true;
  }

  /** Gets the validation message */
  get validationMessage() {
    return this.input.validationMessage;
  }

  constructor() {
    super();
    this.addEventListener('focusin', this.handleFocusIn);
    this.addEventListener('focusout', this.handleFocusOut);
  }

  firstUpdated() {
    if (Array.isArray(this.value)) {
      this.selectedDays = this.value;
    } else {
      this.selectedDays = [this.value];
    }

    const firstCell = this.getFirstDayOfMonthCell();
    if (firstCell) this.setCurrentCell(firstCell);
    // else this.setCurrentCell(this.getFirstDayOfMonthCell());

    this.input.updateComplete.then(() => {
      this.formControlController.updateValidity();
    });
  }

  private handleFocusIn = () => {
    this.hasFocus = true;
    this.input.setSelectionRange(0, 0);
    this.emit('sl-focus');
  };

  private handleFocusOut = () => {
    this.hasFocus = false;
    this.emit('sl-blur');
  };

  private getAllCalendarCells(): HTMLButtonElement[] {
    return [...this.renderRoot.querySelectorAll('.date-picker__day')] as HTMLButtonElement[];
  }

  private getFirstDayOfMonthCell(): HTMLButtonElement | null {
    // return new Date(this.date.getFullYear(), this.date.getMonth(), 1).getDay();
    const allCells = this.getAllCalendarCells();
    const firstDayOfMonth = new Date(this.calendarDate.getFullYear(), this.calendarDate.getMonth(), 1);

    const firstDayOfMonthCell = allCells.find(el => el.value === this.localize.date(firstDayOfMonth));

    if (firstDayOfMonthCell) {
      return firstDayOfMonthCell;
    }

    return allCells[0];
  }

  private handleDatePickerKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      event.preventDefault();
      event.stopImmediatePropagation();
      this.dropdown.hide();
      this.trigger.focus();
      return;
    }

    // if(event.key === "Tab") {
    //   console.log("tab", event)
    // }

    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      event.stopImmediatePropagation();

      const oldValue = this.value;

      this.setSelectedDate(new Date(this.currentDay.value));

      if (this.value !== oldValue) {
        this.emit('sl-change');
        this.emit('sl-input');
      }
    }

    if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) {
      // Prevents scroll
      event.preventDefault();

      let newDay = 0;
      switch (event.key) {
        case 'ArrowLeft':
          newDay = -1;
          break;
        case 'ArrowRight':
          newDay = 1;
          break;
        case 'ArrowDown':
          newDay = 7;
          break;
        case 'ArrowUp':
          newDay = -7;
          break;
      }

      const newDate = new Date(this.currentDay.value);
      newDate.setDate(newDate.getDate() + newDay);
      const currentMonth = this.calendarDate.getMonth();
      const currentYear = this.calendarDate.getFullYear();
      const newMonth = newDate.getMonth();
      const newYear = newDate.getFullYear();

      if (newMonth !== currentMonth || newYear !== currentYear) {
        const monthsDiff = (newYear - currentYear) * 12 + (newMonth - currentMonth);
        this.addToCalendarMonth(monthsDiff);
      }

      requestAnimationFrame(() => {
        const allCells = this.getAllCalendarCells();
        const targetDate = newDate.getDate();
        const newCell = allCells.find(cell => {
          const cellDate = parseInt(cell.innerText);
          return cellDate === targetDate && !cell.classList.contains('date-picker__day--other-month');
        });

        if (newCell) {
          this.setCurrentCell(newCell);
        }
      });
    }
  }

  private handleInputChange(event: SlChangeEvent) {
    const target = event.target as HTMLInputElement;
    // const oldValue = this.value;
    const newValue = target.value;

    console.log('new value', newValue);

    // Prevent the <sl-input>'s sl-change event from bubbling up
    // event.stopPropagation();

    // this.setValue(newValue.split('|').map(date => new Date(date)));
    this.value = newValue
      .split(' – ')
      .filter(value => value)
      .map(date => new Date(date));

    // if (this.input.value) {
    //   if (Array.isArray(this.value)) {
    //     this.value =
    //     // target.value = this.value.join('|');
    //   } else {
    //     // target.value = this.value.toDateString();
    //   }
    // } else {
    //   this.value = new Date();
    // }

    // if (newValue !== oldValue) {
    this.emit('sl-change');
    this.emit('sl-input');
    // }
  }

  private handleInputInput(event: SlInputEvent) {
    const target = event.target as HTMLInputElement;
    // const oldValue = this.value;
    const newDates = target.value.split(' – ').map(date => new Date(date));

    // console.log('new input', newValue);
    // this.setValue(newValue.split('|').map(date => new Date(date)));A

    const hasValidDates = newDates.every(date => !isNaN(date.getMilliseconds()));

    if (hasValidDates) {
      this.value = newDates;
      this.formControlController.updateValidity();
    }

    // Prevent the <sl-input>'s sl-input event from bubbling up
    this.emit('sl-change');
    this.emit('sl-input');
  }

  private handleInputInvalid(event: Event) {
    this.formControlController.setValidity(false);
    this.formControlController.emitInvalidEvent(event);
  }

  private handleDayMouseDown(event: Event) {
    event.preventDefault();

    const target = event.target as HTMLButtonElement;
    const day = target.value;

    this.setSelectedDate(new Date(day));

    this.value = this.selectedDays;

    // if (this.value !== oldValue) {
    this.emit('sl-change');
    this.emit('sl-input');
    // }
  }

  private handleDayMouseOver(event: MouseEvent) {
    if (this.mode === 'range' && this.isSelectingRange) {
      const day = event.target as HTMLButtonElement;
      // this.selectedDays = [this.selectedDays[0], new Date(day.value)]
      this.currentDay = day;
      // this.value = this.selectedDays;
    }
  }

  private handlePreviousMonthMouseDown(event: Event) {
    event.preventDefault();
    this.addToCalendarMonth(-1);
    requestAnimationFrame(() => {
      const foundSelectedDay = this.getAllCalendarCells().find(el =>
        this.selectedDays.find(date => date.toDateString() === el.value)
      );
      if (foundSelectedDay) this.setCurrentCell(foundSelectedDay);
    });
  }

  private handleNextMonthMouseDown(event: Event) {
    event.preventDefault();
    this.addToCalendarMonth(1);
    requestAnimationFrame(() => {
      const foundSelectedDay = this.getAllCalendarCells().find(el =>
        this.selectedDays.find(date => date.toDateString() === el.value)
      );
      if (foundSelectedDay) this.setCurrentCell(foundSelectedDay);
    });
  }

  private handlePreviousMonthKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.addToCalendarMonth(-1);
    }
  }

  private handleNextMonthKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.addToCalendarMonth(1);
    }
  }

  private handleMonthButtonGroup(event: KeyboardEvent) {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.addToCalendarMonth(1);
      this.nextMonth.focus();
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.addToCalendarMonth(-1);
      this.previousMonth.focus();
    }
  }

  private addToCalendarMonth(month: number) {
    this.calendarDate = new Date(
      this.calendarDate.getFullYear(),
      this.calendarDate.getMonth() + month,
      this.calendarDate.getDate()
    );
  }

  private handleAfterShow(event: Event) {
    event.preventDefault();
    // const dateString = this.selectedDays[0].toDateString();
    // const firstCell = this.getAllCalendarCells().find(el => el.value === dateString);
    // if (firstCell) this.setCurrentCell(firstCell);

    if (this.mode === 'range' && this.selectedDays.length === 1) {
      this.isSelectingRange = true;
    }
  }

  // Prevents nested components from leaking events
  private stopNestedEventPropagation(event: CustomEvent) {
    event.stopImmediatePropagation();
  }

  private handleTagRemove(event: SlRemoveEvent, day: Date) {
    event.stopPropagation();

    if (!this.disabled) {
      this.selectedDays = this.selectedDays.filter(d => d !== day);
      this.value = this.selectedDays;
      // Emit after updating
      this.updateComplete.then(() => {
        this.emit('sl-input');
        this.emit('sl-change');
      });
    }
  }

  // @watch('format', { waitUntilFirstUpdate: true })
  // handleFormatChange(oldValue: string, newValue: string) {
  //   // console.log(oldValue, newValue);
  //   // this.syncValues();
  // }

  @watch('value')
  handleValueChange() {
    if (Array.isArray(this.value)) {
      this.selectedDays = this.value;
      this.inputValue = this.value.map(d => this.localize.date(d, this.format)).join(' – ');
    } else {
      this.inputValue = this.localize.date(this.value, this.format);
      this.selectedDays = [this.value];
    }
  }

  /** Sets focus on the color picker. */
  focus(options?: FocusOptions) {
    // // if (this.inline) {
    // //   this.base.focus(options);
    // // } else {
    this.trigger.focus(options);
    // }
  }

  /** Removes focus from the color picker. */
  blur() {
    const elementToBlur = this.inline ? this.base : this.trigger;

    if (this.hasFocus) {
      // We don't know which element in the color picker has focus, so we'll move it to the trigger or base (inline) and
      // blur that instead. This results in document.activeElement becoming the <body>. This doesn't cause another focus
      // event because we're using focusin and something inside the color picker already has focus.
      elementToBlur.focus({ preventScroll: true });
      elementToBlur.blur();
    }

    if (this.dropdown?.open) {
      this.dropdown.hide();
    }
  }

  /** Checks for validity but does not show a validation message. Returns `true` when valid and `false` when invalid. */
  checkValidity() {
    return this.input.checkValidity();
  }

  /** Gets the associated form, if one exists. */
  getForm(): HTMLFormElement | null {
    return this.formControlController.getForm();
  }

  /** Checks for validity and shows the browser's validation message if the control is invalid. */
  reportValidity() {
    if (!this.inline && !this.validity.valid) {
      // If the input is inline and invalid, show the dropdown so the browser can focus on it
      this.dropdown.show();
      this.addEventListener('sl-after-show', () => this.input.reportValidity(), { once: true });

      if (!this.disabled) {
        // By standards we have to emit a `sl-invalid` event here synchronously.
        this.formControlController.emitInvalidEvent();
      }

      return false;
    }

    return this.input.reportValidity();
  }

  /** Sets a custom validation message. Pass an empty string to restore validity. */
  setCustomValidity(message: string) {
    this.input.setCustomValidity(message);
    this.formControlController.updateValidity();
  }

  private setCurrentCell(cell: HTMLButtonElement | null) {
    const allCells = this.getAllCalendarCells();

    // Clear selection
    allCells.forEach(el => {
      el.tabIndex = -1;
    });

    // Select the target option
    if (cell) {
      this.currentDay = cell;
      cell.tabIndex = 0;
      cell.focus();
    }
  }

  private setSelectedDate(date: Date) {
    const day = new Date(date);
    day.setHours(0, 0, 0, 0);
    if (this.mode === 'single') {
      this.selectedDays = [day];
    } else if (this.mode === 'range') {
      if (this.isSelectingRange) {
        this.selectedDays = [this.selectedDays[0], day].sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
      } else {
        this.selectedDays = [day];
      }
      this.isSelectingRange = !this.isSelectingRange;
    } else {
      this.selectedDays.push(day);
    }
  }

  // private setValue(date: Date | Date[]) {}

  renderCalendar(currentDate?: Date) {
    const now = new Date(currentDate ?? this.calendarDate);
    const sunday = new Date(now.setDate(now.getDate() - now.getDay()));

    const weekdays = Array.from({ length: 7 }, (_, i) => new Date(sunday.getTime()).setDate(sunday.getDate() + i)).map(
      date => new Date(date)
    );
    const year = now.getFullYear();
    const month = now.getMonth();

    const firstDayWeekday = new Date(year, month, 1).getDay();
    const lastDayOfMonth = new Date(year, month + 1, 0).getDate();
    const lastDayWeekday = new Date(year, month, lastDayOfMonth).getDay();

    const totalDays = firstDayWeekday + lastDayOfMonth + (6 - lastDayWeekday);
    const weeksNeeded = Math.ceil(totalDays / 7);

    const [firstSelectedDay, lastSelectedDay] = (
      this.selectedDays.length === 2 ? this.selectedDays : [this.selectedDays[0], this.currentDay?.value]
    )
      .map(day => {
        const date = new Date(day);
        date.setHours(0, 0, 0, 0);
        return date;
      })
      .sort((a, b) => a.getTime() - b.getTime());

    // Create array with exact number of days needed
    const daysOfMonth = Array.from({ length: weeksNeeded * 7 }, (_, i) => {
      const dayIndex = i - firstDayWeekday;
      const date = new Date(year, month, dayIndex + 1);

      const inRange =
        this.mode === 'range' &&
        date.getTime() >= firstSelectedDay?.getTime() &&
        date.getTime() <= lastSelectedDay?.getTime();

      return {
        date,
        dayOfMonth: this.localize.date(date, { day: 'numeric' }),
        isCurrentMonth: date.getMonth() === month,
        isToday: new Date().toDateString() === date.toDateString(),
        weekNumber: Math.floor(i / 7),
        inRange
      };
    });

    // Group days by week
    const weeks = Array.from({ length: 6 }, (_, weekIndex) => daysOfMonth.filter(day => day.weekNumber === weekIndex));

    // console.log('start date', this.selectedDays[0]?.toDateString());
    // console.log('end date', this.selectedDays[1]?.toDateString());

    return html`
      <table class="date-picker__calendar" cellpadding="0" cellspacing="0" @keydown=${this.handleDatePickerKeyDown}>
        <thead>
          <tr class="date-picker__weekdays">
            ${weekdays.map(
              day =>
                html`<td class="date-picker__weekday">
                  <sl-format-date weekday="short" date=${day}></sl-format-date>
                </td>`
            )}
          </tr>
        </thead>
        <tbody>
          ${weeks.map(week => {
            return html`
              <tr class="date-picker__week">
                ${week.map(day => {
                  const isSelected =
                    this.selectedDays.some(selectedDay => selectedDay.toDateString() === day.date.toDateString()) ||
                    (this.isSelectingRange && day.date.toDateString() === this.currentDay?.value);

                  const isStartOfSelectedRange =
                    day.inRange && day.date.toDateString() === this.selectedDays[0]?.toDateString();

                  const isEndOfSelectedRange =
                    day.inRange && day.date.toDateString() === this.selectedDays[1]?.toDateString();

                  return html`
                    <td>
                      <button
                        aria-selected=${isSelected}
                        class=${classMap({
                          'date-picker__day': true,
                          'date-picker__day--selected': isSelected,
                          'date-picker__day--current-month': day.isCurrentMonth,
                          'date-picker__day--other-month': !day.isCurrentMonth,
                          'date-picker__day--today': day.isToday,
                          'date-picker__day--in-range': day.inRange,
                          'date-picker__day--in-range-start': isStartOfSelectedRange,
                          'date-picker__day--in-range-end': isEndOfSelectedRange
                        })}
                        value=${day.date.toDateString()}
                        @mousedown=${this.handleDayMouseDown}
                        @mouseover=${this.handleDayMouseOver}
                      >
                        ${day.dayOfMonth}
                      </button>
                    </td>
                  `;
                })}
              </tr>
            `;
          })}
        </tbody>
      </table>
    `;
  }

  render() {
    const previousMonth = this.localize.date(
      new Date(this.calendarDate.getFullYear(), this.calendarDate.getMonth() - 1),
      { month: 'long' }
    );

    const nextMonth = new Date(this.calendarDate.getFullYear(), this.calendarDate.getMonth() + 1, 15);

    const nextMonthText = this.localize.date(nextMonth, {
      month: 'long'
    });

    return html`
      <sl-input
        class="date-picker__input"
        part="input"
        type="text"
        name=${this.name}
        size=${this.size}
        label=${this.label}
        autocomplete="off"
        autocorrect="off"
        autocapitalize="off"
        spellcheck="false"
        value=${this.inputValue}
        ?required=${this.required}
        ?disabled=${this.disabled}
        aria-label=${this.localize.term('currentValue')}
        @change=${this.handleInputChange}
        @input=${this.handleInputInput}
        @invalid=${this.handleInputInvalid}
        @sl-change=${this.stopNestedEventPropagation}
        @sl-input=${this.stopNestedEventPropagation}
      >
        <sl-dropdown
          slot="suffix"
          class="date-picker__dropdown"
          aria-disabled=${this.disabled ? 'true' : 'false'}
          .containing-element=${this}
          ?disabled=${this.disabled}
          hoist
          @sl-after-show=${this.handleAfterShow}
        >
          <sl-icon-button
            slot="trigger"
            part="trigger"
            name="calendar"
            @sl-blur=${this.stopNestedEventPropagation}
            @sl-focus=${this.stopNestedEventPropagation}
          ></sl-icon-button>
          <div
            part="base"
            class=${classMap({
              'date-picker': true,
              'date-picker--inline': this.inline,
              'date-picker--disabled': this.disabled,
              'date-picker--focused': this.hasFocus
            })}
            aria-disabled=${this.disabled ? 'true' : 'false'}
            aria-labelledby="label"
          >
            <div
              class=${classMap({
                'date-picker__header': true,
                'date-picker__header--dual': this.dual
              })}
            >
              <sl-format-date
                class="date-picker__month-year-header"
                month="long"
                year="numeric"
                date=${this.calendarDate}
              ></sl-format-date>

              ${this.dual
                ? html`
                    <sl-format-date
                      class="date-picker__month-year-header"
                      month="long"
                      year="numeric"
                      date=${nextMonth}
                    ></sl-format-date>
                  `
                : ''}

              <sl-button-group class="month-button-group" @keydown=${this.handleMonthButtonGroup}>
                <sl-icon-button
                  name="chevron-up"
                  class="date-picker__previous-month"
                  label=${previousMonth}
                  @mousedown=${this.handlePreviousMonthMouseDown}
                  @keydown=${this.handlePreviousMonthKeyDown}
                  @sl-focus=${this.stopNestedEventPropagation}
                  @sl-blur=${this.stopNestedEventPropagation}
                ></sl-icon-button>
                <sl-icon-button
                  name="chevron-down"
                  class="date-picker__next-month"
                  label=${nextMonthText}
                  @mousedown=${this.handleNextMonthMouseDown}
                  @keydown=${this.handleNextMonthKeyDown}
                  @sl-focus=${this.stopNestedEventPropagation}
                  @sl-blur=${this.stopNestedEventPropagation}
                ></sl-icon-button>
              </sl-button-group>
            </div>
            <div class="date-picker__calendar-wrapper">
              ${this.renderCalendar()} ${this.dual ? this.renderCalendar(nextMonth) : ''}
            </div>
            <slot name="footer"></slot>
          </div>
        </sl-dropdown>
      </sl-input>
    `;
  }
}
