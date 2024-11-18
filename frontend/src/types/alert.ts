export interface AlertProps {
  isOpen: boolean;
  type: "success" | "info" | "warning" | "error" | undefined;
  message: string;
}