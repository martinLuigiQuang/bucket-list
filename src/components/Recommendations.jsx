import { useCallback, useEffect } from 'react';
import ReplayIcon from '@mui/icons-material/Replay';
import CircularProgress from '@mui/material/CircularProgress';
import { useAppDispatch, useAppSelector } from '../redux/store/store';
import { GET_RECOMMENDATIONS } from '../redux/actions/recommendations';
import { recommendationsStates } from '../redux/reducers/recommendationsReducer';
import './Recommendations.css';

export default function Recommendations(props) {
    const {
        destination = 'Banff',
        startDate = '2024-07-12',
        endDate = '2024-07-15',
        numOfTravellers = 4,
    } = props;
    const dispatch = useAppDispatch();
    
    const loadRecommendations = useCallback(() => {
        dispatch(GET_RECOMMENDATIONS({ destination, startDate, endDate, numOfTravellers }));
    }, []);
    
    useEffect(loadRecommendations, []);
    
    const { data, callStatus } = useAppSelector(recommendationsStates);
    const isLoading = callStatus === 'loading';

    return (
        <div className="recommendations-container">
            <p className="recommendations-summary">
                <span>{destination}</span>
                <span className="dot"/>
                <span>12 - 15 Jul</span>
                <span className="dot" />
                <span>{`${numOfTravellers} people`}</span>
            </p>
            <div className="recommendations-header">
                <h1>Top 5 things to do</h1>
                <button 
                    className="recommendations-reload" 
                    onClick={loadRecommendations}
                    disabled={isLoading}
                >
                    {isLoading ? <CircularProgress color="secondary" size={24} /> : <ReplayIcon />}
                </button>
            </div>
            <div className="recommendations-text-container">
                {data.map((recommendation, i) => (
                    <p className="recommendations-text" key={`recommendation-${i}`}>
                        <div>{`${i + 1}.`}</div>
                        <div>{recommendation}</div>
                    </p>
                ))}
            </div>
        </div>
    );
}
