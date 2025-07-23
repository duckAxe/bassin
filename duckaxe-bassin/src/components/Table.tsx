import './Table.scss';
import { Worker, User } from '../interfaces/users';
import { hashrateSuffix, abbreviateNumber, diffToNowDHM, createMarkup } from '../helpers/convert';

interface TableProps {
    user: User
}

export default function Divider({user}: TableProps) {
    return (
        <table>
            <thead>
                <tr>
                    <th scope="col"></th>
                    <th scope="col" colSpan={4} className='font-barlow'>Hashrate</th>
                    <th scope="col" colSpan={4} className='font-barlow'>Shares</th>
                </tr>
                <tr>
                    <th scope="col">Worker</th>
                    <th scope="col">5 Minutes</th>
                    <th scope="col">1 Hour</th>
                    <th scope="col">1 Day</th>
                    <th scope="col">1 Week</th>
                    
                    <th scope="col">↓ Best</th>
                    <th scope="col">Best Ever</th>
                    <th scope="col">Total</th>
                    <th scope="col">Last</th>
                </tr>
            </thead>

            <tbody>
                {user.worker.sort((a, b) => b.bestshare - a.bestshare).map((worker: Worker) => (
                    <tr key={worker.workername}>
                        <td scope="row">{worker.workername.split('.').pop()}</td>
                        <td dangerouslySetInnerHTML={createMarkup(hashrateSuffix(worker.hashrate5m))} />
                        <td dangerouslySetInnerHTML={createMarkup(hashrateSuffix(worker.hashrate1hr))} />
                        <td dangerouslySetInnerHTML={createMarkup(hashrateSuffix(worker.hashrate1d))} />
                        <td dangerouslySetInnerHTML={createMarkup(hashrateSuffix(worker.hashrate7d))} />

                        <td dangerouslySetInnerHTML={createMarkup(abbreviateNumber(worker.bestshare))} />
                        <td dangerouslySetInnerHTML={createMarkup(abbreviateNumber(worker.bestever))} />
                        <td dangerouslySetInnerHTML={createMarkup(abbreviateNumber(worker.shares))} />
                        <td dangerouslySetInnerHTML={createMarkup(diffToNowDHM(worker.lastshare))} />
                    </tr>
                ))}

                <tr>
                    <td scope="row"></td>
                    <td dangerouslySetInnerHTML={createMarkup(hashrateSuffix(user.hashrate5m))} />
                    <td dangerouslySetInnerHTML={createMarkup(hashrateSuffix(user.hashrate1hr))} />
                    <td dangerouslySetInnerHTML={createMarkup(hashrateSuffix(user.hashrate1d))} />
                    <td dangerouslySetInnerHTML={createMarkup(hashrateSuffix(user.hashrate7d))} />

                    <td dangerouslySetInnerHTML={createMarkup(abbreviateNumber(user.bestshare))} />
                    <td dangerouslySetInnerHTML={createMarkup(abbreviateNumber(user.bestever))} />
                    <td dangerouslySetInnerHTML={createMarkup(abbreviateNumber(user.shares))} />
                    <td dangerouslySetInnerHTML={createMarkup(diffToNowDHM(user.lastshare))} />
                </tr>
            </tbody>
        </table>
    );
};