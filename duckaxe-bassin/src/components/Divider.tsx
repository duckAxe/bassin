import './Divider.scss';

interface DividerProps {
    primary: string, 
    secondary: string
}

export default function Divider({primary, secondary}: DividerProps) {
    return (
        <div className='divider font-monospace'>
            <strong>{primary}</strong>
            <span>{secondary}</span>
        </div>
    );
};