import type { ButtonProps } from './Button.types';
import styles from './Button.module.scss';

const Button: React.FC<ButtonProps> = ({ onClick, children, disabled = false, className = '' }) => {
  return (
    <button onClick={onClick} disabled={disabled} className={`${styles.button} ${className}`}>
      {children}
    </button>
  );
};

export default Button;
