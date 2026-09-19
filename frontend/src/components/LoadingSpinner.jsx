import React from 'react';
import '../index.css';


function LoadingSpinner() {
    return(
        <div className="loading-container">
            <div className="spinner">
                <div>
          {/* <h3>AI is analyzing your message...</h3>
          <p>Extracting actions, deadlines, and a suggested reply.</p> */}
                </div>
            </div>

        </div>
    )
}

export default LoadingSpinner;