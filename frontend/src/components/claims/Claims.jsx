import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import './Claims.css';

const Claims = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [activeTab, setActiveTab] = useState(location.pathname);

    useEffect(() => {
        setActiveTab(location.pathname);
    }, [location.pathname]);

    const handleTabClick = (path) => {
        setActiveTab(path);
        navigate(path);
    };

    const handleAddClaims = () => {
        navigate('/claimItems');
    };

    return (
        <div className="claims-header">
            <h1>Claims</h1>
            <div className='home-buttons-container'>
                <div className="tabs-container">
                    <button
                        className={`tab-button ${activeTab === '/savedClaims' ? 'active' : ''}`}
                        onClick={() => handleTabClick('/savedClaims')}
                    >
                        Saved
                    </button>
                    <button
                        className={`tab-button ${activeTab === '/submittedClaims' ? 'active' : ''}`}
                        onClick={() => handleTabClick('/submittedClaims')}
                    >
                        Submitted
                    </button>
                </div>
                <div>
                    <button onClick={handleAddClaims} className='add-button'>Add</button>
                </div>
            </div>
            {/* Render nested routes */}
            <Outlet />
        </div>
    );
}

export default Claims;
