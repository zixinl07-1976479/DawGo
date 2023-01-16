import React, { useEffect, useState } from "react";
import {
	ref as storageRef,
	getStorage,
	uploadBytes,
	getDownloadURL,
} from "firebase/storage";
import {
	ref as dbRef,
	getDatabase,
	push as firebasePush,
	set as firebaseSet,
	onValue,
} from "firebase/database";
import Masonry from "react-responsive-masonry";

/**
 * @param props.user: user object in the realtime database
 * @param props.categories: the default category list in data.js
 * @param props.handleAlertChange: the function to set alert condition
 */
export default function PostItemPage(props) {
	const categories = props.categories.map((category) => (
		<option key={category.name} value={category.name}>
			{category.name}
		</option>
	));

	const defaultImageUrl = "./img/default_item_image.png";
	const [imageFiles, setImageFiles] = useState([]);
	const [localUrls, setLocalUrls] = useState([]);
	const [itemInfo, setItemInfo] = useState({
		title: undefined,
		price: undefined,
		category: undefined,
		negotiable: true,
		condition: undefined,
		location: undefined,
		description: undefined,
		pickUp: false,
		dropOff: false,
		userId: props.user.uid,
		itemId: "000000",
		imgUrls: [],
	});

	useEffect(() => {
		const db = getDatabase();
		const draftRef = dbRef(db, "itemDrafts/" + props.user.uid);
		const draftOffFunction = onValue(draftRef, (snapshot) => {
			const newItemInfo = snapshot.val();
			if (newItemInfo) {
				Object.keys(newItemInfo).forEach((key) => {
					if (newItemInfo[key] === "undefined") {
						newItemInfo[key] = undefined;
					}
				});
        if(!newItemInfo["imgUrls"]){
          newItemInfo["imgUrls"] = [];
        }
				setItemInfo(newItemInfo);

			}
		});

		function cleanUp() {
			draftOffFunction();
		}
		return cleanUp;
	}, []);

	function handleInfoInput(field, data) {
		const db = getDatabase();
		const draftRef = dbRef(db, "itemDrafts/" + props.user.uid);

		const newItemInfo = { ...itemInfo };
		newItemInfo[field] = data;
		Object.keys(newItemInfo).forEach((key) => {
			if (newItemInfo[key] === undefined) {
				newItemInfo[key] = "undefined";
			}
		});
		firebaseSet(draftRef, newItemInfo);
	}

	let displayedImages;
	if (itemInfo.imgUrls.length === 0) {
		displayedImages = (
			<img
				className="item_image"
				src={defaultImageUrl}
				alt="default state of the item"
				border="1px"
			/>
		);
	} else {
		displayedImages = itemInfo.imgUrls.map((displayedImage) => {
			return (
				<img
					key={displayedImage}
					src={displayedImage}
					alt="item"
					border="1px"
				/>
			);
		});
	}

	const handleAddImage = (event) => {
		if (event.target.files.length > 0 && event.target.files[0]) {
			const newImageFile = event.target.files[0];
			const newImageFiles = [...imageFiles, newImageFile];
			setImageFiles(newImageFiles);
			const newImgUrls = [
				...itemInfo.imgUrls,
				URL.createObjectURL(newImageFile),
			];
		
			handleInfoInput("imgUrls", newImgUrls);
		}
	};

	const handleDeleteImage = () => {
		const newImageFiles = [...imageFiles].slice(0, -1);
		const newImgUrls = [...itemInfo.imgUrls].slice(0, -1);
		setImageFiles(newImageFiles);
		handleInfoInput("imgUrls", newImgUrls);
	};

	function checkCompletion() {
		if (
			Object.values(itemInfo).includes(undefined) ||
			itemInfo.imgUrls.length <= 0
		) {
			return false;
		}
		return itemInfo.dropOff || itemInfo.pickUp;
	}

	const handleUpload = async () => {
		if (checkCompletion()) {
			const db = getDatabase();

			const allItemsRef = dbRef(db, "allItems");
      const draftRef = dbRef(db, "itemDrafts/" + props.user.uid);
			const itemId = firebasePush(allItemsRef, itemInfo).key;
			const storage = getStorage();

			const remoteUrls = await Promise.all(
				imageFiles.map(async (image) => {
					const itemImageRef = storageRef(
						storage,
						"itemImages/" + itemId.slice(4) + "/" + image.name
					);
					await uploadBytes(itemImageRef, image);
					const url = await getDownloadURL(itemImageRef);
					return url;
				})
			);
      
      const newItemInfo = {...itemInfo};
			newItemInfo.imgUrls = remoteUrls;
			newItemInfo.itemId = itemId;

			const itemRef = dbRef(db, "allItems/" + itemId);
			firebaseSet(itemRef, newItemInfo);
      firebaseSet(draftRef, null);

			props.handleAlertChange([1, "Post"]);
		} else {
			props.handleAlertChange([2, "Post"]);
		}
	};

	return (
		<div className="container" id="postItemPage">
			<div className="row">
				<div className="col col-md-5 col-lg-6">
					<div id="imageUploadForm">
						<Masonry columnsCount={2} gutter="10px">
							{displayedImages}
						</Masonry>
					</div>
					<label
						htmlFor="imageUploadInput"
						className="btn btn-sm btn-primary me-2"
					>
						{" "}
						Add Picture{" "}
					</label>
					<input
						type="file"
						name="image"
						id="imageUploadInput"
						className="d-none"
						onChange={(event) => handleAddImage(event)}
					></input>

					<button
						className="btn btn-sm btn-danger me-2"
						onClick={(event) => handleDeleteImage(event)}
					>
						Delete Last Picture{" "}
					</button>
				</div>

				<div className="col col-md-7 col-lg-6">
					<form>
						<table>
							<tbody>
								<tr>
									<td>
										<label htmlFor="itemName">
											Item Name
										</label>
									</td>
									<td>
										<label htmlFor="itemPrice">Price</label>
									</td>
								</tr>

								<tr>
									<td>
										<input
											type="text"
											className="text"
											name="itemName"
											id="itemName"
											aria-label="text"
                      defaultValue={itemInfo.title}
											onChange={(event) =>
												handleInfoInput(
													"title",
													event.target.value
												)
											}
										/>
									</td>
									<td>
										<input
											type="number"
											className="text"
											name="itemPrice"
											id="itemPrice"
											defaultValue={itemInfo.price}
											aria-label="number"
											onChange={(event) =>
												handleInfoInput(
													"price",
													event.target.value
												)
											}
										/>
									</td>
								</tr>

								<tr>
									<td>
										<label htmlFor="category_input">
											Category
										</label>
									</td>
									<td>
										<input
											type="checkbox"
											id="non-negotiable_price checkbox"
											value="non-negotiable_price"
											aria-label="non-negotiable_price"
											checked={!itemInfo.negotiable}
											onChange={(event) =>
												handleInfoInput(
													"negotiable",
													!event.target.checked
												)
											}
										/>
										<label htmlFor="non-negotiable_price checkbox">
											Non-negotiable Price
										</label>
									</td>
								</tr>

								<tr>
									<td>
										<select
											id="category_input"
											name="category"
											value={itemInfo.category}
											onChange={(event) =>
												handleInfoInput(
													"category",
													event.target.value
												)
											}
										>
											<option value="">
												Please Select Category
											</option>
											{categories}
										</select>
									</td>
									<td></td>
								</tr>

								<tr>
									<td>
										<label htmlFor="condition_input">
											Condition
										</label>
									</td>
									<td>
										<label htmlFor="itemLocation">
											Item Location
										</label>
									</td>
								</tr>

								<tr>
									<td>
										<select
											name="condition"
											id="condition_input"
											value={itemInfo.condition}
											onChange={(event) =>
												handleInfoInput(
													"condition",
													event.target.value
												)
											}
										>
											<option value="">
												Please Select Condition
											</option>
											<option value="brandNew">
												Brand new
											</option>
											<option value="openBox">
												Open box
											</option>
											<option value="used">Used</option>
											<option value="other">Other</option>
											<option value="unknown">
												Unknown
											</option>
										</select>
									</td>
									<td>
										<input
											type="text"
											className="text"
											id="itemLocation"
											aria-label="item_location"
                      defaultValue={itemInfo.location}
											onChange={(event) =>
												handleInfoInput(
													"location",
													event.target.value
												)
											}
										/>
									</td>
								</tr>

								<tr>
									<td>
										<label htmlFor="exampleFormControlTextareaBox1">
											Description
										</label>
									</td>
									<td>
										<input
											type="checkbox"
											value="pickup"
											id="pick_up"
											checked={itemInfo.pickUp}
											onChange={(event) =>
												handleInfoInput(
													"pickUp",
													event.target.checked
												)
											}
										/>
										<label htmlFor="pick_up">Pick up</label>
										&emsp;
										<input
											type="checkbox"
											value="dropOff"
											id="dropOff"
											checked={itemInfo.dropOff}
											onChange={(event) =>
												handleInfoInput(
													"dropOff",
													event.target.checked
												)
											}
										/>
										<label htmlFor="dropOff">
											Drop off
										</label>
									</td>
								</tr>
								<tr>
									<td>
										<textarea
											className="form-control"
											id="exampleFormControlTextareaBox1"
											rows="5"
                      defaultValue={itemInfo.description}
											onChange={(event) =>
												handleInfoInput(
													"description",
													event.target.value
												)
											}
										></textarea>
									</td>
								</tr>

								<tr>
									<td colSpan="2">
										<input
											type="button"
											className="purpleBtn"
											value="Post Item"
											aria-label="submit_form"
											onClick={() => handleUpload()}
										/>
									</td>
								</tr>
							</tbody>
						</table>
					</form>
				</div>
			</div>
		</div>
	);
}
