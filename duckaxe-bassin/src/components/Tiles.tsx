import './Tiles.scss';
import Metric from './Metric';
import { abbreviateNumber, diffToNowDHM, hashrateSuffix, secondsToDHM } from '../helpers/convert';
import { Pool } from '../interfaces/pool';

interface TilesProps {
	pool: Pool
}

export default function Tiles({ pool }: TilesProps) {
	return (
		<div className="tiles">
			<section className="tile">
				<h3 className="tile-headline font-barlow">Hashrate</h3>

				<ul className="tile-items">
					<li className="tile-item">
						<Metric label={'5 Minutes'} headline={hashrateSuffix(pool.hashrate5m)} />
					</li>
					<li className="tile-item">
						<Metric label={'1 Hour'} headline={hashrateSuffix(pool.hashrate1hr)} />
					</li>
					<li className="tile-item">
						<Metric label={'1 Day'} headline={hashrateSuffix(pool.hashrate1d)} />
					</li>
					<li className="tile-item">
						<Metric label={'1 Week'} headline={hashrateSuffix(pool.hashrate7d)} />
					</li>
				</ul>
			</section>

			<section className="tile">
				<h3 className="tile-headline font-barlow">Shares</h3>

				<ul className="tile-items">
					<li className="tile-item">
						<Metric label={'Best'} headline={abbreviateNumber(pool.bestshare)} />
					</li>
					<li className="tile-item">
						<Metric label={'/Second'} headline={`${pool.SPS1m}`} />
					</li>
					<li className="tile-item">
						<Metric label={'Accepted'} headline={abbreviateNumber(pool.accepted)} />
					</li>
					<li className="tile-item">
						<Metric label={'Rejected'} headline={abbreviateNumber(pool.rejected)} />
					</li>
				</ul>
			</section>

			<section className="tile">
				<h3 className="tile-headline font-barlow">Info</h3>

				<ul className="tile-items">
					<li className="tile-item">
						<Metric label={'Uptime'} headline={secondsToDHM(pool.runtime)} />
					</li>
					<li className="tile-item">
						<Metric label={`User${pool.Users !== 1 ? 's' : ''}`} headline={`${pool.Users}`} />
					</li>
					<li className="tile-item">
						<Metric label={'Update'} headline={diffToNowDHM(pool.lastupdate)} />
					</li>
					<li className="tile-item">
						<Metric label={`Worker${pool.Workers !== 1 ? 's' : ''}`} headline={`${pool.Workers}`} />
					</li>
				</ul>
			</section>
		</div>
  	);
}