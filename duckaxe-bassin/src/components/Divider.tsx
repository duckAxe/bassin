import './Divider.scss';

interface DividerProps {
    primary: string, 
    secondary: string
}

export default function Divider({primary, secondary}: DividerProps) {
    return (
        <div className='divider'>
            <span>{secondary}</span>
            <strong>{primary}</strong>
        </div>
    );
};