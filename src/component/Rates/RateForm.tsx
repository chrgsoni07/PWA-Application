import { FormikErrors, useFormik } from "formik";
import { InputNumber } from "primereact/inputnumber";
import { classNames } from "primereact/utils";
import { FC, useEffect } from "react";
import { useToast } from "toasts";
import { RateType } from "./types";
import { edit, save } from "api";
import { defaultNum } from "utils/number.utils";

type RateFormProps = {
  formData?: RateType;
  onAdd: (data: RateType) => void;
  onEdit: (data: RateType) => void;
  hideDialog: () => void;
};

const RateForm: FC<RateFormProps> = ({
  formData,
  onAdd,
  onEdit,
  hideDialog,
}) => {
  const formik = useFormik<RateType>({
    initialValues: {
      id: "",
      silverRate: 0,
      goldRate: 0,
      date: new Date(),
    },
    validate: (data) => {
      let errors: FormikErrors<RateType> = {};

      if (!data.goldRate) {
        errors.goldRate = "gold rate is required";
      }

      if (!data.silverRate) {
        errors.silverRate = "silver rate is required";
      }
      return errors;
    },

    onSubmit: (data) => {
      saveOrUpdateRate(data);
      formik.resetForm();
    },
  });

  useEffect(() => {
    formData && formik.setValues(formData);
  }, [formData]);

  const isFormFieldValid = (name: keyof RateType) =>
    !!(formik.touched[name] && formik.errors[name]);

  const getFormErrorMessage = (name: keyof RateType) =>
    isFormFieldValid(name) && (
      <small className="p-error">{formik.errors[name]}</small>
    );

  const saveOrUpdateRate = (data: RateType) => {
    if (data.id) {
      editRateToFireStore(data);
    } else {
      saveRateToFireStore(data);
    }
    hideDialog();
  };

  const { toastError } = useToast();

  const editRateToFireStore = async (data: RateType) => {
    try {
      await edit("goldSilverRates", data);
      onAdd(data);
    } catch (e) {
      toastError("Error updating rates");
    }
  };

  const saveRateToFireStore = async (data: RateType) => {
    try {
      const savedItem = await save("goldSilverRates", data);
      onEdit(savedItem);
    } catch (err) {
      toastError("Error saving rates");
    }
  };

  return (
    <form onSubmit={formik.handleSubmit} className="p-fluid" id="rateForm">
      <div className="p-field">
        <label htmlFor="goldRate">Gold rate</label>
        <InputNumber
          inputId="goldRate"
          name="goldRate"
          value={defaultNum(formik.values.goldRate)}
          onValueChange={formik.handleChange}
          autoFocus
          className={classNames({
            "p-invalid": isFormFieldValid("goldRate"),
          })}
        />
        {getFormErrorMessage("goldRate")}
      </div>

      <div className="p-field">
        <label htmlFor="silverRate">Silver rate</label>
        <InputNumber
          inputId="silverRate"
          name="silverRate"
          value={defaultNum(formik.values.silverRate)}
          onValueChange={formik.handleChange}
          className={classNames({
            "p-invalid": isFormFieldValid("silverRate"),
          })}
        />
        {getFormErrorMessage("silverRate")}
      </div>
    </form>
  );
};

export default RateForm;
