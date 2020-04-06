import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import "./WodDescription.css";


const WodDescription = ({ wod, setModalVisibility, setDescriptionVisibility, isDescriptionVisible }) => {

    const renderWod = () => (
        wod.description.split("\n").map((sentence, idx) => <p key={idx}>{sentence}</p>)
    );

    return (
        <>
        
            <div className={`wodDescriptionContainer ${isDescriptionVisible ? "" : "hide"}`}>

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

                <div className="wodDescriptionInnerContainer">
                    <div className="wodDescription">
                        {renderWod()}
                    </div>
                    <FontAwesomeIcon className="slideBtn" icon={faChevronUp} onClick={() => setDescriptionVisibility(false)} />
                </div>

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

            <FontAwesomeIcon className={`slideBtn slideBtnUp ${isDescriptionVisible ? "hide" : ""}`} icon={faChevronDown} onClick={() => setDescriptionVisibility(true)} />         
        </>
    );
};

export default WodDescription;
