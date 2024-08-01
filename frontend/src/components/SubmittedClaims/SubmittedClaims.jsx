import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa'; // Importing icons from react-icons
import './SubmittedClaims.css'; // Add CSS for styling

const SubmittedClaims = () => {
    const [claims, setClaims] = useState([]);
    const [filteredClaims, setFilteredClaims] = useState([]);
    const [filterDate, setFilterDate] = useState('');
    const [filterAmount, setFilterAmount] = useState('');

    useEffect(() => {
        // Fetch data when component mounts
        const fetchClaims = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/v1/users/getClaims');
                console.log(response.data);
                setClaims(response.data.claims);
                setFilteredClaims(response.data.claims);
            } catch (error) {
                console.error('Error fetching claims:', error);
            }
        };

        fetchClaims();
    }, []);

    const handleEdit = (id) => {
        console.log('Edit claim with ID:', id);
        // Add your edit functionality here
    };

    const handleDelete = (id) => {
        console.log('Delete claim with ID:', id);
        // Add your delete functionality here
    };

    const handleFilterTable = () => {
        let filtered = claims;

        // Filter by claim date
        if (filterDate) {
            filtered = filtered.filter(claim => 
                new Date(claim.claimDate).toLocaleDateString() === new Date(filterDate).toLocaleDateString()
            );
        }

        // Filter by amount
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
                                <button onClick={() => handleEdit(claim.id)}>
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
};

export default SubmittedClaims;
