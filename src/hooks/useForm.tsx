import React from 'react';

function useForm<T>(initialForm: T) {
  const [form, setForm] = React.useState(initialForm);

  const onChangeForm = (key: string, value: any) => {
    console.log('change', key);
    setForm({ ...form, [key]: value });
  };

  React.useEffect(() => {
    console.log('form', form);
  }, [form]);

  return { form, onChangeForm };
}

export default useForm;
