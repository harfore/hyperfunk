import { useNavigate } from 'react-router-dom';

const CityButton = ({ city }) => {
    const navigate = useNavigate();
    const dmaIdMap = {
        'Los Angeles': 324,
        'New York': 345,
        'Toronto': 299,
        'New Orleans': 344,
        'Houston': 300,
        'London': 602,
    };
    const dmaId = dmaIdMap[city];

    const handleClick = () => {
        navigate('/upcoming-events', { state: { dmaId, city } });
    };

    return (
        <div>
            <img src={`../images/cities/${dmaId}.jpg`} alt={city} className='city_image' /><br></br><button onClick={handleClick} className="city_button">{city.toUpperCase()}</button>
        </div>
    )
};

export default CityButton;