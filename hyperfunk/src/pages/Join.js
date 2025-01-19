import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/JoinStyle.css';

const Join = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        username: '',
        handle: '',
        country: '',
        pronouns: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        setError('');

        if (formData.username.length < 3 || formData.username.length > 22) {
            setError('Username must be between 3 and 22 characters');
            return false;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            setError('Invalid email format');
            return false;
        }
        return true;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (response.ok) {
            console.log('User created:', data);
            localStorage.setItem('token', data.token);
            navigate('/');
        } else {
            setError(data.message || 'Registration failed');
            console.error('Error:', data.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className='account_form'>
                <h1>Join Hyperfunk!</h1>
                {['email', 'password', 'username', 'handle'].map((field, index) => (
                    <input
                        key={index}
                        type={field === 'password' ? 'password' : 'text'}
                        name={field}
                        className='account_field'
                        placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                        onChange={handleChange}
                        value={formData[field]}
                        required
                    />
                ))}
                <label>Country</label>
                <select name="country" className='account_field' onChange={handleChange} value={formData.country}>
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

                <button type="submit" className='account_field'>Create Account</button>
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
    );
};

export default Join;