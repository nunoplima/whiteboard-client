import React from "react";

const WodDescription = ({ wod }) => {
    const renderWod = () => (
        wod.description.split("\n").map((sentence, idx) => <p key={idx}>{sentence}</p>)
    );
    
    return (
        <div className="wodDescription">
            {renderWod()}
        </div>
    )
};

export default WodDescription;