import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
	getDatabase,
	ref,
	onValue,
	set as firebaseSet,
} from "firebase/database";
import Masonry from "react-responsive-masonry";
import { DEFAULT_USER_INFO, DEFAULT_ITEM } from "./data";

/**
 * @param props.user: user object in the realtime database
 * @param props.allItems: item information in the realtime database
 * @param props.handleSavedItemsChange: the function to change the saved items
 * @param props.handleAlertChange: the function to set alert condition
 */
export default function ItemDetailPage(props) {
	const urlParams = useParams().id;
	let item;
	if (props.allItems[urlParams]) {
		item = props.allItems[urlParams];
	} else {
		item = DEFAULT_ITEM;
	}

	const [sellerInfo, setSellerInfo] = useState(DEFAULT_USER_INFO);

	useEffect(() => {
		const db = getDatabase();
		const userInfoRef = ref(db, "users/" + item.userId);
		const userInfoOffFunction = onValue(userInfoRef, (snapshot) => {
			const newSellerInfo = snapshot.val();
			if (newSellerInfo) {
				setSellerInfo(newSellerInfo);
			}
		});

		function cleanUp() {
			userInfoOffFunction();
		}

		return cleanUp;
	}, []);

	const defaultImageUrl = "./img/default_item_image.png";

	let itemImages;
	if (item) {
		itemImages = item.imgUrls.map((itemImageUrl) => {
			return (
				<img
					className="item_image"
					key={itemImageUrl}
					src={itemImageUrl}
					alt={"image of the selling item: " + item.title}
					border="1px"
				/>
			);
		});
	} else {
		itemImages = (
			<img
				className="item_image"
				src={defaultImageUrl}
				alt="default state of item"
				border="1px"
			/>
		);
	}

	const contactList = () => {
		if (sellerInfo) {
			return <p>{sellerInfo.contacts}</p>;
		} else {
			return <p> No Contact Information is Provided! </p>;
		}
	};

	const handleDeletePost = () => {
		const db = getDatabase();
		const allItemsRef = ref(db, "/allItems");
		let newAllItems = { ...props.allItems };
		newAllItems[item.itemId] = null;
		firebaseSet(allItemsRef, newAllItems);
		props.handleAlertChange([1, "Delete"]);
		console("delete success!");
	};

	const handleSaveClick = () => {
		props.handleSavedItemsChange(
			item.itemId,
			"add",
			props.handleAlertChange
		);
	};

	return (
		<div id="itemDetailPage" className="container">
			<div className="row">
				<div className="col col-12 col-sm-6 col-lg-6">
					<div className="container-fluid">
						<div className="row">
							<div className="row user-info">
								<div className="col col-4">
									{sellerInfo.imgUrl !== DEFAULT_USER_INFO.imgUrl && 
									<img
										className="image"
										src={sellerInfo.imgUrl}
										alt="Profile picture of the seller"
									/>}
									{sellerInfo.imgUrl === DEFAULT_USER_INFO.imgUrl && 
									<img
										className="image"
										src={"." + DEFAULT_USER_INFO.imgUrl}
										alt="Profile picture of the seller"
									/>}
								</div>
								<div className="col col-4 my-auto">
									<p>{sellerInfo.name}</p>
									{sellerInfo.UW && <p id="uw_affiliation"> - UW -</p>}
									{!sellerInfo.UW && <p id="uw_affiliation"> Non-UW</p>}
								</div>
							</div>
						</div>
						<div className="row item">
							<div className="col-md-12">
								<Masonry columnsCount={2} gutter="10px">
									{itemImages}
								</Masonry>
							</div>
						</div>
					</div>
				</div>

				<div className="col col-md-6 col-lg-6">
					<div className="container">
						<div className="row">
							<div className="column col-lg-8">
								<h1>{item["title"]}</h1>
							</div>
						</div>

						<div id="price" className="row">
							<h2>{"$" + item.price}</h2>
						</div>
						<div id="condition" className="row text-primary">
							<p>{"Item condition: " + item.condition}</p>
						</div>
						<div className="row negotiable">
							{!item.negotiable && (
								<p> The item is non-negotiable </p>
							)}
						</div>

						<div className="row" id="description">
							<h2>Description</h2>
							<p>{item.description}</p>
						</div>

						<div className="row" id="contact">
							<h2>Contacts</h2>
							{contactList()}
						</div>
						<div className="row" id="location">
							<h2>Location</h2>
							<p>{item.location}</p>
						</div>
					</div>

					<div className="container" id="itemDetailBtn">
						{props.user && item.userId === props.user.uid && (
							<Link
								type="button"
								className="submitButton1 btn btn-danger"
								to="/home"
								onClick={() => {
									handleDeletePost();
								}}
							>
								Delete Post
							</Link>
						)}
						<input
							type="button"
							className="purpleBtn"
							value="Save this Item"
							aria-label="save_item"
							onClick={() => handleSaveClick()}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
