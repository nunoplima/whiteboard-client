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

            {
                wod.logo_url ? (
                    <div className="leftDiv boxDiv">
                        <a href={wod.box_url} target="_blank" rel="noopener noreferrer">
                            <img className="boxLogo" src={wod.logo_url} alt="Day's wod sponsor logo" />
                        </a>
                    </div>
                    ) : (
                        <div className="leftDiv"></div>
                    )
            }

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
