export interface AlertProps {
  message: string;
  description: string;
  isOpen: boolean;
  duration?: number | null | undefined;
}
