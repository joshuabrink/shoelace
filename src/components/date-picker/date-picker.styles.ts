import { css } from 'lit';

export default css`
  :host {
    --cell-width: 40px;
    --cell-height: 40px;
  }

  /** The popup */
  .date-picker {
    background-color: var(--sl-panel-background-color);
    padding: var(--sl-spacing-medium);
    border-radius: var(--sl-input-border-radius-medium);
  }

  .date-picker__dropdown {
    margin-right: var(--sl-spacing-x-small);
  }

  .date-picker__calendar {
    height: min-content;
  }

  .date-picker__calendar-wrapper {
    display: flex;
    justify-content: space-between;
  }

  .date-picker__header {
    display: flex;
    justify-content: space-between;
  }

  .date-picker__header--dual {
    display: grid;
    gap: var(--sl-spacing-x-small);
    grid-template-columns: 50% 1fr auto;
  }

  .date-picker__month-year-header {
    font-size: var(--sl-font-size-large);
    color: var(--sl-color-neutral-600);
    font-weight: 600;
    margin-bottom: var(--sl-spacing-small);
  }

  .date-picker__weekday {
    text-align: center;
    color: var(--sl-color-neutral-600);
    font-size: 0.85rem;
    font-weight: 600;
  }

  .date-picker__tag {
    margin-right: var(--sl-spacing-2x-small);
  }

  .date-picker__day {
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-input-font-weight);
    font-size: var(--sl-font-size-medium);
    height: var(--cell-width);
    width: var(--cell-width);
    background-color: transparent;
    border: none;
    border-radius: var(--sl-input-border-radius-medium);
    text-align: center;
    align-content: center;
    cursor: pointer;
    color: var(--sl-color-neutral-800);
  }

  .date-picker__day:focus-visible {
    outline: none;
    background-color: var(--sl-input-background-color-focus);
    border: 1px solid var(--sl-input-border-color-focus);
    box-shadow: 0 0 0 var(--sl-focus-ring-width) var(--sl-input-focus-ring-color);
  }

  .date-picker__day.date-picker__day--selected {
    background-color: var(--sl-color-primary-600);
    font-weight: var(--sl-font-weight-semibold);
    color: var(--sl-color-neutral-0);
  }

  .date-picker__day--other-month {
    // color: var(--sl-color-neutral-500);
    visibility: hidden;
  }

  .date-picker__day--in-range {
    background-color: var(--sl-color-primary-100);
    border-radius: 0;
  }

  .date-picker__day--in-range-start {
    border-top-left-radius: var(--sl-input-border-radius-medium);
    border-bottom-left-radius: var(--sl-input-border-radius-medium);
  }

  .date-picker__day--in-range-end {
    border-top-right-radius: var(--sl-input-border-radius-medium);
    border-bottom-right-radius: var(--sl-input-border-radius-medium);
  }

  .date-picker__calendar {
    border-collapse: collapse;
    border-spacing: 0;
  }

  /* Listbox */
  .date-picker__calendar-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
  }

  .date-picker__listbox::slotted(sl-divider) {
    --spacing: var(--sl-spacing-x-small);
  }

  .date-picker__listbox::slotted(small) {
    display: block;
    font-size: var(--sl-font-size-small);
    font-weight: var(--sl-font-weight-semibold);
    color: var(--sl-color-neutral-500);
    padding-block: var(--sl-spacing-2x-small);
    padding-inline: var(--sl-spacing-x-large);
  }
`;

// export default css`
//   :host {
//     display: block;
//   }

//   /** The popup */
//   .date-picker {
//     flex: 1 1 auto;
//     display: inline-flex;
//     width: 100%;
//     position: relative;
//     vertical-align: middle;

//   }

//   .date-picker::part(popup) {
//     z-index: var(--sl-z-index-dropdown);
//     background-color: var(--sl-panel-background-color);
//     padding: var(--sl-spacing-medium);
//     border-radius: var(--sl-input-border-radius-medium);
//   }

//   .date-picker[data-current-placement^='top']::part(popup) {
//     transform-origin: bottom;
//   }

//   .date-picker[data-current-placement^='bottom']::part(popup) {
//     transform-origin: top;
//   }

