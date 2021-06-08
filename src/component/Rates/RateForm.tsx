import { Form, Formik } from "formik";
import { FC } from "react";
import { useToast } from "toasts";
import { RateType } from "./types";
import { edit, save } from "api";
import { FormikInputNumber } from "component/common/FormikFields";
import * as Yup from "yup";

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
    <Formik
      initialValues={
        formData ||
        ({
          id: "",
          date: new Date(),
        } as RateType)
      }
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={(data) => {
        saveOrUpdateRate(data);
      }}
      validationSchema={Yup.object({
        goldRate: Yup.number()
          .transform((value) => (isNaN(value) || 0 ? undefined : value))
          .required("Gold rate is required"),
        silverRate: Yup.number()
          .transform((value) => (isNaN(value) || 0 ? undefined : value))
          .required("Silver rate is required"),
      })}
    >
      <Form className="p-fluid" id="rateForm">
        <div className="p-field">
          <label htmlFor="goldRate">Gold rate</label>
          <FormikInputNumber inputId="goldRate" name="goldRate" autoFocus />
        </div>

        <div className="p-field">
          <label htmlFor="silverRate">Silver rate</label>
          <FormikInputNumber inputId="silverRate" name="silverRate" />
        </div>
      </Form>
    </Formik>
  );
};

export default RateForm;
