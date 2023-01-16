import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "./card";
import { signOut, getAuth } from "firebase/auth";
import {
	getStorage,
	ref as storageRef,
	uploadBytes,
	getDownloadURL,
} from "firebase/storage";
import {
	getDatabase,
	ref as dbRef,
	set as firebaseSet,
	onValue,
} from "firebase/database";
import { DEFAULT_USER_INFO } from "./data";

/**
 * @param props.user: user object in the realtime database
 * @param props.allItems: item information in the realtime database
 */
export default function PersonalPage(props) {
	const [userInfo, setUserInfo] = useState(DEFAULT_USER_INFO);
	const [isEditing, setIsEditing] = useState(false);

	let userId = DEFAULT_USER_INFO.userId;

	useEffect(() => {
		const db = getDatabase();
		if (props.user) {
			userId = props.user.uid;
		}
		const userInfoRef = dbRef(db, "users/" + userId);
		const userInfoOffFunction = onValue(userInfoRef, (snapshot) => {
			let newUserInfo = snapshot.val();
			if (newUserInfo) {
				setUserInfo(newUserInfo);
			} else {
				newUserInfo = DEFAULT_USER_INFO;
				newUserInfo.userId = userId;
				firebaseSet(userInfoRef, newUserInfo);
			}
		});

		function cleanUp() {
			userInfoOffFunction();
		}
		return cleanUp;
	}, []);

	const allItems = Object.keys(props.allItems).map(
		(key) => props.allItems[key]
	);
	const savedItems = allItems.filter((item) => {
		if (!item.savedBy) {
			return false;
		} else {
			return item.savedBy.includes(props.user.uid);
		}
	});
	const savedItemCards = () => {
		if (savedItems.length > 0) {
			const tempSavedItemCards = savedItems.map((item) => (
				<Card key={item.itemId} data={item} />
			));
			return tempSavedItemCards;
		} else {
			return (
				<div>
					<p>You haven't saved any item yet</p>
					<Link className="submitButton btn btn-primary" to="/home">
						Expolore Dawgo!
					</Link>
				</div>
			);
		}
	};

	const postedItems = allItems.filter(
		(item) => item.userId === props.user.uid
	);
	const postedItemCards = () => {
		if (postedItems.length > 0) {
			const tempPostedItemCards = postedItems.map((item) => (
				<Card key={item.itemId} data={item} />
			));
			return tempPostedItemCards;
		} else {
			return (
				<div>
					<p>You haven't posted any item yet</p>
					<Link className="submitButton btn btn-primary" to="/post">
						Post a new item
					</Link>
				</div>
			);
		}
	};

	const handleSignOut = () => {
		signOut(getAuth());
	};

	const db = getDatabase();
	let userInfoRef;
	if (props.user) {
		userInfoRef = dbRef(db, "users/" + props.user.uid);
	}
	const storage = getStorage();

	const handleInfoInput = (field, data) => {
		const newUserInfo = { ...userInfo };
		newUserInfo[field] = data;
		setUserInfo(newUserInfo);
	};

	const handleUpload = () => {
		firebaseSet(userInfoRef, userInfo);
		setIsEditing(false);
	};

	let imgFile;
	const handleEditImage = async (event) => {
		if (event.target.files.length > 0 && event.target.files[0]) {
			imgFile = event.target.files[0];
			const userImagesRef = storageRef(
				storage,
				"userImages/" + imgFile.name
			);
			await uploadBytes(userImagesRef, imgFile);
			const url = await getDownloadURL(userImagesRef);
			const newUserInfo = { ...userInfo };
			newUserInfo.imgUrl = url;
			firebaseSet(userInfoRef, newUserInfo);
		}
	};

	const inputForm = (
		<div className="col col-sm-8 col-lg-9">
			<form>
				<table>
					<tbody>
						<tr>
							<td>
								<label htmlFor="userName">User Name</label>
							</td>
							<td>
								<label htmlFor="userZipCode">ZipCode</label>
							</td>
						</tr>

						<tr>
							<td>
								<input
									type="text"
									className="text"
									name="userName"
									id="userName"
									aria-label="text"
									value={userInfo.name}
									onChange={(event) =>
										handleInfoInput(
											"name",
											event.target.value
										)
									}
								/>
							</td>
							<td>
								<input
									type="number"
									className="text"
									name="userZipCode"
									id="userZipCode"
									aria-label="number"
									value={userInfo.zipCode}
									onChange={(event) =>
										handleInfoInput(
											"zipCode",
											event.target.value
										)
									}
								/>
							</td>
						</tr>

						<tr>
							<td>
								<label htmlFor="contacts">Contacts</label>
							</td>
							<td>
								<input
									type="checkbox"
									id="UW-affiliation-checkbox"
									checked={userInfo.UW}
									aria-label="UW-affiliation"
									onChange={(event) =>
										handleInfoInput(
											"UW",
											event.target.checked
										)
									}
								/>
								<label htmlFor="UW-affiliation-checkbox">
									Affiliated with UW
								</label>
							</td>
						</tr>
						<tr>
							<td>
								<textarea
									className="form-control"
									id="contacts"
									rows="2"
									value={userInfo.contacts}
									onChange={(event) =>
										handleInfoInput(
											"contacts",
											event.target.value
										)
									}
								></textarea>
							</td>
						</tr>

						<tr>
							<td>
								<label htmlFor="exampleFormControlTextarea">
									Description
								</label>
							</td>
							<td></td>
						</tr>
						<tr>
							<td>
								<textarea
									className="form-control"
									id="exampleFormControlTextarea"
									rows="7"
									value={userInfo.description}
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
									className="submitButton"
									id="back"
									value="Exit without saving"
									aria-label="submit_form"
									onClick={() => setIsEditing(false)}
								/>
								<input
									type="button"
									className="submitButton"
									id="finish-edit"
									value="Finish editing"
									aria-label="submit_form"
									onClick={() => handleUpload()}
								/>
							</td>
						</tr>
					</tbody>
				</table>
			</form>
		</div>
	);

	return (
		<div id="personalPage">
			<div className="row">
				<div className="col col-sm-4 col-lg-3">
					<div id="personal_info" className="card">
						<img
							src={userInfo.imgUrl}
							className="card-img-top"
							alt="the user's profile"
						/>
						<div className="card-body">
							<div className="row">
								<div className="col-sm">
									<p id="user_name" className="card-title">
										<nobr>{userInfo.name}</nobr>
									</p>
									<br />
									<p className="card-title">
										<nobr>ZipCode:</nobr> <br />
										&nbsp;&nbsp;&nbsp;{userInfo.zipCode}
									</p>
									<p className="card-title">
										<nobr>Contacts:</nobr> <br />
										&nbsp;&nbsp;&nbsp;{userInfo.contacts}
									</p>
									<p className="card-title user-description">
										{userInfo.description}
									</p>
								</div>
							</div>
						</div>
						<label
							type="button"
							className="btn btn-light"
							htmlFor="imageUploadInput"
						>
							<em className="i bi bi-pencil-square"></em>
							Edit Profile Picture
						</label>
						<input
							type="file"
							name="image"
							id="imageUploadInput"
							className="d-none"
							onChange={(event) => handleEditImage(event)}
						></input>

						{!isEditing && (
							<button
								type="button"
								className="btn btn-light"
								onClick={() => setIsEditing(true)}
							>
								<em className="i bi bi-pencil-square"></em>
								Edit Info
							</button>
						)}

						<button
							type="button"
							className="btn btn-light"
							onClick={() => handleSignOut()}
						>
							<em className="i bi bi-pencil-square"></em>
							Sign Out
						</button>
					</div>
				</div>
				{!isEditing && (
					<div className="col col-sm-7 col-lg-9">
						<div className="row">
							<div className="col-12">
								<h1>Saved Items</h1>
								<hr className="line" />
							</div>
						</div>
						<div className="row">
							<div
								id="saved_items"
								className="row item-row-scroll"
							>
								{savedItemCards()}
							</div>
						</div>
						<div className="row">
							<div className="col-12">
								<h1>My Posted Items</h1>
								<hr className="line" />
							</div>
						</div>
						<div id="posted_items" className="row item-row-scroll">
							{postedItemCards()}
						</div>
					</div>
				)}
				{isEditing && inputForm}
			</div>
		</div>
	);
}
