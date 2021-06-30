import React, { FC, useState } from "react";
import { useField } from "formik";
import { InputNumber, InputNumberProps } from "primereact/inputnumber";
import { InputText, InputTextProps } from "primereact/inputtext";
import { AutoComplete, AutoCompleteProps } from "primereact/autocomplete";
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
        className={classNames({ "p-invalid": meta.error })}
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
        className={classNames({ "p-invalid": meta.error })}
      />
      {meta.error ? <small className="p-error">{meta.error}</small> : null}
    </>
  );
};
export const FormikTransliterate: FC<AutoCompleteProps> = (props: any) => {
  const [field, meta] = useField(props);

  const [suggestions, setSuggestions] = useState([]);
  const lang = "hi";
  const numOptions = 5;
  const showCurrentWordAsLastSuggestion = true;

  const getSuggestions = async (event: { query: string }) => {
    setTimeout(async () => {
      const url = `https://inputtools.google.com/request?text=${event.query}&itc=${lang}-t-i0-und&num=${numOptions}&cp=0&cs=1&ie=utf-8&oe=utf-8&app=demopage`;
      try {
        const res = await fetch(url);
        const data = await res.json();
        if (data && data[0] === "SUCCESS") {
          const found = showCurrentWordAsLastSuggestion
            ? [...data[1][0][1], event.query]
            : data[1][0][1];
          console.log("suggestions", found);
          setSuggestions(found);
          return found;
        }
      } catch (e) {
        // catch error
        console.error("There was an error with transliteration", e);
        return [];
      }
    }, 250);
  };

  return (
    <>
      <AutoComplete
        {...props}
        {...field}
        value={field.value}
        suggestions={suggestions}
        completeMethod={getSuggestions}
        className={classNames({ "p-invalid": meta.error })}
      />
      {meta.error ? <small className="p-error">{meta.error}</small> : null}
    </>
  );
};
