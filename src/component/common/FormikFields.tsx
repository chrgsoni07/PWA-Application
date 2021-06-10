import React, { FC } from "react";
import { useField } from "formik";
import { InputNumber, InputNumberProps } from "primereact/inputnumber";
import { InputText, InputTextProps } from "primereact/inputtext";
import { defaultNum } from "utils/number.utils";
import { classNames } from "primereact/utils";

export const FormikInputNumber: FC<InputNumberProps> = (props: any) => {
  const [field, meta] = useField(props);
  const { onChange, ...rest } = field;
  return (
    <>
      <InputNumber
        {...props}
        {...rest}
        onValueChange={onChange}
        value={defaultNum(field.value)}
        className={classNames({
          "p-invalid": meta.error,
        })}
      />
      {meta.error ? <small className="p-error">{meta.error}</small> : null}
    </>
  );
};

export const FormikInputText: FC<InputTextProps> = (props: any) => {
  const [field, meta] = useField(props);
  return (
    <>
      <InputText
        {...props}
        {...field}
        value={field.value}
        className={classNames({
          "p-invalid": meta.error,
        })}
      />
      {meta.error ? <small className="p-error">{meta.error}</small> : null}
    </>
  );
};
