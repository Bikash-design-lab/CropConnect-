import React from 'react';
import { ToastContainer as ReactToastifyContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ReactToastContainer = () => {
    return (
        <ReactToastifyContainer
            position="bottom-right"  // bottom-right position
            autoClose={2000}         // 2 seconds
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable={false}
            pauseOnHover={false}
            limit={1}
        />
    );
};

export default ReactToastContainer;

