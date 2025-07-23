import './Dashboard.scss';
import React from 'react';
import Tiles from './Tiles';
import Divider from './Divider';
import Message from './Message';
import Table from './Table';
import Chart from './Chart';
import { Pool } from '../interfaces/pool';
import { User } from '../interfaces/users';

interface DashboardProps {
    pool: Pool;
    users: User[];
    chart: number[];
}

const Dashboard: React.FC<DashboardProps> = ({ pool, users, chart }) => {
    const hasUsers = users.length > 0;
    const hasChartData = chart.length > 0;

    return (
        <>
            {hasUsers ? (
                <div className="dashboard">
                    <Tiles pool={pool} />
    
                    {hasChartData && <Chart chart={chart} />}
    
                    {users.map((user) => (
                        <section className="user" key={user.username}>
                            <Divider primary={user.username} secondary="User" />
                            <Table user={user} />
                        </section>
                    ))}
                </div>
            ) : (
                <Message msg="Awaiting Shares from Miner ..." />
            )}
        </>
    );    
};

export default React.memo(Dashboard);
