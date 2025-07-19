import './Metric.scss';

export interface MetricProps {
	label: string;
	headline: string;
}

export default function Metric({ label, headline }: MetricProps) {
	return (
		<section className="metric">
			<span className="metric-label">{label}</span>
			<h3 className="metric-headline font-barlow" dangerouslySetInnerHTML={{ __html: headline }} />
		</section>
	);
}
  