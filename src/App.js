import VideoPlayer from './VideoPlayer';
import VideoStream from './VideoStream';

function App() {
  return (
    <div className="container-fluid">
      <header className="row" style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        {/* uncomment this VideoPlayer to see the local file in PIP */}
        <div className="col-md-6">
          <VideoPlayer />
        </div>
        <div className="col-md-6">
          <VideoStream />
        </div>
      </header>
    </div>
  );
}

export default App;
