import { X } from '../../utils/icons';

const CloseHeader = ({ onClose }) => {
  return (
    <button
      onClick={onClose}
      className='p-2 bg-physio-safari/75 text-physio-cream hover:bg-physio-safari/40 hover:text-physio-mocha rounded-full transition-colors duration-200'
      aria-label="Close"
    >
      <X className='h-6 w-6' />
    </button>
  );
};

export default CloseHeader;