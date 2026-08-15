import { useNavigate } from 'react-router-dom';
import LoginModal from '../components/common/LoginModal';

export default function LoginPage() {
  const navigate = useNavigate();

  const handleClose = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen w-full bg-white flex items-center justify-center relative overflow-hidden">
      {/* Pure white background with LoginModal centered */}
      <LoginModal isOpen={true} onClose={handleClose} isWhitePage={true} />
    </div>
  );
}
