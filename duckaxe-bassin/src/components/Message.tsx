import { BASSIN_STRATUM_PORT } from '../helpers/constants';
import './Message.scss';

interface MessageProps {
    msg: string
}

export default function Message({msg}: MessageProps) {
    return (
        <div className='message'>
            <strong>{msg}</strong>
                
            <table>
                <tbody>
                    <tr>
                        <td>Stratum</td>
                        <td><code>{`${window.location.hostname}:${BASSIN_STRATUM_PORT}`}</code></td>
                    </tr>
                    <tr>
                        <td>Username</td>
                        <td><code>&lt;btcaddress&gt;.&lt;worker&gt;</code></td>
                    </tr>
                    <tr>
                        <td>Password</td>
                        <td><code>x</code></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};