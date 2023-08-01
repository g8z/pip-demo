# WebRTC PIP React App

## Overview

This is a simple React application that demonstrates the use of WebRTC (Web Real-Time Communication) to enable video streaming between two peers. The app allows you to access your local webcam video and stream it to another peer in real-time. It also provides an option to use Picture-in-Picture (PIP) mode for the local video stream.

## Prerequisites

Before setting up the project, ensure you have the following installed on your system:

- Node.js (version 12 or higher)
- npm (Node Package Manager)

## Setup


1. Clone the repository or download the project files to your local machine.

2. Navigate to the project directory using the terminal or command prompt.

3. Install the project dependencies by running the following command:

```bash
npm install
```

## Running the App

To run the application in development mode, use the following command:

```bash
npm start
```

This will start the development server, and the app will be accessible at `http://localhost:3000` in your web browser.

## How the App Works
## App Component (`App.js`)

The main entry point of the application is the App component. This component  renders two child components side by side:

1. `VideoPlayer`: This component displays a local video stream from a local file (`sample.mp4`) and provides a button to toggle Picture-in-Picture (PIP) mode for the video.

2. `VideoStream`: This component initializes a WebRTC peer connection as an initiator and allows streaming the local webcam video to another peer. It also provides a button to toggle Picture-in-Picture (PIP) mode for the local video stream.

## VideoPlayer Component (`VideoPlayer.js`)

The `VideoPlayer` component displays a video element with controls that play a local video file (`sample.mp4`). It provides functionality to enter and exit Picture-in-Picture (PIP) mode for the video stream.

## VideoStream Component (`VideoStream.js`)

The `VideoStream` component initializes a WebRTC peer connection as an initiator and allows streaming the local webcam video to another peer. It establishes a connection with the remote peer using SimplePeer library. When the connection is established, the local video stream is sent to the remote peer, and the remote peer's video stream is displayed on the page.

The component provides functionality to enter and exit Picture-in-Picture (PIP) mode for the local webcam video stream.

## Important Notes

1. WebRTC requires a secure context (HTTPS) in modern browsers. For development purposes, you can test the application on `http://localhost` as some browsers allow WebRTC on localhost.

2. This application uses the `navigator.mediaDevices.getUserMedia()` API to access the user's webcam and microphone. Make sure to grant the necessary permissions when prompted by your web browser.

3. The app uses the SimplePeer library to handle the WebRTC communication between peers. This library simplifies the peer-to-peer connection establishment and handling of video streams.

4. The `simple-peer` library has its limitations and might not work in all scenarios. For more advanced use cases, you may consider using a more comprehensive WebRTC library.

## Conclusion

This React WebRTC PIP app demonstrates how to establish a video streaming connection between two peers using WebRTC. It showcases how to access the local webcam video, send it to a remote peer, and display remote video streams on the page. Additionally, the app provides a feature to toggle Picture-in-Picture (PIP) mode for the local video stream.
