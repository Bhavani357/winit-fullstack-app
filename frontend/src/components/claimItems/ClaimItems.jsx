import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import './ClaimItems.css';

const ClaimItems = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isAddServiceClicked, setAddServiceClicked] = useState(false);
    const [claimItemsData, setClaimItemsData] = useState([]);
    const [formData, setFormData] = useState({
        claimId: '',
        expenseCategory: '',
        name: '',
        amount: '',
        startDate: '',
        endDate: ''
    });

    const claim = location.state?.claim;

    useEffect(() => {
        if (claim) {
            setFormData(prevData => ({
                ...prevData,
                claimId: claim.id,
                expenseCategory: '',
                name: '',
                amount: '',
                startDate: '',
                endDate: ''
            }));
            fetchClaimItems(claim.id);
        }
    }, [claim]);

    const handlePopUpToggle = () => {
        setAddServiceClicked(!isAddServiceClicked);
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [id]: value
        }));
    };

    const handleCheckboxChange = (category) => {
        setFormData(prevData => ({
            ...prevData,
            expenseCategory: category
        }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            claimId: formData.claimId,
            expenseCategory: formData.expenseCategory,
            name: formData.name,
            amount: parseFloat(formData.amount),
            startDate: formData.startDate,
            endDate: formData.endDate
        };

        try {
            const response = await fetch('http://localhost:5000/api/v1/users/claimItem', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                console.log('Service claim item added successfully');
                setAddServiceClicked(false);
                fetchClaimItems(formData.claimId); // Refresh the list after adding
            } else {
                console.error('Failed to add service claim item');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const fetchClaimItems = async (claimId) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/v1/users/getClaim/${claimId}`);
            console.log(response.data);
            setClaimItemsData(response.data.claim);
        } catch (error) {
            console.error('Error fetching claim items:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:5000/api/v1/users/deleteClaimItem/${id}`);
            if (response.status === 200) {
                console.log('Claim item deleted successfully');
                fetchClaimItems(formData.claimId); // Refresh the list after deletion
            } else {
                console.error('Failed to delete claim item');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleBackToHome = () => {
        navigate('/');
    };

    const handleSaveClaims = () => {
        // Implement save functionality here
    };

    return (
        <div>
            <div className='top-container'>
                <label htmlFor='claimDate'>Claim Date</label>
                <input type='text' id='claimDate' value={claim ? claim.claimDate : ''} readOnly />
                <label htmlFor='description'>Claim Description</label>
                <input type='text' id='description' value={claim ? claim.description : ''} readOnly /><br/>
                <label htmlFor='startDate'>Activity Start Date</label>
                <input type='date' id='startDate' value={formData.startDate} onChange={handleInputChange} />
                <label htmlFor='endDate'>Activity End Date</label>
                <input type='date' id='endDate' value={formData.endDate} onChange={handleInputChange} /><br/>
                <label htmlFor='claimtype'>Claim Type</label>
                <input type='text' id='claimtype' value={claim ? claim.claimType : ''} readOnly /><br/>
            </div>
            <div className='bottom-container'>
                <div className='add-service-claim-item'>
                    <p>Service Claim Items</p>
                    <button onClick={handlePopUpToggle}>Add Service Claim Item</button>
                </div>
                <hr />
                <table className='table-container'>
                    <thead>
                        <tr>
                            <th>S.NO</th>
                            <th>Expense Category</th>
                            <th>Name</th>
                            <th>From</th>
                            <th>To</th>
                            <th>Expense Amount</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {claimItemsData.map((item, index) => (
                            <tr key={item.id}>
                                <td>{index + 1}</td>
                                <td>{item.expenseCategory}</td>
                                <td>{item.name}</td>
                                <td>{item.startDate}</td>
                                <td>{item.endDate}</td>
                                <td>{item.amount}</td>
                                <td>
                                    <i 
                                        className="fas fa-trash-alt" 
                                        onClick={() => handleDelete(item.id)}
                                        style={{ cursor: 'pointer', color: 'red' }}
                                    ></i>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className='buttons-container'>
                <button onClick={handleBackToHome}>Back</button>
                <button onClick={handleSaveClaims}>Save as Draft</button>
                <button>Submit For Approval</button>
            </div>
            {isAddServiceClicked && (
                <div className='modal-overlay' onClick={handlePopUpToggle}>
                    <div className='modal-content' onClick={e => e.stopPropagation()}>
                        <span className='close-button' onClick={handlePopUpToggle}>&times;</span>
                        <h3>New Service Claim Item</h3>
                        <hr />
                        <form onSubmit={handleFormSubmit}>
                            <h3>Expense Category</h3>
                            <input 
                                type='radio' 
                                id='expenseCategoryTravel' 
                                name='expenseCategory'
                                checked={formData.expenseCategory === 'travel'}
                                onChange={() => handleCheckboxChange('travel')}
                            />
                            <label htmlFor='expenseCategoryTravel'>Travel</label>

                            <input 
                                type='radio' 
                                id='expenseCategoryFood' 
                                name='expenseCategory'
                                checked={formData.expenseCategory === 'food'}
                                onChange={() => handleCheckboxChange('food')}
                            />
                            <label htmlFor='expenseCategoryFood'>Food</label>

                            <input 
                                type='radio' 
                                id='expenseCategoryTransportation' 
                                name='expenseCategory'
                                checked={formData.expenseCategory === 'transportation'}
                                onChange={() => handleCheckboxChange('transportation')}
                            />
                            <label htmlFor='expenseCategoryTransportation'>Transportation</label><br/>

                            <input 
                                type='radio' 
                                id='expenseCategoryVenueBooking' 
                                name='expenseCategory'
                                checked={formData.expenseCategory === 'venueBooking'}
                                onChange={() => handleCheckboxChange('venueBooking')}
                            />
                            <label htmlFor='expenseCategoryVenueBooking'>Venue Booking</label>

                            <input 
                                type='radio' 
                                id='expenseCategoryMiscellaneous' 
                                name='expenseCategory'
                                checked={formData.expenseCategory === 'miscellaneous'}
                                onChange={() => handleCheckboxChange('miscellaneous')}
                            />
                            <label htmlFor='expenseCategoryMiscellaneous'>Miscellaneous</label><br/>

                            <label htmlFor='name'>Name</label><br/>
                            <input 
                                type='text' 
                                id='name' 
                                value={formData.name}
                                onChange={handleInputChange}
                            /><br/>

                            <label htmlFor='amount'>Expense Amount</label><br/>
                            <input 
                                type='number' 
                                id='amount' 
                                value={formData.amount}
                                onChange={handleInputChange}
                            /><br/>

                            <label htmlFor='startDate'>Start Date</label><br/>
                            <input 
                                type='date' 
                                id='startDate' 
                                value={formData.startDate}
                                onChange={handleInputChange}
                            /><br/>

                            <label htmlFor='endDate'>End Date</label><br/>
                            <input 
                                type='date' 
                                id='endDate' 
                                value={formData.endDate}
                                onChange={handleInputChange}
                            /><br/>

                            <button type='submit'>Add Service Claim</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ClaimItems;