//   /* Combobox */
//   .date-picker__combobox {
//     flex: 1;
//     display: flex;
//     width: 100%;
//     min-width: 0;
//     position: relative;
//     align-items: center;
//     justify-content: start;
//     font-family: var(--sl-input-font-family);
//     font-weight: var(--sl-input-font-weight);
//     letter-spacing: var(--sl-input-letter-spacing);
//     vertical-align: middle;
//     overflow: hidden;
//     cursor: pointer;
//     transition:
//       var(--sl-transition-fast) color,
//       var(--sl-transition-fast) border,
//       var(--sl-transition-fast) box-shadow,
//       var(--sl-transition-fast) background-color;
//   }

//   .date-picker__display-input {
//     position: relative;
//     width: 100%;
//     font: inherit;
//     border: none;
//     background: none;
//     color: var(--sl-input-color);
//     cursor: inherit;
//     overflow: hidden;
//     padding: 0;
//     margin: 0;
//     -webkit-appearance: none;
//   }

//   .date-picker__display-input::placeholder {
//     color: var(--sl-input-placeholder-color);
//   }

//   .date-picker:not(.date-picker--disabled):hover .date-picker__display-input {
//     color: var(--sl-input-color-hover);
//   }

//   .date-picker__display-input:focus {
//     outline: none;
//   }

//   /* Visually hide the display input when multiple is enabled */
//   .date-picker--multiple:not(.date-picker--placeholder-visible) .date-picker__display-input {
//     position: absolute;
//     z-index: -1;
//     flex: 1;
//     top: 0;
//     left: 0;
//     width: 100%;
//     height: 100%;
//     opacity: 0;
//   }

//   .date-picker__value-input {
//     position: absolute;
//     top: 0;
//     left: 0;
//     width: 100%;
//     height: 100%;
//     padding: 0;
//     margin: 0;
//     opacity: 0;
//     z-index: -1;
//   }

//   .date-picker__tags {
//     display: flex;
//     flex: 1;
//     align-items: center;
//     flex-wrap: wrap;
//     margin-inline-start: var(--sl-spacing-2x-small);
//   }

//   .date-picker__tags::slotted(sl-tag) {
//     cursor: pointer !important;
//   }

//   .date-picker--disabled .date-picker__tags,
//   .date-picker--disabled .date-picker__tags::slotted(sl-tag) {
//     cursor: not-allowed !important;
//   }

//   /* Standard selects */
//   .date-picker--standard .date-picker__combobox {
//     background-color: var(--sl-input-background-color);
//     border: solid var(--sl-input-border-width) var(--sl-input-border-color);
//   }

//   .date-picker--standard.date-picker--disabled .date-picker__combobox {
//     background-color: var(--sl-input-background-color-disabled);
//     border-color: var(--sl-input-border-color-disabled);
//     color: var(--sl-input-color-disabled);
//     opacity: 0.5;
//     cursor: not-allowed;
//     outline: none;
//   }

//   .date-picker--standard:not(.date-picker--disabled).date-picker--open .date-picker__combobox,
//   .date-picker--standard:not(.date-picker--disabled).date-picker--focused .date-picker__combobox {
//     background-color: var(--sl-input-background-color-focus);
//     border-color: var(--sl-input-border-color-focus);
//     box-shadow: 0 0 0 var(--sl-focus-ring-width) var(--sl-input-focus-ring-color);
//   }

//   /* Filled selects */
//   .date-picker--filled .date-picker__combobox {
//     border: none;
//     background-color: var(--sl-input-filled-background-color);
//     color: var(--sl-input-color);
//   }

//   .date-picker--filled:hover:not(.date-picker--disabled) .date-picker__combobox {
//     background-color: var(--sl-input-filled-background-color-hover);
//   }

//   .date-picker--filled.date-picker--disabled .date-picker__combobox {
//     background-color: var(--sl-input-filled-background-color-disabled);
//     opacity: 0.5;
//     cursor: not-allowed;
//   }

//   .date-picker--filled:not(.date-picker--disabled).date-picker--open .date-picker__combobox,
//   .date-picker--filled:not(.date-picker--disabled).date-picker--focused .date-picker__combobox {
//     background-color: var(--sl-input-filled-background-color-focus);
//     outline: var(--sl-focus-ring);
//   }

//   /* Sizes */
//   .date-picker--small .date-picker__combobox {
//     border-radius: var(--sl-input-border-radius-small);
//     font-size: var(--sl-input-font-size-small);
//     min-height: var(--sl-input-height-small);
//     padding-block: 0;
//     padding-inline: var(--sl-input-spacing-small);
//   }

