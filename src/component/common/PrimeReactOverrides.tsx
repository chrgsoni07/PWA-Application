import {
  InputNumberProps,
  InputNumber as InputNumberOriginal,
} from "primereact/inputnumber";

export function InputNumber(props: InputNumberProps & { ariaLabel?: string }) {
  const id =
    props.inputId || "id" + window.crypto.getRandomValues(new Uint32Array(8));
  return (
    <>
      {!props.inputId ? <label htmlFor={id}>{props.ariaLabel}</label> : null}
      <InputNumberOriginal inputId={id} locale="en-IN" {...props} />
    </>
  );
}

export const Currency = (props: InputNumberProps & { ariaLabel?: string }) => (
  <InputNumber
    {...props}
    mode="currency"
    currency="INR"
    minFractionDigits={0}
  />
);

export const Weight = (props: InputNumberProps & { ariaLabel?: string }) => (
  <InputNumber
    {...props}
    mode="decimal"
    minFractionDigits={1}
    maxFractionDigits={3}
  />
);
