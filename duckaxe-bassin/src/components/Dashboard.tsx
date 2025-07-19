import './Dashboard.scss';
import React from 'react';
import Tiles from './Tiles';
import Divider from './Divider';
import Message from './Message';
import Table from './Table';
import { Pool } from '../interfaces/pool';
import { User } from '../interfaces/users';
import { BASSIN_STRATUM_PORT } from '../helpers/constants';

interface DashboardProps {
    pool: Pool, 
    users: User[]
}

const Dashboard = ({ pool, users }: DashboardProps) => {
    return (
    	<div className="dashboard">
            <section>
                <Divider primary={'POOL'} secondary={`${window.location.hostname}:${BASSIN_STRATUM_PORT}`} />
                
                <Tiles pool={pool} />
            </section>

            {!Object.entries(users).length ? (
                <Message msg={'Awaiting shares ...'} />
            ) : (
                Object.entries(users).map(([key, user]) => (
                    <section className='user' key={key}>
                        <Divider primary={'USER'} secondary={user.username} />
                        <Table user={user} />
                    </section>
                ))
            )}
    	</div>
    );
};

export default React.memo(Dashboard);