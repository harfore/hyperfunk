import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/ProfileStyle.css";

function Profile({ onSignOut }) {
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
                            <p>Handle: <input type="text" name="handle" value={formData.handle} onChange={handleChange} className='profile_input' /></p>
                            <p>Bio: <textarea name="bio" value={formData.bio} onChange={handleChange} className='profile_input' placeholder="Write a bio here (optional)" /></p>

                            <p>Country:
                                <select name="country" value={formData.country} onChange={handleChange} className='profile_input'>
                                    <option value="">Select your country</option>
                                    <option value="Algeria">Algeria</option>
                                    <option value="Andorra">Andorra</option>
                                    <option value="Angola">Angola</option>
                                    <option value="Argentina">Argentina</option>
                                    <option value="Armenia">Armenia</option>
                                    <option value="Australia">Australia</option>
                                    <option value="Barbados">Barbados</option>
                                    <option value="Belgium">Belgium</option>
                                    <option value="Bolivia">Bolivia</option>
                                    <option value="Cameroon">Cameroon</option>
                                    <option value="Canada">Canada</option>
                                    <option value="Chile">Chile</option>
                                    <option value="China">China</option>
                                    <option value="Colombia">Colombia</option>
                                    <option value="Cuba">Cuba</option>
                                    <option value="Czech">Czech Republic</option>
                                    <option value="Denmark">Denmark</option>
                                    <option value="El Salvador">El Salvador</option>
                                    <option value="France">France</option>
                                    <option value="Iceland">Iceland</option>
                                    <option value="India">India</option>
                                    <option value="Indonesia">Indonesia</option>
                                    <option value="Ireland">Ireland</option>
                                    <option value="Italy">Italy</option>
                                    <option value="Jamaica">Jamaica</option>
                                    <option value="Japan">Japan</option>
                                    <option value="Kazakhstan">Kazakhstan</option>
                                    <option value="Kenya">Kenya</option>
                                    <option value="Lebanon">Lebanon</option>
                                    <option value="Luxembourg">Luxembourg</option>
                                    <option value="Malaysia">Malaysia</option>
                                    <option value="Mali">Mali</option>
                                    <option value="Mexico">Mexico</option>
                                    <option value="Monaco">Monaco</option>
                                    <option value="Morocco">Morocco</option>
                                    <option value="Netherlands">Netherlands</option>
                                    <option value="Nigeria">Nigeria</option>
                                    <option value="Norway">Norway</option>
                                    <option value="Palestine">Palestine</option>
                                    <option value="Paraguay">Paraguay</option>
                                    <option value="Peru">Peru</option>
                                    <option value="Philippines">Philippines</option>
                                    <option value="Portugal">Portugal</option>
                                    <option value="Qatar">Qatar</option>
                                    <option value="Saudi Arabia">Saudi Arabia</option>
                                    <option value="Senegal">Senegal</option>
                                    <option value="Serbia">Serbia</option>
                                    <option value="Sierra Leone">Sierra Leone</option>
                                    <option value="Singapore">Singapore</option>
                                    <option value="Somalia">Somalia</option>
                                    <option value="South Africa">South Africa</option>
                                    <option value="South Korea">South Korea</option>
                                    <option value="Spain">Spain</option>
                                    <option value="Sri Lanka">Sri Lanka</option>
                                    <option value="Sudan">Sudan</option>
                                    <option value="Sweden">Sweden</option>
                                    <option value="Switzerland">Switzerland</option>
                                    <option value="Syria">Syria</option>
                                    <option value="Taiwan">Taiwan</option>
                                    <option value="Thailand">Thailand</option>
                                    <option value="Tunisia">Tunisia</option>
                                    <option value="Turkey">Turkey</option>
                                    <option value="United Arab Emirates">United Arab Emirates</option>
                                    <option value="United Kingdom">United Kingdom</option>
                                    <option value="United States">United States</option>
                                    <option value="Venezuela">Venezuela</option>
                                    <option value="Vietnam">Vietnam</option>
                                    <option value="Yemen">Yemen</option>
                                </select>
                            </p>
                            <p>Pronouns: <input type="text" name="pronouns" value={formData.pronouns} onChange={handleChange} className='profile_input' placeholder="Enter your pronouns (optional)" /></p>
                            <p>Password: <input type="password" name="password" value={formData.password} onChange={handleChange} className='profile_input' placeholder="New password (optional)" /></p>
                            <p>{userData.username || 'This user'} has been a Hyperfunk user since {new Date(userData.createdAt).toLocaleDateString()}</p>

                            <button className="profile_button" onClick={handleUpdate}>Save Changes</button>
                            <button className="profile_button" onClick={handleCancelEdit}>Cancel</button>
                        </>
                    ) : (
                        <>
                            <p>{userData.handle}</p>
                            <button className="profile_button" onClick={handleEditClick}>Edit Profile</button>
                        </>
                    )}

                    {error && <p>{error}</p>}
                </div>
            ) : (
                <p>User info not found</p>
            )}
            <button className="profile_button" onClick={onSignOut}>Disconnect</button>
        </div>
    );
}

export default Profile;