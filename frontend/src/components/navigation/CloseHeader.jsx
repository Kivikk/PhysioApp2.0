// src/components/navigation/CloseHeader.jsx
import { X } from '../../utils/icons';
import { useNavigate } from 'react-router-dom';

const CloseHeader = ({ onClose }) => {
  const navigate = useNavigate();

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      navigate(-1);
    }
  };

  return (
    <button
      onClick={handleClose}
      className="p-2 bg-physio-safari/75 text-physio-cream hover:bg-physio-safari/40 hover:text-physio-mocha rounded-full transition-colors duration-200"
      aria-label="Close"
    >
      <X className="h-6 w-6" />
    </button>
  );
};

export default CloseHeader;