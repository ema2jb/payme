import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Card from './Card' 


function App() {
  return (
    <div>
      <Router>
        <Routes>
            <Route path='/' exact element={<Card />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
