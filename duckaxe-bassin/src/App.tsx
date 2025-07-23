import './App.scss';
import { useState, useEffect, useCallback } from 'react';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';
import Loader from './components/Loader';
import { fetchPool, fetchUsers } from './helpers/fetch';
import { CHART_HISTORY_LENGTH, POLL_INTERVAL_SECONDS } from './helpers/constants';
import { parseHashrate } from './helpers/convert';
import { Pool } from './interfaces/pool';
import { User } from './interfaces/users';

const App = () => {
  const [pool, setPool] = useState<Pool | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [chart, setChart] = useState<number[]>([]);
  const [timer, setTimer] = useState<number>(0);

  const loadData = useCallback(async () => {
    try {
      const [poolData, usersData] = await Promise.all([fetchPool(), fetchUsers()]);

      if (poolData) {
        setPool(poolData);
        setChart((prev) => [...prev, parseHashrate(poolData.hashrate5m)].slice(-CHART_HISTORY_LENGTH));
      }

      if (usersData) {
        setUsers(usersData);
      }
    } catch (error) {
      console.error('Data fetch error:', error);
    }
  }, []);

  useEffect(() => {
    loadData();

    const interval = setInterval(() => {
      setTimer((prev) => {
        const next = prev + 1;
        if (next >= POLL_INTERVAL_SECONDS) {
          loadData();
          return 0;
        }
        return next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [loadData]);

  return (
    <>
      <Footer timer={timer} />
      {!pool || !users ? (
        <Loader />
      ) : (
        <Dashboard pool={pool} users={users} chart={chart} />
      )}
    </>
  );
};

export default App;
