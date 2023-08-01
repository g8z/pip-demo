import VideoPlayer from './VideoPlayer';

function App() {
  return (
    <div className="container-fluid">
      <header className="row" style={{ minHeight: "100vh" }}>
        {/* uncomment this VideoPlayer to see the local file in PIP */}
        <VideoPlayer />
      </header>
    </div >
  );
}

export default App;
