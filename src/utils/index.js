export const handleFormValueChange = (event, formValues) => {
  const newFormValues = { ...formValues };
  newFormValues[event.target.name] = event.target.value;
  setFormValues(newFormValues);
};
