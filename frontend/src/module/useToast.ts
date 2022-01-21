import { Notify } from "quasar";

interface ToastInterface {
  message: string;
  type?: 'positive' | 'negative' | 'warning' | 'info' | 'ongoing';
  timeout?: number;
  handler?: () => void
}

export const sendToast = async ({
  message,
  type = 'negative',
  timeout = 3000,
  handler = () => {}
}: ToastInterface) => {
  Notify.create({
    type,
    message,
    progress: true,
    timeout,
    actions: [
      {
        label: "Dismiss",
        color: "white",
        handler
      }
    ]
  });
};
