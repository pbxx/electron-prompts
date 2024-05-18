import clsx from "clsx"
import Heading from "@theme/Heading"
import styles from "./styles.module.css"

const FeatureList = [
	{
		title: "Make user-input prompts easily",
		Svg: require("@site/static/img/icon.svg").default,
		description: <>Display messages or collect user input graphically with a single method. Multiple fields supported.</>,
	},
	{
		title: "Supports multiple prompts at once",
		Svg: require("@site/static/img/feature_multiple.svg").default,
		description: <>Leverages promises and events to handle any number of prompts at once</>,
	},
	{
		title: "Pre-orchestrated IPC",
		Svg: require("@site/static/img/feature_ipc.svg").default,
		description: <>Using electron-prompts requires no IPC or Main/Renderer setup</>,
	},
]

function Feature({ Svg, title, description }) {
	return (
		<div className={clsx("col col--4")}>
			<div className="text--center">
				<Svg
					className={styles.featureSvg}
					role="img"
				/>
			</div>
			<div className="text--center padding-horiz--md">
				<Heading as="h3">{title}</Heading>
				<p>{description}</p>
			</div>
		</div>
	)
}

export default function HomepageFeatures() {
	return (
		<section className={styles.features}>
			<div className="container">
				<div className="row">
					{FeatureList.map((props, idx) => (
						<Feature
							key={idx}
							{...props}
						/>
					))}
				</div>
			</div>
		</section>
	)
}
