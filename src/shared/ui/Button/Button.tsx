import type { ButtonProps } from './Button.types';
import './Button.scss';

const Button: React.FC<ButtonProps> = ({ onClick, children, disabled = false, className = '' }) => {
  return (
    <button onClick={onClick} disabled={disabled} className={`button ${className}`}>
      {children}
    </button>
  );
};

export default Button;
