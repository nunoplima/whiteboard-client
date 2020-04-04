import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrown } from "@fortawesome/free-solid-svg-icons";
import "./Leaderboard.css";

const Leaderboard = ({ userId, leaderboard }) => {
    const [sortOrder, setSortOrder] = useState("desc");   

    const renderUsername = (name) => {
        const nameArr = name.split(" ");

        if (nameArr.length > 1 && window.innerWidth <= 414 && name.length >= 12) {
            return `${nameArr[0]} ${nameArr[nameArr.length - 1].charAt(0)}.`;
        }
        return name;
    }

    const renderLeaderboard = () => (
        leaderboard.sort((a, b) => sortOrder === "asc" ? a.points - b.points : b.points - a.points)
            .map(el => (
                <tr key={el.id} className={userId === el.id ? "userResult" : ""}>
                    <td>{el.rank}</td>
                    <td>{el.rank === 1 ? (
                        <div>
                            {renderUsername(el.username)}
                            <FontAwesomeIcon className="crownIcn" icon={faCrown} />
                        </div> 
                        ) : renderUsername(el.username)}
                    </td>
                    <td>{el.points}</td>
                    <td>{el[1] || "-"}</td>
                    <td>{el[2] || "-"}</td>
                    <td>{el[3] || "-"}</td>
                    <td className="leaderboardWods">{el.completed}</td>
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
                                <th scope="col" id="leaderboardPosition">#</th>
                                <th scope="col" id="leaderboardAthlete">Athlete</th>
                                <th scope="col" id="leaderboardScore">
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
                                <th scope="col" className="leaderboardWods">Wods</th>
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