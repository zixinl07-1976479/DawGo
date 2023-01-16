import React from "react";
import { Card } from "./card";

/**
 * @param props.allItems: items information in the realtime database
 * @param props.handleSavedItemsChange: the function to change the saved items
 * @param props.handleAlertChange: the function to set alert condition
 */
export function CardDeck(props) {
	const cards = props.items.map((item) => {
		return (
			<div key={item.itemId} className="col col-xl-1.5">
				<Card
					data={item}
					handleSavedItemsChange={props.handleSavedItemsChange}
					handleAlertChange={props.handleAlertChange}
					showButtons={true}
				/>
			</div>
		);
	});

	return (
		<div>
			<div className="row">
				<div className="col">
					<p className="postTitle">Latest Posts</p>
				</div>
			</div>
			<div className="item-row-expand row justify-content-md-center">
				{cards}
			</div>
		</div>
	);
}
