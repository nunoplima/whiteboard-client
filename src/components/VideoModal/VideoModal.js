import React from "react";
import Modal from "react-responsive-modal";
import "./VideoModal.css";
import ReactPlayer from "react-player";

const VideoModal = ({ isModalVisible, setModalVisibility, videoUrl }) => {
    const modalStyles = {
        closeButton: {
            background: "#7b7b7b",
            outline: "none",
            borderRadius: "100px",
        },
        modal: {
            padding: "unset"
        }
    };

    return (
        <Modal
            open={isModalVisible}
            styles={modalStyles}
            onClose={() => setModalVisibility(false)}
            center>
            <div className="playerWrapper">
                <ReactPlayer
                    className="reactPlayer"
                    url={videoUrl}
                    playing
                    controls
                    onEnded={() => setModalVisibility(false)}
                />
            </div>
        </Modal>
    );
};

export default VideoModal;
