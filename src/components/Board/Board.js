import React from "react";
import requireAuth from "../../hoc/requiresAuth";
import moment from "moment";
import WodDate from "../WodDate/WodDate";
import WodDescription from "../WodDescription/WodDescription";
import WodResults from "../WodResults/WodResults";
import ResultForm from "../ResultForm/ResultForm";
import DoneForm from "../DoneForm/DoneForm";
import "./Board.css";

const Board = ({ user, wods, currentIndex, onDateChange, onResultSubmit, setModalVisibility }) => {
    
    const renderButton = () => {
        const wod = wods[currentIndex];
        const scoreType = wod.score_type;
        const today = moment().format("YYYY-MM-DD");
        const wodDay = moment(wod.scheduled_date).format("YYYY-MM-DD");
        const isLast = currentIndex === 0;
        if ((today === wodDay || isLast) && scoreType !== "other") {
            return (
                <ResultForm userId={user.id} results={wod.results} wodId={wod.id} onResultSubmit={onResultSubmit} /> 
            ); 
        } else if (today === wodDay || isLast) {
            return <DoneForm userId={user.id} results={wod.results} wodId={wod.id} onResultSubmit={onResultSubmit}/>
        }
    };

    const wod = wods[currentIndex];

    return (
        <>
            <WodDate
                wods={wods}
                date={wod.scheduled_date}
                isLast={currentIndex === 0}
                isFirst={currentIndex === wods.length - 1}
                onDateChange={onDateChange}
            />
            
            <div className="tableContainer">
    
                <WodDescription wod={wod} setModalVisibility={setModalVisibility} />

                <WodResults userId={user.id} wod={wod} />
    
            </div>


            {renderButton()}
        </>
    )
};

export default requireAuth(Board);