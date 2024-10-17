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

                <button type="submit" className='account_field'>Create Account</button>
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
    );
};

export default Join;