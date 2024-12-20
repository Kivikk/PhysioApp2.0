// components/navigation/PageHeader.jsx
import { useNavigate } from 'react-router-dom';

const PageHeader = ({ title }) => {
  const navigate = useNavigate();

  return (
    <div className='flex items-center justify-between p-4 bg-physio-tan'>
      <h2 className='text-xl font-semibold text-physio-chocolate'>{title}</h2>
      <button
        onClick={() => navigate('/')}
        className='p-2 text-physio-chocolate hover:text-physio-amber transition-colors duration-200'
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
};

export default PageHeader;