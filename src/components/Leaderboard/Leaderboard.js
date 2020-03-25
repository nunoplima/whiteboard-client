import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrown } from "@fortawesome/free-solid-svg-icons";
import "./Leaderboard.css";

const Leaderboard = ({ userId, leaderboard }) => {
    const [sortOrder, setSortOrder] = useState("desc");   

    const renderLeaderboard = () => (
        leaderboard.sort((a, b) => sortOrder === "asc" ? a[1].points - b[1].points : b[1].points - a[1].points)
            .map(el => (
                <tr key={el[0]} className={userId === el[1].user_id ? "userResult" : ""}>
                    <td>{el[1].rank}</td>
                    <td>{el[1].rank === 1 ? (
                        <div>
                            {el[0]}
                            <FontAwesomeIcon className="crownIcn" icon={faCrown} />
                        </div> 
                        ) : el[0]}
                    </td>
                    <td>{el[1].points}</td>
                    <td>{el[1][1] || "-"}</td>
                    <td>{el[1][2] || "-"}</td>
                    <td>{el[1][3] || "-"}</td>
                    <td>{el[1].completed}</td>
                </tr>
            ))       
    );

    return (
        <>
            <div className={"leaderboardTitle"}>Leaderboard</div>


            <div className={"tableContainer"}>

                <div className="container" id="leaderboardTable">
                    <table className="table table-sm">
                        <thead>
                            <tr>
                                <th scope="col" id="position">#</th>
                                <th scope="col" id="athlete">Athlete</th>
                                <th scope="col" id="score">
                                    <div className="scoreType">
                                        Points
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
                                <th scope="col">1st's</th>
                                <th scope="col">2nd's</th>
                                <th scope="col">3rd's</th>
                                <th scope="col">Wods</th>
                            </tr>
                        </thead>

                        <tbody>
                            {renderLeaderboard()}
                        </tbody>
                    </table>
                </div>
            </div>

       
        </>

    )
};

export default Leaderboard;