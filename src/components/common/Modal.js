import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { hideModal } from '../../redux/reducers/uiReducer';
import './Modal.css';

const Modal = ({ children, onClose, size = 'medium', closeOnBackdrop = true }) => {
  const dispatch = useDispatch();

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget && closeOnBackdrop) {
      onClose ? onClose() : dispatch(hideModal());
    }
  };


  React.useEffect(() => {
    const handleKeyDownInternal = (e) => {
      if (e.key === 'Escape') {
        onClose ? onClose() : dispatch(hideModal());
      }
    };

    document.addEventListener('keydown', handleKeyDownInternal);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDownInternal);
      document.body.style.overflow = 'unset';
    };
  }, [onClose, dispatch]);

  const sizeClasses = {
    small: 'modal-small',
    medium: 'modal-medium',
    large: 'modal-large',
    fullscreen: 'modal-fullscreen'
  };

  return (
    <AnimatePresence>
      <motion.div
        className="modal-overlay"
        onClick={handleBackdropClick}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <motion.div
          className={`modal-content ${sizeClasses[size]}`}
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 20 }}
          transition={{
            type: 'spring',
            damping: 25,
            stiffness: 300
          }}
          role="dialog"
          aria-modal="true"
        >
          <button
            className="modal-close"
            onClick={() => onClose ? onClose() : dispatch(hideModal())}
            aria-label="Close modal"
          >
            ×
          </button>
          <div className="modal-body">
            {children}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Modal;