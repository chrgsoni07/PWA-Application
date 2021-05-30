import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useContext,
  useRef,
} from "react";
import { Toast } from "primereact/toast";

type ContextType = {
  toastSuccess: (msg: ReactNode) => void;
  toastError: (msg: ReactNode) => void;
  toastWarn: (msg: ReactNode) => void;
  toastInfo: (msg: ReactNode) => void;
};
const ToastContext = createContext<ContextType>({} as ContextType);

export const useToast = () => useContext(ToastContext);
export const ToastsProvider: FC = ({ children }) => {
  const toast = useRef<Toast>(null);

  const toastSuccess = useCallback((detail: ReactNode) => {
    toast.current?.show({
      severity: "success",
      summary: "Success Message",
      detail,
    });
  }, []);
  const toastError = useCallback((detail: ReactNode) => {
    toast.current?.show({
      severity: "error",
      summary: "Error Message",
      detail,
    });
  }, []);
  const toastWarn = useCallback((detail: ReactNode) => {
    toast.current?.show({
      severity: "warn",
      summary: "Warn Message",
      detail,
    });
  }, []);
  const toastInfo = useCallback((detail: ReactNode) => {
    toast.current?.show({
      severity: "info",
      summary: "info Message",
      detail,
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
