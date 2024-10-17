import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Profile() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState({
        handle: '',
        country: '',
        pronouns: '',
        password: '',
        bio: '',
    });
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }

            try {
                const response = await fetch('/api/profile', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                console.log('Response: ', response);

                if (!response.ok) {
                    throw new Error('Error fetching user data');
                }

                const data = await response.json();
                setUserData(data);
                setFormData({
                    handle: data.handle || '',
                    country: data.country || '',
                    pronouns: data.pronouns || '',
                    password: '',
                    bio: data.bio || '',
                });
            } catch (error) {
                console.error('Fetch user data error:', error);
            }
            setLoading(false);
        };

        fetchUserData();
    }, [navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleUpdate = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch('/api/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    handle: formData.handle,
                    country: formData.country,
                    pronouns: formData.pronouns,
                    password: formData.password,
                    bio: formData.bio,
                }),
            });

            if (!response.ok) {
                throw new Error('Error updating profile');
            }

            setError('Profile updated successfully!');
            setEditing(false);
        } catch (error) {
            setError('Error updating profile: ' + error.message);
        }
    };

    const handleEditClick = () => {
        setEditing(true);
    };

    const handleCancelEdit = () => {
        setEditing(false);
        setFormData({
            handle: userData.handle,
            country: userData.country,
            pronouns: userData.pronouns || '',
            password: '',
        });
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div>
            {userData ? (
                <div>
                    <h2>{userData.username}</h2>

                    {editing ? (
                        <>
                            <p>Handle: <input type="text" name="handle" value={formData.handle} onChange={handleChange} /></p>
                            <p>Bio: <textarea name="bio" value={formData.bio} onChange={handleChange} placeholder="Write a bio here (optional)" /></p>

                            <p>Country:
                                <select name="country" value={formData.country} onChange={handleChange}>
                                    <option value="">Select your country</option>
                                    <option value="DZ">Algeria</option>
                                    <option value="AD">Andorra</option>
                                    <option value="AO">Angola</option>
                                    <option value="AR">Argentina</option>
                                    <option value="AM">Armenia</option>
                                    <option value="AU">Australia</option>
                                    <option value="BB">Barbados</option>
                                    <option value="BE">Belgium</option>
                                    <option value="BO">Bolivia</option>
                                    <option value="CM">Cameroon</option>
                                    <option value="CA">Canada</option>
                                    <option value="CL">Chile</option>
                                    <option value="CN">China</option>
                                    <option value="CO">Colombia</option>
                                    <option value="CU">Cuba</option>
                                    <option value="CZ">Czech Republic</option>
                                    <option value="DK">Denmark</option>
                                    <option value="SV">El Salvador</option>
                                    <option value="FR">France</option>
                                    <option value="IS">Iceland</option>
                                    <option value="IN">India</option>
                                    <option value="ID">Indonesia</option>
                                    <option value="IE">Ireland</option>
                                    <option value="IT">Italy</option>
                                    <option value="JM">Jamaica</option>
                                    <option value="JP">Japan</option>
                                    <option value="KZ">Kazakhstan</option>
                                    <option value="KE">Kenya</option>
                                    <option value="LB">Lebanon</option>
                                    <option value="LU">Luxembourg</option>
                                    <option value="MY">Malaysia</option>
                                    <option value="ML">Mali</option>
                                    <option value="MX">Mexico</option>
                                    <option value="MC">Monaco</option>
                                    <option value="MA">Morocco</option>
                                    <option value="NL">Netherlands</option>
                                    <option value="NG">Nigeria</option>
                                    <option value="NO">Norway</option>
                                    <option value="PS">Palestine</option>
                                    <option value="PY">Paraguay</option>
                                    <option value="PE">Peru</option>
                                    <option value="PH">Philippines</option>
                                    <option value="PT">Portugal</option>
                                    <option value="QA">Qatar</option>
                                    <option value="SA">Saudi Arabia</option>
                                    <option value="SN">Senegal</option>
                                    <option value="RS">Serbia</option>
                                    <option value="SL">Sierra Leone</option>
                                    <option value="SG">Singapore</option>
                                    <option value="SO">Somalia</option>
                                    <option value="ZA">South Africa</option>
                                    <option value="KR">South Korea</option>
                                    <option value="ES">Spain</option>
                                    <option value="LK">Sri Lanka</option>
                                    <option value="SD">Sudan</option>
                                    <option value="SE">Sweden</option>
                                    <option value="CH">Switzerland</option>
                                    <option value="SY">Syria</option>
                                    <option value="TW">Taiwan</option>
                                    <option value="TH">Thailand</option>
                                    <option value="TN">Tunisia</option>
                                    <option value="TR">Turkey</option>
                                    <option value="AE">United Arab Emirates</option>
                                    <option value="GB">United Kingdom</option>
                                    <option value="US">United States</option>
                                    <option value="VE">Venezuela</option>
                                    <option value="VN">Vietnam</option>
                                    <option value="YE">Yemen</option>
                                </select>
                            </p>
                            <p>Pronouns: <input type="text" name="pronouns" value={formData.pronouns} onChange={handleChange} placeholder="Enter your pronouns (optional)" /></p>
                            <p>Password: <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="New password (optional)" /></p>

                            <button onClick={handleUpdate}>Save Changes</button>
                            <button onClick={handleCancelEdit}>Cancel</button>
                        </>
                    ) : (
                        <>
                            <p>Handle: {userData.handle}</p>
                            <p>Bio: {userData.bio || 'Not set'}</p>
                            <p>Country: {userData.country}</p>
                            <p>Pronouns: {userData.pronouns || 'Not set'}</p>
                            <p>{userData.username} has been a Hyperfunk user since {new Date(userData.createdAt).toLocaleDateString()}</p>

                            <button onClick={handleEditClick}>Edit Profile</button>
                        </>
                    )}

                    {error && <p>{error}</p>}
                </div>
            ) : (
                <p>User info not found</p>
            )}
        </div>
    );
}

export default Profile;