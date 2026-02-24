import styles from './ConfirmationModal.module.scss';
import type { ConfirmationModalProps } from "./ConfirmationModal.types";
import Button from "../Button";
import { useEffect } from 'react';

export default function ConfirmationModal({isOpen, children, onConfirm, onCancel}: ConfirmationModalProps) {
  useEffect(() => {
    const handleHtmlClick = (event: MouseEvent) => {
      console.log('HTML clicked: ', event);
    }
    document.documentElement.addEventListener('click', handleHtmlClick);
    return () => {
      document.documentElement.removeEventListener('click', handleHtmlClick);
    }
  }, []);

  if (!isOpen) return null;

  return (
    <div className={`${styles.overlay}`}>
      <div className={`${styles.modal}`}>
        <p className={`${styles.text}`}>
          {children}
        </p>
        <div className={`${styles.actions}`}>
          <Button className={`${styles.btnConfirm}`} onClick={onConfirm}>Confirm</Button>
          <Button className={`${styles.btnCancel}`} onClick={onCancel}>Cancel</Button>
        </div>
      </div>
    </div>
  );
};
