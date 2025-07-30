import { useState } from 'react';
import './Divider.scss';

interface DividerProps {
    primary: string,
    secondary: string
}

export default function Divider({ primary, secondary }: DividerProps) {
    const [isActive, setIsActive] = useState(false);

    const toggleClass = () => {
        setIsActive(prev => !prev);
    };

    return (
        <div className='divider'>
            <span>{secondary}</span>
            <strong
                className={isActive ? 'active' : ''}
                onClick={toggleClass}
                title={(isActive ? 'Show' : 'Hide') + ' username'}
            >
                {primary}
            </strong>
        </div>
    );
};
