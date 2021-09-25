import * as React from 'react';
import { ToastContainer } from 'react-toastify';

/**
 * Componente encargado de renderizar mensaje de error
 */
const ToastError = () => {
  return (
    <div data-testid="toast-error">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};
export default ToastError;
