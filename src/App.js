import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import './App.css';

function App() {
  return (
    <div>
      <Sidebar />
      <div className="main">
        <Header />
      </div>
    </div>
  );
}

export default App;
