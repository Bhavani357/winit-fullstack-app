import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Claims from './components/claims/Claims';
import ClaimItems from './components/claimItems/ClaimItems';
import SavedClaims from './components/savedClaims/SavedClaims';
import SubmittedClaims from './components/SubmittedClaims/SubmittedClaims';

function App() {
  return (
    <div>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Claims />}>
            <Route path="savedClaims" element={<SavedClaims />} />
            <Route path="submittedClaims" element={<SubmittedClaims />} />
          </Route>
          <Route path="/claimItems" element={<ClaimItems />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
