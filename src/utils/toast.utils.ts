export const showSuccessToast = (message: any, toast: any) => {
  toast.current?.show({
    severity: "success",
    summary: "Success Message",
    detail: message,
    life: 3000,
  });
};

export const showInfo = (message: any, toast: any) => {
  toast.current?.show({
    severity: "info",
    summary: "Info Message",
    detail: message,
    life: 3000,
  });
};

export const showWarn = (message: any, toast: any) => {
  toast.current?.show({
    severity: "warn",
    summary: "Warn Message",
    detail: message,
    life: 3000,
  });
};

export const showError = (message: any, toast: any) => {
  toast.current?.show({
    severity: "error",
    summary: "Error Message",
    detail: message,
    life: 3000,
  });
};
