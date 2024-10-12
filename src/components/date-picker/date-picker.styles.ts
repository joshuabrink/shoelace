import { css } from 'lit';

export default css`
  :host {
    display: block;
  }

  /** The popup */
  .date-picker {
    flex: 1 1 auto;
    display: inline-flex;
    width: 100%;
    position: relative;
    vertical-align: middle;
  }

  .date-picker::part(popup) {
    z-index: var(--sl-z-index-dropdown);
    background-color: var(--sl-panel-background-color);
    padding: var(--sl-spacing-medium);
  }

  .date-picker[data-current-placement^='top']::part(popup) {
    transform-origin: bottom;
  }

  .date-picker[data-current-placement^='bottom']::part(popup) {
    transform-origin: top;
  }

  /* Combobox */
  .date-picker__combobox {
    flex: 1;
    display: flex;
    width: 100%;
    min-width: 0;
    position: relative;
    align-items: center;
    justify-content: start;
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-input-font-weight);
    letter-spacing: var(--sl-input-letter-spacing);
    vertical-align: middle;
    overflow: hidden;
    cursor: pointer;
    transition:
      var(--sl-transition-fast) color,
      var(--sl-transition-fast) border,
      var(--sl-transition-fast) box-shadow,
      var(--sl-transition-fast) background-color;
  }

  .date-picker__display-input {
    position: relative;
    width: 100%;
    font: inherit;
    border: none;
    background: none;
    color: var(--sl-input-color);
    cursor: inherit;
    overflow: hidden;
    padding: 0;
    margin: 0;
    -webkit-appearance: none;
  }

  .date-picker__display-input::placeholder {
    color: var(--sl-input-placeholder-color);
  }

  .date-picker:not(.date-picker--disabled):hover .date-picker__display-input {
    color: var(--sl-input-color-hover);
  }

  .date-picker__display-input:focus {
    outline: none;
  }

  /* Visually hide the display input when multiple is enabled */
  .date-picker--multiple:not(.date-picker--placeholder-visible) .date-picker__display-input {
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
  }

  .date-picker__value-input {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    opacity: 0;
    z-index: -1;
  }

  .date-picker__tags {
    display: flex;
    flex: 1;
    align-items: center;
    flex-wrap: wrap;
    margin-inline-start: var(--sl-spacing-2x-small);
  }

  .date-picker__tags::slotted(sl-tag) {
    cursor: pointer !important;
  }

  .date-picker--disabled .date-picker__tags,
  .date-picker--disabled .date-picker__tags::slotted(sl-tag) {
    cursor: not-allowed !important;
  }

  /* Standard selects */
  .date-picker--standard .date-picker__combobox {
    background-color: var(--sl-input-background-color);
    border: solid var(--sl-input-border-width) var(--sl-input-border-color);
  }

  .date-picker--standard.date-picker--disabled .date-picker__combobox {
    background-color: var(--sl-input-background-color-disabled);
    border-color: var(--sl-input-border-color-disabled);
    color: var(--sl-input-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
    outline: none;
  }

  .date-picker--standard:not(.date-picker--disabled).date-picker--open .date-picker__combobox,
  .date-picker--standard:not(.date-picker--disabled).date-picker--focused .date-picker__combobox {
    background-color: var(--sl-input-background-color-focus);
    border-color: var(--sl-input-border-color-focus);
    box-shadow: 0 0 0 var(--sl-focus-ring-width) var(--sl-input-focus-ring-color);
  }

  /* Filled selects */
  .date-picker--filled .date-picker__combobox {
    border: none;
    background-color: var(--sl-input-filled-background-color);
    color: var(--sl-input-color);
  }

  .date-picker--filled:hover:not(.date-picker--disabled) .date-picker__combobox {
    background-color: var(--sl-input-filled-background-color-hover);
  }

  .date-picker--filled.date-picker--disabled .date-picker__combobox {
    background-color: var(--sl-input-filled-background-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .date-picker--filled:not(.date-picker--disabled).date-picker--open .date-picker__combobox,
  .date-picker--filled:not(.date-picker--disabled).date-picker--focused .date-picker__combobox {
    background-color: var(--sl-input-filled-background-color-focus);
    outline: var(--sl-focus-ring);
  }

  /* Sizes */
  .date-picker--small .date-picker__combobox {
    border-radius: var(--sl-input-border-radius-small);
    font-size: var(--sl-input-font-size-small);
    min-height: var(--sl-input-height-small);
    padding-block: 0;
    padding-inline: var(--sl-input-spacing-small);
  }

  .date-picker--small .date-picker__clear {
    margin-inline-start: var(--sl-input-spacing-small);
  }

  .date-picker--small .date-picker__prefix::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-small);
  }

  .date-picker--small.date-picker--multiple .date-picker__prefix::slotted(*) {
    margin-inline-start: var(--sl-input-spacing-small);
  }

  .date-picker--small.date-picker--multiple:not(.date-picker--placeholder-visible) .date-picker__combobox {
    padding-block: 2px;
    padding-inline-start: 0;
  }

  .date-picker--small .date-picker__tags {
    gap: 2px;
  }

  .date-picker--medium .date-picker__combobox {
    border-radius: var(--sl-input-border-radius-medium);
    font-size: var(--sl-input-font-size-medium);
    min-height: var(--sl-input-height-medium);
    padding-block: 0;
    padding-inline: var(--sl-input-spacing-medium);
  }

  .date-picker--medium .date-picker__clear {
    margin-inline-start: var(--sl-input-spacing-medium);
  }

  .date-picker--medium .date-picker__prefix::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-medium);
  }

  .date-picker--medium.date-picker--multiple .date-picker__prefix::slotted(*) {
    margin-inline-start: var(--sl-input-spacing-medium);
  }

  .date-picker--medium.date-picker--multiple .date-picker__combobox {
    padding-inline-start: 0;
    padding-block: 3px;
  }

  .date-picker--medium .date-picker__tags {
    gap: 3px;
  }

  .date-picker--large .date-picker__combobox {
    border-radius: var(--sl-input-border-radius-large);
    font-size: var(--sl-input-font-size-large);
    min-height: var(--sl-input-height-large);
    padding-block: 0;
    padding-inline: var(--sl-input-spacing-large);
  }

  .date-picker--large .date-picker__clear {
    margin-inline-start: var(--sl-input-spacing-large);
  }

  .date-picker--large .date-picker__prefix::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-large);
  }

  .date-picker--large.date-picker--multiple .date-picker__prefix::slotted(*) {
    margin-inline-start: var(--sl-input-spacing-large);
  }

  .date-picker--large.date-picker--multiple .date-picker__combobox {
    padding-inline-start: 0;
    padding-block: 4px;
  }

  .date-picker--large .date-picker__tags {
    gap: 4px;
  }

  /* Pills */
  .date-picker--pill.date-picker--small .date-picker__combobox {
    border-radius: var(--sl-input-height-small);
  }

  .date-picker--pill.date-picker--medium .date-picker__combobox {
    border-radius: var(--sl-input-height-medium);
  }

  .date-picker--pill.date-picker--large .date-picker__combobox {
    border-radius: var(--sl-input-height-large);
  }

  /* Prefix and Suffix */
  .date-picker__prefix,
  .date-picker__suffix {
    flex: 0;
    display: inline-flex;
    align-items: center;
    color: var(--sl-input-placeholder-color);
  }

  .date-picker__suffix::slotted(*) {
    margin-inline-start: var(--sl-spacing-small);
  }

  /* Clear button */
  .date-picker__clear {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: inherit;
    color: var(--sl-input-icon-color);
    border: none;
    background: none;
    padding: 0;
    transition: var(--sl-transition-fast) color;
    cursor: pointer;
  }

  .date-picker__clear:hover {
    color: var(--sl-input-icon-color-hover);
  }

  .date-picker__clear:focus {
    outline: none;
  }

  /* Expand icon */
  .date-picker__expand-icon {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    transition: var(--sl-transition-medium) rotate ease;
    rotate: 0;
    margin-inline-start: var(--sl-spacing-small);
  }

  .date-picker--open .date-picker__expand-icon {
    rotate: -180deg;
  }

  .date-picker__header {
    display: grid;
    grid-template-columns: auto 1fr auto;
    text-align: center;
    font-size: 1.5em;
    margin-bottom: 10px;
  }

  .date-picker__navigation-button {
    background-color: transparent;
    border: none;
    font-size: 1.25rem;
    cursor: pointer;
  }

  .date-picker__weekday-row {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
  }

  .date-picker__weekday-header {
    text-align: center;
    color: var(--sl-color-neutral-600);
  }

  .date-picker__cell {
    height: var(--sl-input-height-medium);
    width: var(--sl-input-height-medium);
    text-align: center;
    align-content: center;
    cursor: pointer;
  }

  .date-picker__cell.selected {
    background-color: var(--sl-color-primary-600);
    font-weight: var(--sl-font-weight-semibold);
    color: var(--sl-color-neutral-0);
  }

  .date-picker__cell:last-child, .in-selected-range:last-child {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  .date-picker__cell.other-month {
      color: var(--sl-color-neutral-700);
  }

  .in-selected-range {
    background-color: var(--sl-color-primary-100);
  }

  .in-selected-range:nth-child(1 of .in-selected-range) {
    border-top-left-radius: var(--sl-input-border-radius-medium);
    border-bottom-left-radius: var(--sl-input-border-radius-medium);
  }

  .in-selected-range:nth-last-child(1 of .in-selected-range) {
    border-top-right-radius: var(--sl-input-border-radius-medium);
    border-bottom-right-radius: var(--sl-input-border-radius-medium);
  }

  /* Listbox */
  .date-picker__listbox {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-medium);
    font-weight: var(--sl-font-weight-normal);
    box-shadow: var(--sl-shadow-large);
    border: solid var(--sl-panel-border-width) var(--sl-panel-border-color);
    border-radius: var(--sl-border-radius-medium);
    overflow: auto;
    overscroll-behavior: none;

    /* Make sure it adheres to the popup's auto size */
    max-width: var(--auto-size-available-width);
    max-height: var(--auto-size-available-height);
  }

  .date-picker__listbox ::slotted(sl-divider) {
    --spacing: var(--sl-spacing-x-small);
  }

  .date-picker__listbox ::slotted(small) {
    display: block;
    font-size: var(--sl-font-size-small);
    font-weight: var(--sl-font-weight-semibold);
    color: var(--sl-color-neutral-500);
    padding-block: var(--sl-spacing-2x-small);
    padding-inline: var(--sl-spacing-x-large);
  }
`;
