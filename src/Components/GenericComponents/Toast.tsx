import React from 'react';

interface IToast {
  toastRef: React.RefObject<HTMLDivElement>;
  icon?: string;
  title?: string;
  message?: string;
}

const Toast = ({
  toastRef,
  icon,
  title,
  message,
}: IToast) => {
  const hideToast = () => {
    if (toastRef.current) {
      toastRef.current.classList.remove('show');
    }
  };

  return (
    <>
      <div className='toast-container position-fixed bottom-0 end-0 p-3'>
        <div
          ref={toastRef}
          className='toast fade'
          role='alert'
          aria-live='assertive'
          aria-atomic='true'
        >
          <div className='toast-header'>
            <img
              src={`/icons/${icon}.svg`}
              className='me-2'
              width='16'
              height='16'
            />
            <strong className='me-auto'>{title}</strong>
            <small>Just now</small>
            <button
              type='button'
              className='btn-close'
              data-bs-dismiss='toast'
              aria-label='Close'
              onClick={hideToast}
            ></button>
          </div>
          <div className='toast-body'>{message}</div>
        </div>
      </div>
    </>
  );
};

export default Toast;
