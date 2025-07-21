import './Divider.scss';

interface DividerProps {
    primary: string, 
    secondary: string
}

export default function Divider({primary, secondary}: DividerProps) {
    return (
        <code className='divider'>
            <strong>{primary}</strong>
            <span>{secondary}</span>
        </code>
    );
};