import { X } from '../../utils/icons';

const CloseHeader = ({ onClose }) => {
  return (
    <button
      onClick={onClose}
      className='p-2 text-physio-chocolate hover:text-physio-bluegray transition-colors duration-200'
      aria-label="Close"
    >
      <X className='h-6 w-6' />
    </button>
  );
};

export default CloseHeader;