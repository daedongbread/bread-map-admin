import React, { useEffect, useState } from 'react';

function useForm<T>(initialForm: T) {
  const [form, setForm] = useState(initialForm);
  const onChangeForm = (key: string, value: any) => {
    setForm({ ...form, [key]: value });
  };

  useEffect(() => {
    console.log('form', form);
  }, [form]);
  return { form, onChangeForm };
}

export default useForm;