//   .date-picker--small .date-picker__clear {
//     margin-inline-start: var(--sl-input-spacing-small);
//   }

//   .date-picker--small .date-picker__prefix::slotted(*) {
//     margin-inline-end: var(--sl-input-spacing-small);
//   }

//   .date-picker--small.date-picker--multiple .date-picker__prefix::slotted(*) {
//     margin-inline-start: var(--sl-input-spacing-small);
//   }

//   .date-picker--small.date-picker--multiple:not(.date-picker--placeholder-visible) .date-picker__combobox {
//     padding-block: 2px;
//     padding-inline-start: 0;
//   }

//   .date-picker--small .date-picker__tags {
//     gap: 2px;
//   }

//   .date-picker--medium .date-picker__combobox {
//     border-radius: var(--sl-input-border-radius-medium);
//     font-size: var(--sl-input-font-size-medium);
//     min-height: var(--sl-input-height-medium);
//     padding-block: 0;
//     padding-inline: var(--sl-input-spacing-medium);
//   }

//   .date-picker--medium .date-picker__clear {
//     margin-inline-start: var(--sl-input-spacing-medium);
//   }

//   .date-picker--medium .date-picker__prefix::slotted(*) {
//     margin-inline-end: var(--sl-input-spacing-medium);
//   }

//   .date-picker--medium.date-picker--multiple .date-picker__prefix::slotted(*) {
//     margin-inline-start: var(--sl-input-spacing-medium);
//   }

//   .date-picker--medium.date-picker--multiple .date-picker__combobox {
//     padding-inline-start: 0;
//     padding-block: 3px;
//   }

//   .date-picker--medium .date-picker__tags {
//     gap: 3px;
//   }

//   .date-picker--large .date-picker__combobox {
//     border-radius: var(--sl-input-border-radius-large);
//     font-size: var(--sl-input-font-size-large);
//     min-height: var(--sl-input-height-large);
//     padding-block: 0;
//     padding-inline: var(--sl-input-spacing-large);
//   }

//   .date-picker--large .date-picker__clear {
//     margin-inline-start: var(--sl-input-spacing-large);
//   }

//   .date-picker--large .date-picker__prefix::slotted(*) {
//     margin-inline-end: var(--sl-input-spacing-large);
//   }

//   .date-picker--large.date-picker--multiple .date-picker__prefix::slotted(*) {
//     margin-inline-start: var(--sl-input-spacing-large);
//   }

//   .date-picker--large.date-picker--multiple .date-picker__combobox {
//     padding-inline-start: 0;
//     padding-block: 4px;
//   }

//   .date-picker--large .date-picker__tags {
//     gap: 4px;
//   }

//   /* Pills */
//   .date-picker--pill.date-picker--small .date-picker__combobox {
//     border-radius: var(--sl-input-height-small);
//   }

//   .date-picker--pill.date-picker--medium .date-picker__combobox {
//     border-radius: var(--sl-input-height-medium);
//   }

//   .date-picker--pill.date-picker--large .date-picker__combobox {
//     border-radius: var(--sl-input-height-large);
//   }

//   /* Prefix and Suffix */
//   .date-picker__prefix,
//   .date-picker__suffix {
//     flex: 0;
//     display: inline-flex;
//     align-items: center;
//     color: var(--sl-input-placeholder-color);
//   }

//   .date-picker__suffix::slotted(*) {
//     margin-inline-start: var(--sl-spacing-small);
//   }

//   /* Clear button */
//   .date-picker__clear {
//     display: inline-flex;
//     align-items: center;
//     justify-content: center;
//     font-size: inherit;
//     color: var(--sl-input-icon-color);
//     border: none;
//     background: none;
//     padding: 0;
//     transition: var(--sl-transition-fast) color;
//     cursor: pointer;
//   }

//   .date-picker__clear:hover {
//     color: var(--sl-input-icon-color-hover);
//   }

//   .date-picker__clear:focus {
//     outline: none;
//   }

//   /* Expand icon */
//   .date-picker__expand-icon {
//     flex: 0 0 auto;
//     display: flex;
//     align-items: center;
//     transition: var(--sl-transition-medium) rotate ease;
//     rotate: 0;
//     margin-inline-start: var(--sl-spacing-small);
//   }

