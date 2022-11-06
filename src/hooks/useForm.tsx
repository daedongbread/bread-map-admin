import React from 'react';

function useForm<T>(initialForm: T) {
  const [form, setForm] = React.useState(initialForm);

  const onChangeForm = (key: string, value: any) => {
    setForm({ ...form, [key]: value });
  };

  const onSetForm = (form: T) => {
    setForm(form);
  };

  return { form, onChangeForm, onSetForm };
}

export default useForm;
