import React, { useEffect, useRef, useState } from 'react';
import SimplePeer from 'simple-peer';

const VideoStream = () => {
    const localVideoRef = useRef();
    const remoteVideosRef = useRef({});
    const [peers, setPeers] = useState({});
    const [isPipEnabled, setIsPipEnabled] = useState(false);

    const handleClick = () => {
        if (document.pictureInPictureElement) {
            document.exitPictureInPicture().then(() => {
                // Set the state to indicate that PIP mode is disabled
                setIsPipEnabled(false);
            }).catch((error) => {
                console.error('Error while exiting PIP:', error);
            });
        } else {
            // 
            localVideoRef.current
                .requestPictureInPicture()
                .then(() => {
                    setIsPipEnabled(true);
                })
                .catch((error) => {
                    console.error('Error while entering PIP:', error);
                });
        }
    };

    useEffect(() => {
        const getUserMedia = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
                localVideoRef.current.srcObject = stream;

                // Initialize the WebRTC peer connection as an initiator
                const peer = new SimplePeer({ initiator: true, stream });

                // Add the local peer to the peers state
                setPeers((prevPeers) => ({
                    ...prevPeers,
                    [peer._id]: peer,
                }));

                peer.on('signal', (data) => {
                    // Send the signal data to the remote peer using your signaling mechanism (e.g., socket, Firebase)
                    console.log('Signal data:', data);
                });

                peer.on('stream', (remoteStream) => {
                    // Create a new video element for the remote peer's video stream
                    const remoteVideo = document.createElement('video');
                    remoteVideo.srcObject = remoteStream;
                    remoteVideo.autoPlay = true;
                    remoteVideo.playsInline = true;
                    remoteVideosRef.current[peer._id] = remoteVideo;
                    document.body.appendChild(remoteVideo);
                });

                peer.on('connect', () => {
                    // Connection established
                });

                peer.on('data', (data) => {
                    // Handle data received from the remote peer
                });

                peer.on('close', () => {
                    // Connection closed
                    removePeer(peer._id);
                });

                peer.on('error', (err) => {
                    console.error('Peer error:', err);
                    removePeer(peer._id);
                });
            } catch (err) {
                console.error('Error accessing user media:', err);
            }
        };

        getUserMedia();

        // Clean up all peers when the component is unmounted
        return () => {
            Object.values(peers).forEach((peer) => {
                peer.destroy();
            });
        };
    }, []);

    // Function to handle the received signal from the other peer
    const handleSignal = (signalData, remotePeerId) => {
        // Get the local peer associated with the remote peer ID
        const localPeer = peers[remotePeerId];
        if (localPeer) {
            localPeer.signal(signalData);
        } else {
            // Initialize a new WebRTC peer connection as a receiver
            const peer = new SimplePeer({ initiator: false, stream: localVideoRef.current.srcObject });
            peer._id = remotePeerId;

            // Add the new peer to the peers state
            setPeers((prevPeers) => ({
                ...prevPeers,
                [remotePeerId]: peer,
            }));

            peer.on('signal', (data) => {
                // Send the signal data to the remote peer using your signaling mechanism (e.g., socket, Firebase)
                console.log('Signal data:', data);
            });

            peer.on('stream', (remoteStream) => {
                // Create a new video element for the remote peer's video stream
                const remoteVideo = document.createElement('video');
                remoteVideo.srcObject = remoteStream;
                remoteVideo.autoPlay = true;
                remoteVideo.playsInline = true;
                remoteVideosRef.current[remotePeerId] = remoteVideo;
                document.body.appendChild(remoteVideo);
            });

            peer.on('connect', () => {
                // Connection established
            });

            peer.on('data', (data) => {
                // Handle data received from the remote peer
            });

            peer.on('close', () => {
                // Connection closed
                removePeer(remotePeerId);
            });

            peer.on('error', (err) => {
                console.error('Peer error:', err);
                removePeer(remotePeerId);
            });

            // Pass the received signal data to the new peer
            peer.signal(signalData);
        }
    };

    // Function to remove a peer when the connection is closed or an error occurs
    const removePeer = (peerId) => {
        if (peers[peerId]) {
            peers[peerId].destroy();
            delete peers[peerId];
            // Remove the remote video element associated with the closed peer
            const remoteVideo = remoteVideosRef.current[peerId];
            if (remoteVideo) {
                remoteVideo.remove();
                delete remoteVideosRef.current[peerId];
            }
            setPeers({ ...peers });
        }
    };

    return (
        <div style={{ width: '500px', height: '300px' }}>
            <h2>Your Video</h2>
            <video ref={localVideoRef} width="100%" height="100%" autoPlay playsInline />
            {/* <h2>Remote Videos</h2>
            <div>
                {Object.keys(peers).map((peerId) => (
                    <video key={peerId} ref={remoteVideosRef.current[peerId]} autoPlay playsInline />
                ))}
            </div> */}
            <button style={{ cursor: "pointer", fontSize: "large" }} onClick={handleClick}>
                {isPipEnabled ? 'Exit PIP' : 'Use PIP'}
            </button>
        </div>
    );
};

export default VideoStream;
