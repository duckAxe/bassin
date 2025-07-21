import './Footer.scss';
import Logo from '../images/logo.svg';
import { POLL_INTERVAL_SECONDS } from '../helpers/constants';

interface TimerProps {
    timer: number
}

export default function Footer({timer}: TimerProps) {
    const progressPercentage = Math.max(0, 100 - (timer / POLL_INTERVAL_SECONDS) * 100);

    return (
        <footer>
            <div className='progress' style={{width: `${progressPercentage}%`}} />
            
            <div className='wrapper'>
                <figure>
                    <img src={Logo} width={48} height={48} alt="BASSIN" />
                    <figcaption className='font-monospace'>BASSIN</figcaption>
                </figure>

                <code>
                    Every decentralized share counts
                </code>
            </div>
        </footer>
    );
}
