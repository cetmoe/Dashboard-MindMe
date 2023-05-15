import React from 'react';

interface IModal {
  id: string;
  fn: () => void;
  title?: string;
  body?: string;
  btnBody?: string;
}

const Modal = ({
  id,
  title,
  body,
  btnBody,
  fn,
}: IModal) => {
  return (
    <div
      className='modal fade'
      id={id}
      tabIndex={-1}
      data-bs-backdrop='true'
    >
      <div className='modal-dialog'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h1 className='modal-title'>{title}</h1>
            <button
              type='button'
              className='btn-close'
              data-bs-dismiss='modal'
              aria-label='Close'
            ></button>
          </div>
          <div className='modal-body'>{body}</div>
          <div className='modal-footer'>
            <button
              type='button'
              className='btn btn-outline-secondary'
              data-bs-dismiss='modal'
            >
              Close
            </button>
            <button
              type='button'
              className='btn btn-outline-primary'
              onClick={fn}
              data-bs-dismiss='modal'
            >
              {btnBody}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
