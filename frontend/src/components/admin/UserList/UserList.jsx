import React, { useEffect, useState } from 'react';
import './UserList.css';
import Modal from '../Action/Modal';
import axios from 'axios';

const UserLists = ({ users, onDelete, onUserUpdate }) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [action, setAction] = useState('');

    const handleEditClick = (user) => {
        setSelectedUser(user);
        setModalOpen(true);
        setAction('Edit');
    };

    return (
        <div className='UserLists'>
            <div className="table-header">
                <div className="header-columns" style={{ width: '5%' }}>SI-NO</div>
                <div className="header-columns" style={{ width: '15%' }}>Image</div>
                <div className="header-columns">Name</div>
                <div className="header-columns">Email</div>
                <div className="header-columns">Mobile</div>
                <div className="header-columns" style={{ width: '10%' }}>Action</div>
            </div>
            {users.length > 0 ? (
                users.map((user, index) => (
                    <div className="table-body" key={user._id}>
                        <div className="body-columns" style={{ width: '5%' }}>{index + 1}</div>
                        <div className="body-columns" style={{ width: '15%' }}>
                            <img src={user.profileImage || ''} alt="User" className="user-profile-image" />
                        </div>
                        <div className="body-columns">{user.userName}</div>
                        <div className="body-columns">{user.email}</div>
                        <div className="body-columns">{user.mobile}</div>
                        <div className="body-columns" style={{ width: '10%', justifyContent: 'space-evenly' }}>
                            <i className="fas fa-edit" onClick={() => handleEditClick(user)} style={{cursor:'pointer'}}></i>
                            <i className="fas fa-trash-alt" onClick={() => onDelete(user._id)} style={{cursor:'pointer'}}></i>
                        </div>
                    </div>
                ))
            ) : (
                <p>No users found</p>
            )}
            {isModalOpen && (
                <Modal
                    onClose={() => {
                        setModalOpen(false);
                        onUserUpdate();
                    }}
                    user={selectedUser}
                    actionType={action}
                />
            )}
        </div>
    );
};

export default UserLists;
