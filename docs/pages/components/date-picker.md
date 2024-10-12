---
meta:
  title: Date Picker
  description: Calendar date picker
layout: component
---

```html:preview
<sl-date-picker multiple clearable></sl-date-picker>
```

```jsx:react
import SlDatePicker from '@shoelace-style/shoelace/dist/react/date-picker';

const App = () => <SlDatePicker label="Select a option" />;
```

:::tip
This component works with standard `<form>` elements. Please refer to the section on [form controls](/getting-started/form-controls) to learn more about form submission and client-side validation.
:::

## Examples

### Initial Value

Use the `value` attribute to set an initial value for the combobox

```html:preview
<sl-date-picker multiple clearable></sl-date-picker>
```