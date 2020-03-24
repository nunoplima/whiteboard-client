import React, { useState } from "react";
import moment from "moment";
import { scoreObj, scoreOrderObj } from "../../constants/constants";
import "./WodResults.css";


const WodResults = ({ userId, wod }) => {
    const [sortOrder, setSortOrder] = useState(scoreOrderObj[wod.score_type]);   

    const isEdited = (result) => (
        result.created_at !== result.updated_at
    );

    const renderWodResults = () => {
        const { results } = wod;
        return results.sort((a, b) => sortOrder === "asc" ? a.result - b.result : b.result - a.result)
            .map((result, idx) => (
                <tr key={idx} id="row" className={userId === result.user_id ? "userResult" : ""}>
                    <td>{result.rank}</td>
                    <td>{result.username}</td>
                    <td>{`${result.result} ${scoreObj[wod.score_type]}`}</td>
                    <td>
                        {`${moment(result.updated_at).fromNow()}${isEdited(result) ? ` - edited` : ""}`}
                    </td>
                </tr>
            )
        );
    };
    
    return (
        <div className="container" id="resultsTable">
            <table className="table table-sm">
                <thead>
                    <tr>
                        <th scope="col" id="position">#</th>
                        <th scope="col" id="athlete">Athlete</th>
                        <th scope="col" id="score">
                            <div className="scoreType">
                                {wod.score_type.charAt(0).toUpperCase() + wod.score_type.substring(1)}
                                <div id="sortOrder">
                                    {sortOrder === "desc" ? (
                                        <div className="font-awesome-icons-div" 
                                            onClick={() => setSortOrder("asc")}>
                                            <div className="light-arrow">▲</div>
                                            <div className="bold-arrow">▼</div>
                                        </div>
                                    ) : (
                                        <div className="font-awesome-icons-div"
                                            onClick={() => setSortOrder("desc")}>
                                            <div className="bold-arrow">▲</div>
                                            <div className="light-arrow">▼</div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </th>
                        <th scope="col" id="submitDate">Submitted</th>
                    </tr>
                </thead>

                <tbody>
                    {renderWodResults()}
                </tbody>
            </table>
        </div>
    )
};

export default WodResults;