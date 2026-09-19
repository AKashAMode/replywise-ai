import React from "react";
import "../index.css";

const MAX_LENGTH = 5000;


function MessageInput({message, setMessage, onAnalyze,
     onClear, disabled}) {

  const handleChange = (event) => {
    setMessage(event.target.value);
  }

   const handleSubmit = (event) => {
    event.preventDefault();

    if(!disabled){
        onAnalyze();
    }
    
   }

        return(
            <>
            <form className="message-form" onSubmit={handleSubmit}>
             <div className="input-header">
                <label htmlFor="message">
                    Paste your message here
                </label>
             </div>

             <span className="character_count">
                {message.length}/{MAX_LENGTH}
             </span>

             <textarea 
             id="message"
             value={message}
             onChange={handleChange}
             maxLength={MAX_LENGTH}
             disabled={disabled}
             placeholder="Paste an email, SMS, notification, or any message here..."
             rows={9}
             />

             <div className="input-footer">
                <p>
                    💡 Tip: Include the complete message for better AI analysis.
                </p>

                <div className="input-actions">
                  {message && (
                    <button type="button" 
                    className="clear-button"
                    onClick={onClear}
                    disabled={disabled} 
                     >
                     Clear
                    </button>
                  )}

                  <button 
                  type="submit"
                  className="analyze-button"
                  disabled={disabled || !message.trim()}
                  >
                   {disabled ? "Analyzing..." : "Analyze with AI ->"}
                  </button>
                </div>
             </div>
             
            </form>
            </>
        )

}

export default MessageInput;