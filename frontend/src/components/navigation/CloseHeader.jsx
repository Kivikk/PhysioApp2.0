import { X } from '../../utils/icons';

const CloseHeader = ({ onClose }) => {
  return (
    <button
      onClick={onClose}
      className='p-2 bg-physio-sage text-physio-chocolate hover:bg-physio-chocolate/50 hover:text-physio-bluegray rounded-full transition-colors duration-200'
      aria-label="Close"
    >
      <X className='h-6 w-6' />
    </button>
  );
};

export default CloseHeader;