import { createContext, FC, useCallback, useContext, useRef } from "react";
import { Toast } from "primereact/toast";

type ContextType = {
  toastSuccess: (msg: string) => void;
  toastError: (msg: string) => void;
  toastWarn: (msg: string) => void;
  toastInfo: (msg: string) => void;
};
const ToastContext = createContext<ContextType>({} as ContextType);

export const useToast = () => useContext(ToastContext);
export const ToastsProvider: FC = ({ children }) => {
  const toast = useRef<Toast>(null);

  const toastSuccess = useCallback((message) => {
    toast.current?.show({
      severity: "success",
      summary: "Success Message",
      detail: message,
    });
  }, []);
  const toastError = useCallback((message) => {
    toast.current?.show({
      severity: "error",
      summary: "Error Message",
      detail: message,
    });
  }, []);
  const toastWarn = useCallback((message) => {
    toast.current?.show({
      severity: "warn",
      summary: "Warn Message",
      detail: message,
    });
  }, []);
  const toastInfo = useCallback((message) => {
    toast.current?.show({
      severity: "info",
      summary: "info Message",
      detail: message,
    });
  }, []);
  return (
    <ToastContext.Provider
      value={{ toastSuccess, toastError, toastWarn, toastInfo }}
    >
      {children}
      <Toast ref={toast} position="top-left" />
    </ToastContext.Provider>
  );
};
