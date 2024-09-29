import { useNavigate } from 'react-router-dom';

const CityButton = ({ city }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        const dmaIdMap = {
            'Los Angeles': 324,
            'New York': 345,
            'Toronto': 299,
            'New Orleans': 344,
            'Houston': 300,
            'London': 602,
        };
        const dmaId = dmaIdMap[city];
        navigate('/upcoming-events', { state: { dmaId } });
    };

    return <button onClick={handleClick}>{city}</button>;
};

export default CityButton;