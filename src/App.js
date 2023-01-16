import React, { useEffect } from "react";
import { useState } from "react";
import { useLocation, Routes, Route, Outlet, Navigate } from "react-router-dom";
import {
	getDatabase,
	ref,
	set as firebaseSet,
	onValue,
} from "firebase/database";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import Footer from "./footer";
import LandingPage from "./landingPage";
import HomePage from "./homePage";
import ItemDetailPage from "./itemDetailPage";
import PostItemPage from "./postItemPage";
import PersonalPage from "./personalPage";
import { NavBar, Banner } from "./navbar/navbar";
import SearchBar from "./searchBar";
import SavedItemsPage from "./savedItemsPage";
import SupportPage from "./supportPage";
import LoginPage from "./loginPage";
import { CATEGORIES } from "./data";

function App() {
	const [user, loading] = useAuthState(getAuth());
	const [allItems, setAllItems] = useState([]);
	const [searchText, setSearchText] = useState("");
	const [selectedCategories, setSelectedCategories] = useState([]);
	const [alertCondition, setAlertCondition] = useState([3, ""]);

	/**
	 * Alert
	 * setAlertCondition([index 0, index 1])
	 * index 0 : [1 : success, 2 : fail, 3 : non-display]
	 * index 1 : ["Save", "Delete", "Post", "Send message"]
	 */
	const removeAlert = () => {
		setAlertCondition([3, ""]);
	};
	const handleAlertChange = (inputCondition) => {
		const newAlertCondition = inputCondition;
		setAlertCondition(newAlertCondition);
	};
	const alertBox = (action) => {
		if (alertCondition[0] === 1) {
			const message = () => {
				switch (action) {
					case "Save":
					case "Delete":
					case "Post":
						return action + " this item Success!";
					case "Send message":
						return action + " success!";
				}
			};
			return (
				<div className="alert-success alert-dismissible alert">
					{message()}
					<button
						type="button"
						className="btn-close"
						data-bs-dismiss="alert"
						aria-label="Close"
						onClick={() => removeAlert()}
					></button>
				</div>
			);
		} else if (alertCondition[0] === 2) {
			const message = () => {
				switch (action) {
					case "Save":
					case "Delete":
						return "Fail to " + action + " this item!";
					case "Post":
						return (
							"Fail to " +
							action +
							" this item! Information incomplete"
						);
					case "Send message":
						return action + " failed! Please make sure you have fill in all the information correctly.";
				}
			};
			return (
				<div className="alert-danger alert-dismissible alert">
					{message()}
					<button
						type="button"
						className="btn-close"
						data-bs-dismiss="alert"
						aria-label="Close"
						onClick={() => removeAlert()}
					></button>
				</div>
			);
		} else {
			return null;
		}
	};

	useEffect(() => {
		const db = getDatabase();
		const allItemsRef = ref(db, "allItems");
		const allItemsOffFunction = onValue(allItemsRef, (snapshot) => {
			const newAllItems = snapshot.val();
			setAllItems(newAllItems);
		});

		function cleanUp() {
			allItemsOffFunction();
		}

		return cleanUp;
	}, []);

	const urlPath = useLocation();

	function handleSavedItemsChange(id, action, handleAlertChange) {
		const db = getDatabase();
		const allItemsRef = ref(db, "allItems");
		const newAllItems = { ...allItems };

		if (action === "add") {
			let newSavedBy = newAllItems[id].savedBy;

			if (!newSavedBy) {
				newSavedBy = [user.uid];
				newAllItems[id].savedBy = newSavedBy;
				handleAlertChange([1, "Save"]);
			} else if (!newSavedBy.includes(user.uid)) {
				newSavedBy.push(user.uid);
				newAllItems[id].savedBy = newSavedBy;
				handleAlertChange([1, "Save"]);
			} else {
				handleAlertChange([2, "Save"]);
			}
		}
		if (action === "delete") {
			const newSavedBy = newAllItems[id].savedBy.filter(
				(savedById) => savedById !== user.uid
			);
			newAllItems[id].savedBy = newSavedBy;
		}

		firebaseSet(allItemsRef, newAllItems);
	}

	function ProtectedPage(props) {
		if (props.loading) {
			return null;
		} else if (!props.user) {
			return <Navigate to="/login" />;
		} else {
			return <Outlet />;
		}
	}

	function SupportPageProtector(props) {
		if (props.loading) {
			return null;
		} else {
			return <Outlet />;
		}
	}

	let filteredItems;
  if(allItems) {
    filteredItems = Object.keys(allItems).map((key) => allItems[key]);
  } else {
    filteredItems = [];
  }

	if (selectedCategories.length > 0) {
		filteredItems = filteredItems.filter((item) => {
			return selectedCategories.includes(item.category);
		});
	}

	const handleSelectCategories = (event) => {
		let newSelectedCategories = [...selectedCategories];
		let targetCategory;
		if (event.target.alt) {
			targetCategory = event.target.alt.slice(13);
		} else {
			targetCategory = event.target.textContent;
		}
		if (
			selectedCategories.length < 0 ||
			!selectedCategories.includes(targetCategory)
		) {
			newSelectedCategories.push(targetCategory);
		} else {
			newSelectedCategories = newSelectedCategories.filter(
				(category) => category !== targetCategory
			);
		}
		setSelectedCategories(newSelectedCategories);
	};

	filteredItems = filteredItems.filter((item) => {
		return item.title.toLowerCase().includes(searchText.toLowerCase());
	});

	return (
		<div className="App">
			<header>
				<NavBar />
				{(urlPath.pathname.includes("/home") ||
					urlPath.pathname.includes("/detail")) && (
					<SearchBar
						handleChange={(event) =>
							setSearchText(event.target.value)
						}
					/>
				)}
				{urlPath.pathname === "/personal" && <Banner />}
			</header>
			<main>
				<div>{alertBox(alertCondition[1])}</div>
				<Routes>
					<Route element={<SupportPageProtector loading={loading} />}>
						<Route
							path="/support"
							element={
								<SupportPage
									handleAlertChange={handleAlertChange}
									user={user}
								/>
							}
						/>
					</Route>
					<Route path="/" element={<LandingPage />} />
					<Route
						path="/home"
						element={
							<HomePage
								allItems={filteredItems}
								categoryList={CATEGORIES}
								handleSavedItemsChange={handleSavedItemsChange}
								handleAlertChange={handleAlertChange}
								selectedCategories={selectedCategories}
								handleSelectCategories={handleSelectCategories}
							/>
						}
					/>
					<Route
						element={
							<ProtectedPage user={user} loading={loading} />
						}
					>
						<Route
							path="/personal"
							element={
								<PersonalPage user={user} allItems={allItems} />
							}
						/>
						<Route
							path="/post"
							element={
								<PostItemPage
									user={user}
									categories={CATEGORIES}
									handleAlertChange={handleAlertChange}
								/>
							}
						/>
						<Route
							path="/detail/:id"
							element={
								<ItemDetailPage
									user={user}
									allItems={allItems}
									handleSavedItemsChange={
										handleSavedItemsChange
									}
									handleAlertChange={handleAlertChange}
								/>
							}
						/>
						<Route
							path="/savedItems"
							element={
								<SavedItemsPage
									user={user}
									allItems={allItems}
									handleSavedItemsChange={
										handleSavedItemsChange
									}
									handleAlertChange={handleAlertChange}
								/>
							}
						/>
					</Route>
					<Route path="/login" element={<LoginPage user={user} />} />
				</Routes>
			</main>
			<footer>
				<Footer />
			</footer>
		</div>
	);
}

export default App;
