import React from "react";
import "../index.css";


function ResultCard({title, icon, children, className= ""}) {

    return(
        <div className={`result-card ${className}`}>  
         <div className="result-card-header">
            <span className="result-card-icon">{icon}</span>
            <h4>{title}</h4>
            </div>

            <div className="result-card-content">
                {children}
            </div>   
        </div>
    );
}


export default ResultCard;