import React from "react";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { TOMORROW, YESTERDAY } from "../constants/constants";
import "./WodDate.css";

const WodDate = ({ wods, date, isFirst, isLast, onDateChange }) => {
    const handleDateChange = (e) => {
        const arrowId = e.currentTarget.id;
        if (arrowId === "leftArrow") {
            onDateChange(YESTERDAY);
        } else  if (arrowId === "rightArrow") {
            onDateChange(TOMORROW);
        }
    };

    return (
        <div className="dateContainer">
            
            <div id="leftArrow" className={isFirst ? "arrow inactive" : "arrow"} onClick={!isFirst ? handleDateChange : null}>
                <FontAwesomeIcon icon={faChevronLeft}/>
            </div>
            
            <div>WOD {moment(date).format("DD/MM")}</div>
            
            <div id="rightArrow" className={isLast ? "arrow inactive" : "arrow"} onClick={!isLast ? handleDateChange : null}>
                <FontAwesomeIcon icon={faChevronRight}/>
            </div>
        </div>

    ) 
};

export default WodDate;
