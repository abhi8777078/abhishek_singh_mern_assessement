import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar'

const Admin = () => {
    const [data, setData] = useState([]);
    const [editData, setEditData] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/v1/auth/alluser');
            const filteredData = response.data.filter(user => user.role === 'user');
            setData(filteredData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleDelete = async (id) => {
        // console.log(id)
        try {
            await axios.delete(`http://localhost:8080/api/v1/auth/delete/${id}`);
            window.location.reload()
            fetchData();
        } catch (error) {
            console.error('Error deleting data:', error);
        }
    };

    const handleAdd = async (newData) => {
        try {
            const response = await axios.post('http://localhost:8080/api/v1/auth/register', newData);
            console.log(response);
            // firstName: '', lastName: '', email: '', role: 'user' ,password:''
            fetchData();
        } catch (error) {
            console.error('Error adding data:', error);
        }
    };

    const handleUpdate = async () => {
        try {
            await axios.put(`http://localhost:8080/api/v1/auth/delete/${editData._id}`, editData);
            setEditData(null);
            fetchData();
        } catch (error) {
            console.error('Error updating data:', error);
        }
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSave = () => {
        if (editData._id) {
            handleUpdate();
        } else {
            handleAdd(editData);
        }
    };

    return (
        <>
            <Navbar />
            <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Data Table</h1>

            <button
                className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
                onClick={() => setEditData({ firstName: '', lastName: '', email: '', role: 'user' ,password:''})}
            >
                Add New Data
            </button>

            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">First Name</th>
                        <th className="py-2 px-4 border-b">Last Name</th>
                        <th className="py-2 px-4 border-b">Email</th>
                        <th className="py-2 px-4 border-b">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item._id}>
                            <td className="py-2 px-4 border-b">{item.firstName}</td>
                            <td className="py-2 px-4 border-b">{item.lastName}</td>
                            <td className="py-2 px-4 border-b">{item.email}</td>
                            <td className="py-2 px-4 border-b">
                                <button
                                    className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                                    onClick={() => setEditData(item)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="bg-red-500 text-white px-2 py-1 rounded"
                                    onClick={() => handleDelete(item._id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {editData && (
                <div className="mt-4">
                    <h2 className="text-xl font-bold mb-2">{editData._id ? 'Edit Data' : 'Add New Data'}</h2>
                    <div className="mb-2">
                        <input
                            className="border px-2 py-1 rounded w-full"
                            type="text"
                            placeholder="First Name"
                            value={editData.firstName}
                            onChange={(e) => setEditData({ ...editData, firstName: e.target.value })}
                        />
                    </div>
                    <div className="mb-2">
                        <input
                            className="border px-2 py-1 rounded w-full"
                            type="text"
                            placeholder="Last Name"
                            value={editData.lastName}
                            onChange={(e) => setEditData({ ...editData, lastName: e.target.value })}
                        />
                    </div>
                    <div className="mb-2">
                        <input
                            className="border px-2 py-1 rounded w-full"
                            type="email"
                            placeholder="Email"
                            value={editData.email}
                            onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                        />
                    </div>
                    <button
                        className="bg-green-500 text-white px-4 py-2 rounded"
                        onClick={handleUpdate}
                    >
                        {editData._id ? 'Update Data' : 'Add Data'}
                    </button>
                </div>
            )}
        </div>
        </>
    );
};

export default Admin;
