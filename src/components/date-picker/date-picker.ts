import SlDatePicker from './date-picker.component.js';

export * from './date-picker.component.js';
export default SlDatePicker;

SlDatePicker.define('sl-date-picker');

declare global {
  interface HTMLElementTagNameMap {
    'sl-date-picker': SlDatePicker;
  }
}
