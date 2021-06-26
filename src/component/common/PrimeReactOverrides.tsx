import {
  InputNumberProps,
  InputNumber as InputNumberOriginal,
} from "primereact/inputnumber";

export function InputNumber(props: InputNumberProps & { ariaLabel?: string }) {
  const id = getID(props.inputId);
  return (
    <>
      {!props.inputId ? (
        <label htmlFor={id} className="p-sr-only">
          {props.ariaLabel}
        </label>
      ) : null}
      <InputNumberOriginal inputId={id} locale="en-IN" {...props} />
    </>
  );
}

export function Currency(props: InputNumberProps & { ariaLabel?: string }) {
  const id = getID(props.inputId);
  return (
    <>
      {!props.inputId ? (
        <label htmlFor={id} className="p-sr-only">
          {props.ariaLabel}
        </label>
      ) : null}
      <InputNumberOriginal
        inputId={id}
        {...props}
        locale="en-IN"
        mode="currency"
        currency="INR"
        minFractionDigits={0}
      />
    </>
  );
}

export function Weight(props: InputNumberProps & { ariaLabel?: string }) {
  const id = getID(props.inputId);
  return (
    <>
      {!props.inputId ? (
        <label htmlFor={id} className="p-sr-only">
          {props.ariaLabel}
        </label>
      ) : null}
      <InputNumberOriginal
        inputId={id}
        {...props}
        locale="en-IN"
        mode="decimal"
        minFractionDigits={1}
        maxFractionDigits={3}
      />
    </>
  );
}

const getID = (id?: string): string =>
  id || "id" + window.crypto.getRandomValues(new Uint32Array(1));
