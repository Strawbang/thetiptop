import { useEffect, useState } from 'react';
import './index.css';

const Stats = (props) => {
    const { remainingTicketCount } = props;
    const [today, setToday] = useState(new Date());
    const deadline = new Date("2021-11-16 00:00:00");

    const getRemainingDays = () => {
        const diff = {};
        diff.sec = Math.floor((deadline - today) / 1000);
        diff.min = diff.sec / 60;
        diff.hours = diff.min / 60;
        diff.days = Math.floor(diff.hours / 24);
        return diff.days;
    };

    const [remainingDays, setRemainingDays] = useState(getRemainingDays());

    useEffect( () => {
        const interval = setInterval(() => {
            setToday(new Date());
        }, 1000);

          return () => clearInterval(interval);
    }, []);

    useEffect( () => {
        if (!remainingDays && remainingDays !== getRemainingDays()) {
            setRemainingDays(getRemainingDays());
        }
    }, [today]);

    return (
        <div className="boxStats">
            <div className="itemStats">
                <div className="stats">
                    <p className="statsVal">1 500 500</p>
                    <p className="statsTitle">Tickets restants</p>
                </div>
                <div className="stats">
                    <p className="statsVal">{ remainingDays }</p>
                    <p className="statsTitle" title='Jours restants avant le tirage'>Jours restants</p>
                </div>
            </div>
        </div>
    );
}

export default Stats;
