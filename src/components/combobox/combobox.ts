import SlCombobox from './combobox.component.js';

export * from './combobox.component.js';
export default SlCombobox;

SlCombobox.define('sl-combobox');

declare global {
  interface HTMLElementTagNameMap {
    'sl-combobox': SlCombobox;
  }
}
