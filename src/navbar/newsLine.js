import React from "react";
import { Link } from "react-router-dom";

export default function NewsLine() {
	return (
		<div id="news" className="col">
			<div id="all_news_block">
				<div id="all_news">
					<ul>
						<li>
							<Link to="/personal">
								Complete your user profile for better
								credibility
							</Link>
						</li>
						<li>
							<Link to="/support">
								Send us a message if anything goes wrong!
							</Link>
						</li>
						<li>
							<Link to="#">
								To avoid scams, only send money during or after
								your trade
							</Link>
						</li>
						<li>
							<a
								href="https://evergreengoodwill.org/locations/20-university-district?utm_source=gmb&utm_medium=yext"
								target="_blank"
							>
								Donate your unwanted items to GoodWill to help
								homelessness!
							</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}
