import React from "react";
import requireAuth from "../../hoc/requiresAuth";
import moment from "moment";
import WodDate from "../WodDate/WodDate";
import WodDescription from "../WodDescription/WodDescription";
import WodResults from "../WodResults/WodResults";
import Button from "../Button/Button";
import "./Board.css";

const Board = ({ user, wods, currentIndex, onDateChange, onResultSubmit, setModalVisibility }) => {
    
    const renderButton = () => {
        const wod = wods[currentIndex];
        const today = moment().format("YYYY-MM-DD");
        const wodDay = moment(wod.scheduled_date).format("YYYY-MM-DD");
        const isLast = currentIndex === 0;
        if (today === wodDay || isLast) return (
            <Button userId={user.id} results={wod.results} wodId={wod.id} onResultSubmit={onResultSubmit} /> 
        )
    }

    return (
        <>
            {/* <h1>private route {user.username}</h1> */}
            
            <WodDate
                wods={wods}
                date={wods[currentIndex].scheduled_date}
                isLast={currentIndex === 0}
                isFirst={currentIndex === wods.length - 1}
                onDateChange={onDateChange}
            />
            
            <div className="wodAndResultsContainer">
    
                <WodDescription wod={wods[currentIndex]} setModalVisibility={setModalVisibility} />

                {/* <hr /> */}
    
                <WodResults userId={user.id} wod={wods[currentIndex]} />
    
            </div>


            {renderButton()}

        </>
    )
};

export default requireAuth(Board);