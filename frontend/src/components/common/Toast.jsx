import { AlertCircle, CheckCircle, Info, AlertTriangle, X } from '../../utils/icons';

const Toast = ({ message, type = 'success', onClose }) => {
  const types = {
    error: {
      backgroundColor: 'bg-physio-terrakotta',
      icon: <AlertCircle className="w-5 h-5" />
    },
    success: {
      backgroundColor: 'bg-physio-sage',
      icon: <CheckCircle className="w-5 h-5" />
    },
    warning: {
      backgroundColor: 'bg-physio-kupfer',
      icon: <AlertTriangle className="w-5 h-5" />
    },
    info: {
      backgroundColor: 'bg-physio-bluegray',
      icon: <Info className="w-5 h-5" />
    }
  };

  const { backgroundColor, icon } = types[type] || types.success;

  return (
    <div
      className={`
        flex items-center 
        ${backgroundColor} 
        text-white px-4 py-3 rounded-lg shadow-lg
        min-w-[300px] max-w-[400px]
        animate-fade-in
      `}
    >
      <div className="mr-2">
        {icon}
      </div>
      <p className="mr-4 flex-grow">{message}</p>
      <button
        onClick={onClose}
        className="ml-auto p-1 hover:bg-white/20 rounded-full transition-colors"
        aria-label="Close notification"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Toast;