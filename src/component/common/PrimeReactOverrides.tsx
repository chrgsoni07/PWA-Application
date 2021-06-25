import {
  InputNumberProps,
  InputNumber as InputNumberOriginal,
} from "primereact/inputnumber";

export function InputNumber(props: InputNumberProps & { ariaLabel?: string }) {
  const id = props.inputId || "id" + Math.random().toString(16).slice(2);
  if (props.mode === "currency") {
    props = { ...props, currency: "INR" };
  }
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
