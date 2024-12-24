import { useNavigate } from 'react-router-dom';
import { X } from '../../utils/icons';

const CloseHeader = ({ title }) => {
  const navigate = useNavigate();

  return (
    <div>
      <h2>{title}</h2>
      <button
        onClick={() => navigate('/')}
        className='p-2 text-physio-chocolate hover:text-physio-cream transition-colors duration-200'
      >
        <X className='h-6 w-6' />

      </button>
    </div>
  );
};
export default CloseHeader;