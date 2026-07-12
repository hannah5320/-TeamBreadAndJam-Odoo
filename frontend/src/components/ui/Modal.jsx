import { useEffect } from 'react';
import { FiX } from 'react-icons/fi';

function Modal({ isOpen, title, onClose, children }) {
  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <style>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(15, 23, 42, 0.5);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          box-sizing: border-box;
          animation: fadeIn 0.2s ease-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .modal-content {
          background-color: #ffffff;
          border-radius: 12px;
          width: 100%;
          max-width: 500px;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          display: flex;
          flex-direction: column;
          animation: slideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          box-sizing: border-box;
          overflow: hidden;
        }

        @keyframes slideUp {
          from { transform: translateY(16px); }
          to { transform: translateY(0); }
        }

        .modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 24px;
          border-bottom: 1px solid #f1f5f9;
        }

        .modal-title {
          font-size: 18px;
          font-weight: 700;
          color: #0f172a;
          margin: 0;
        }

        .modal-close-btn {
          background: none;
          border: none;
          color: #64748b;
          font-size: 20px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 6px;
          border-radius: 50%;
          transition: all 0.2s ease;
        }

        .modal-close-btn:hover {
          background-color: #f1f5f9;
          color: #0f172a;
        }

        .modal-body {
          padding: 24px;
          overflow-y: auto;
          max-height: calc(100vh - 200px);
          color: #334155;
          font-size: 14px;
          line-height: 1.5;
        }
      `}</style>
      
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="modal-header">
          <h3 className="modal-title">{title}</h3>
          <button type="button" className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <FiX />
          </button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;
