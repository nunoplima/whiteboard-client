import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import "./WodDescription.css";


const WodDescription = ({ wod, setModalVisibility }) => {
    const renderWod = () => (
        wod.description.split("\n").map((sentence, idx) => <p key={idx}>{sentence}</p>)
    );

    return (
        <div className="wodDescriptionContainer">

            <div className="mockDiv"></div>

            <div className="wodDescription">{renderWod()}</div>

            <div className="videoLinkDiv">
                {wod.video_url ? (
                    <>
                        <div className="videoIcon" onClick={() => setModalVisibility(true)}>
                            <FontAwesomeIcon
                                icon={faYoutube}
                                style={{ fontSize: "20px" }}
                            />
                        </div>
                        <p onClick={() => setModalVisibility(true)}>Demo video</p>
                    </>
                ) : null}
            </div>

        </div>
    );
};

export default WodDescription;