//   .date-picker--open .date-picker__expand-icon {
//     rotate: -180deg;
//   }

//   .date-picker__header {
//     // display: grid;
//     // grid-template-columns: 3fr 3fr 1fr 1fr;
//     max-width: calc(40px * 7);
//     display: flex;
//     // gap: var(--sl-spacing-small);
//     // margin-bottom: var(--sl-spacing-medium);
//   }

//   .date-picker__month-select::part(display-input), .date-picker__year-select::part(display-input) {
//     font-size: 1.25rem;
//     font-weight: bold;
//   }

//   .date-picker__month-select::part(combobox), .date-picker__year-select::part(combobox) {
//     background-color: transparent;
//     border: none;
//   }

//   .date-picker__year-select::part(combobox) {
//     width: 110px;
//   }

//   .date-picker__navigation-button {
//     background-color: transparent;
//     border: none;
//     font-size: 1.1rem;
//     cursor: pointer;
//     min-width: 32px;
//     display: flex;
//     align-items: center;
//   }

//   .date-picker__weekday-row {
//     display: grid;
//     grid-template-columns: repeat(7, 1fr);
//     max-width: fit-content;
//   }

//   .date-picker__weekday-header {
//     text-align: center;
//     color: var(--sl-color-neutral-600);
//     font-size: 0.85rem;
//     font-weight: 600;
//     width: 40px;
//   }

//   .date-picker__cell {
//     height: var(--sl-input-height-medium);
//     width: var(--sl-input-height-medium);
//     text-align: center;
//     align-content: center;
//     cursor: pointer;
//   }

//   .date-picker__cell::part(base):hover, .date-picker__cell[tabindex="0"]::part(base) {
//     border: 2px solid var(--sl-color-primary-600);
//     background-color: transparent;
//     // border-radius: var(--sl-border-radius-medium);
//     // color: var(--sl-color-neutral-0);
//   }

//   .date-picker__cell::part(base) {
//     padding: 0;
//     height: 100%;
//     color: var(--sl-color-neutral-800);
//   }

//   .date-picker__cell[disabled] {
//     visibility: hidden;
//   }

//   .date-picker__cell::part(checked-icon) {
//     display: none;
//   }

//   .date-picker__cell[aria-selected="true"]::part(base) {
//     background-color: var(--sl-color-primary-600);
//     font-weight: var(--sl-font-weight-semibold);
//     color: var(--sl-color-neutral-0) !important;
//   }

//   .date-picker__cell:last-child, .in-selected-range:last-child {
//     border-top-left-radius: 0;
//     border-bottom-left-radius: 0;
//   }

//   .date-picker__cell.other-month::part(base) {
//       color: var(--sl-color-neutral-500);
//   }

//   .in-selected-range {
//     background-color: var(--sl-color-primary-100);
//   }

//   .date-picker__cell.in-selected-range:nth-child(1 of .in-selected-range)::part(base) {
//     border-top-left-radius: var(--sl-input-border-radius-medium);
//     border-bottom-left-radius: var(--sl-input-border-radius-medium);
//   }

//   .date-picker__cell.in-selected-range:nth-last-child(1 of .in-selected-range)::part(base) {
//     border-top-right-radius: var(--sl-input-border-radius-medium);
//     border-bottom-right-radius: var(--sl-input-border-radius-medium);
//   }

//   /* Listbox */
//   .date-picker__listbox {
//     display: grid;
//     grid-template-columns: repeat(7, 1fr);
//     font-family: var(--sl-font-sans);
//     font-size: var(--sl-font-size-medium);
//     font-weight: var(--sl-font-weight-normal);
//     border-radius: var(--sl-input-border-radius-medium);
//     overflow: auto;
//     overscroll-behavior: none;

//     /* Make sure it adheres to the popup's auto size */
//     // max-width: var(--auto-size-available-width);
//     max-width: fit-content;
//     max-height: var(--auto-size-available-height);
//   }

//   .date-picker__listbox ::slotted(sl-divider) {
//     --spacing: var(--sl-spacing-x-small);
//   }

//   .date-picker__listbox ::slotted(small) {
//     display: block;
//     font-size: var(--sl-font-size-small);
//     font-weight: var(--sl-font-weight-semibold);
//     color: var(--sl-color-neutral-500);
//     padding-block: var(--sl-spacing-2x-small);
//     padding-inline: var(--sl-spacing-x-large);
//   }
// `;
