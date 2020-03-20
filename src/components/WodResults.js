import React, { useState } from "react";
import moment from "moment";
import { scoreObj } from "../constants/constants";
import "./WodResults.css";


const WodResults = ({ userId, wod }) => {
    const [sortOrder, setSortOrder] = useState("asc");   

    const renderWodResults = () => {
        const { results } = wod;
        return results.sort((a, b) => sortOrder === "asc" ? a.result - b.result : b.result - a.result)
            .map((result, idx) => (
                <tr key={idx} className={userId === result.user_id ? "userResult" : ""}>
                    <td>{result.username}</td>
                    <td>{`${result.result} ${scoreObj[wod.score_type]}`}</td>
                    <td>{moment(result.updated_at).fromNow()}</td>
                </tr>
            )
        )
    };
    
    return (
        <table>
            <thead>
                <tr>
                    <th>Athlete</th>
                    <th className="scoreType">{wod.score_type.charAt(0).toUpperCase() + wod.score_type.substring(1)}
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
                    </th>
                    <th>Submitted</th>
                </tr>
            </thead>

            <tbody>
                {renderWodResults()}
            </tbody>
        </table>
    )
};

export default WodResults;