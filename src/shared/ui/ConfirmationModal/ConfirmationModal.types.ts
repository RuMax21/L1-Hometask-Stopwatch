export interface ConfirmationModalProps {
  isOpen: boolean;
  children: React.ReactNode;
  onConfirm: () => void;
  onCancel: () => void;
}
