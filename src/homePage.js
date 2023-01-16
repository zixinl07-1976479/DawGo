import React, { useState } from "react";
import Categories from "./categories";
import { CardDeck } from "./cardDeck";

/**
 * @param props.allItems: items information in the realtime database
 * @param props.categoryList: the default category list in data.js
 * @param props.handleSavedItemsChange: the function to change the saved items
 * @param props.handleAlertChange: the function to set alert condition
 * @param props.selectedCategories: the categories that user selected
 * @param props.handleSelectCategories: the function to set the selected categories
 */

export default function HomePage(props) {
	const NumItemsPerPage = 30;
	const [pageNum, setPageNum] = useState(1);

	let totalPages;
	let pageItems;
	if (props.allItems) {
		const allItemsList = Object.keys(props.allItems).map(
			(key) => props.allItems[key]
		);
		const start = NumItemsPerPage * (pageNum - 1);
		pageItems = allItemsList.slice(start, start + NumItemsPerPage);
		totalPages = parseInt(allItemsList.length / NumItemsPerPage);
		if (allItemsList.length % NumItemsPerPage > 0) {
			totalPages += 1;
		}
	} else {
		pageItems = [];
		totalPages = 1;
	}

	function handleChangePageNum(direction) {
		if (direction === 1) {
			setPageNum(pageNum + 1);
		} else if (direction === 0) {
			setPageNum(pageNum - 1);
		}
	}

	const PageNavigator = () => {
		const prevButton = () => {
			if (pageNum === 1) {
				return (
					<button
						type="button"
						className="btn btn-primary"
						onClick={() => handleChangePageNum(0)}
						style={{ float: "left" }}
						disabled
					>
						<nobr>
							<i className="bi bi-arrow-left"></i>
							Previous
						</nobr>
					</button>
				);
			} else {
				return (
					<button
						type="button"
						className="btn btn-primary"
						onClick={() => handleChangePageNum(0)}
						style={{ float: "left" }}
					>
						<nobr>
							<i className="bi bi-arrow-left"></i>
							Previous
						</nobr>
					</button>
				);
			}
		};
		const nextButton = () => {
			if (pageNum === totalPages) {
				return (
					<button
						type="button"
						className="btn btn-primary"
						onClick={() => handleChangePageNum(1)}
						style={{ float: "right" }}
						disabled
					>
						<nobr>
							Next
							<i className="bi bi-arrow-right"></i>
						</nobr>
					</button>
				);
			} else {
				return (
					<button
						type="button"
						className="btn btn-primary"
						onClick={() => handleChangePageNum(1)}
						style={{ float: "right" }}
					>
						<nobr>
							Next
							<i className="bi bi-arrow-right"></i>
						</nobr>
					</button>
				);
			}
		};

		return (
			<div>
				{prevButton()}
				{nextButton()}
			</div>
		);
	};
	return (
		<div>
			<div className="container-fluid">
				<div id="cards" className="row row-cols-auto">
					<div className="col col-md-4 col-lg-3">
						<Categories
							data={props.categoryList}
							selectedCategories={props.selectedCategories}
							handleSelectCategories={
								props.handleSelectCategories
							}
						/>
					</div>
					<div className="col col-md-8">
						<div className="row">
							<CardDeck
								items={pageItems}
								handleSavedItemsChange={
									props.handleSavedItemsChange
								}
								handleAlertChange={props.handleAlertChange}
							/>
						</div>
						<div className="row">
							<PageNavigator />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
