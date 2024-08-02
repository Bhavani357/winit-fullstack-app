import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './savedClaims.css';

const SavedClaims = () => {
    const [claims, setClaims] = useState([]);
    const [filteredClaims, setFilteredClaims] = useState([]);
    const [filterDate, setFilterDate] = useState('');
    const [filterAmount, setFilterAmount] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchClaims = async () => {
            try {
                const response = await axios.get('https://winit-task-backend-3.onrender.com/api/v1/users/getClaims');
                setClaims(response.data.claims);
                setFilteredClaims(response.data.claims);
            } catch (error) {
                console.error('Error fetching claims:', error);
            }
        };

        fetchClaims();
    }, []);

    const handleEdit = (claim) => {
        navigate('/claimItems', { state: { claim } });
    };

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`https://winit-task-backend-3.onrender.com/api/v1/users/deleteClaim/${id}`);
            if (response.status === 200) {
                setClaims(prevClaims => prevClaims.filter(claim => claim.id !== id));
                setFilteredClaims(prevClaims => prevClaims.filter(claim => claim.id !== id));
            } else {
                console.error('Failed to delete claim');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleFilterTable = () => {
        let filtered = claims;

        if (filterDate) {
            filtered = filtered.filter(claim => 
                new Date(claim.claimDate).toLocaleDateString() === new Date(filterDate).toLocaleDateString()
            );
        }

        if (filterAmount) {
            filtered = filtered.filter(claim => 
                claim.totalAmount >= parseFloat(filterAmount)
            );
        }

        setFilteredClaims(filtered);
    };

    return (
        <div>
            <div className="filters-container">
                <label>
                    Claim Date:<br/>
                    <input
                        type="date"
                        value={filterDate}
                        onChange={(e) => setFilterDate(e.target.value)}
                    />
                </label><br/>
                <label>
                    Minimum Amount:<br/>
                    <input
                        type="number"
                        value={filterAmount}
                        onChange={(e) => setFilterAmount(e.target.value)}
                    />
                </label>
                <button onClick={handleFilterTable} className='filter-button'>Filter</button>
            </div>
            <table className='table-container'>
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Claim No</th>
                        <th>Claim Date</th>
                        <th>Amount</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredClaims.map((claim) => (
                        <tr key={claim.id}>
                            <td>{claim.description}</td>
                            <td>{claim.id}</td>
                            <td>{claim.claimDate}</td>
                            <td>{claim.totalAmount}</td>
                            <td>
                                <button onClick={() => handleEdit(claim)}>
                                    <FaEdit />
                                </button>
                                <button onClick={() => handleDelete(claim.id)}>
                                    <FaTrash />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>    
        </div>
    );
}

export default SavedClaims;
