export const onFormItemChange = (
  cb: (value: string) => void,
  setFormError: (value: string) => void
) => {
  return (e: React.ChangeEvent<HTMLInputElement>) => {
    cb(e.currentTarget.value);
    setFormError("");
  };
};

export const onFormItemBlur = (
  validator: (value: string) => string | undefined,
  setFormError: (value: string) => void
) => {
  return (e: React.FocusEvent<HTMLInputElement>) => {
    const error = validator(e.currentTarget.value);
    if (error) {
      setFormError(error);
    }
  };
};
