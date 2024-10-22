---
meta:
  title: Date Picker
  description: Calendar date picker
layout: component
---

```html:preview
<sl-date-picker value="Oct 10, 2024" label="Date"></sl-date-picker>
```

```jsx:react
import SlDatePicker from '@shoelace-style/shoelace/dist/react/date-picker';
const App = () => <SlDatePicker label="Select a option" />;
```

```html:preview
<sl-date-picker value="Oct 11, 2024" mode="range" day="numeric" month="short" year="numeric" label="Date Range"></sl-date-picker>
```

```jsx:react
import SlDatePicker from '@shoelace-style/shoelace/dist/react/date-picker';
const App = () => <SlDatePicker label="Select a option" />;
```

```html:preview
<sl-date-picker id="date-time" mode="range" value="Oct 11, 2024, 12:00 – Oct 12, 2024, 13:30"
year="numeric" month="short" day="numeric"  hour="numeric"  minute="numeric"
dual
>
  <div slot="footer" style="display: flex; gap: var(--sl-spacing-small); padding-top: var(--sl-spacing-small);">
    <sl-select placeholder="Start time" value="12:00">
      <span slot="suffix">Start</span>
      <sl-option value="12:00">12:00 PM</sl-option>
      <sl-option value="12:30">12:30 PM</sl-option>
      <sl-option value="13:00">1:00 PM</sl-option>
    </sl-select>
    <sl-select placeholder="End time" value="13:30">
      <span slot="suffix">End</span>
      <sl-option value="13:30">1:30 PM</sl-option>
      <sl-option value="14:30">2:30 PM</sl-option>
      <sl-option value="15:00">3:00 PM</sl-option>
    </sl-select>
  </div>
</sl-date-picker>

<script>
  const datePicker = document.getElementById('date-time');
  const startTimeSelect = document.querySelector('sl-select[placeholder="Start time"]');
  const endTimeSelect = document.querySelector('sl-select[placeholder="End time"]');

  function updateDatePickerValue() {
    const currentDateRange = datePicker.value;

    const [startDate, endDate] = currentDateRange;

    startDate.setHours(...startTimeSelect.value.split(':'));
    endDate?.setHours(...endTimeSelect.value.split(':'));

    datePicker.value = [startDate, endDate].filter(date => date);
  }

  startTimeSelect.addEventListener('sl-change', updateDatePickerValue);
  endTimeSelect.addEventListener('sl-change', updateDatePickerValue);
  datePicker.addEventListener('sl-change', updateDatePickerValue);
</script>
```

```jsx:react
import SlDatePicker from '@shoelace-style/shoelace/dist/react/date-picker';

const App = () => <SlDatePicker label="Select a option" />;
```

<!--
:::tip
This component works with standard `<form>` elements. Please refer to the section on [form controls](/getting-started/form-controls) to learn more about form submission and client-side validation.
:::

## Examples

### Initial Value

Use the `value` attribute to set an initial value for the combobox

```html:preview
<sl-date-picker multiple clearable></sl-date-picker>
``` -->
