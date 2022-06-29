import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useImmerReducer } from "use-immer";
import { useNavigate } from "react-router-dom";

// React leaflet
import {
	MapContainer,
	TileLayer,
	Marker,
	Popup,
	useMap,
} from "react-leaflet";

import { Icon } from "leaflet";
// MUI
import {
	Grid,
	AppBar,
	Typography,
	Button,
	Card,
	CardHeader,
	CardMedia,
	CardContent,
	CircularProgress,
	IconButton,
	CardActions,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import RoomIcon from "@mui/icons-material/Room";

// Map icons
import houseIconPng from "../Assets/Mapicons/house.png";
import apartmentIconPng from "../Assets/Mapicons/apartment.png";
import officeIconPng from "../Assets/Mapicons/office.png";

const useStyles = makeStyles({
	cardStyle: {
		margin: "0.5rem",
		border: "1px solid black",
		position: "relative",
	},
	pictureStyle: {
		paddingRight: "1rem",
		paddingLeft: "1rem",
		height: "20rem",
		width: "30rem",
		cursor: "pointer",
	},
	priceOverlay: {
		position: "absolute",
		backgroundColor: "green",
		zIndex: "1000",
		color: "white",
		top: "100px",
		left: "20px",
		padding: "5px",
	},
});

function Listings() {

	const navigate = useNavigate();
	const classes = useStyles();
	const houseIcon = new Icon({
		iconUrl: houseIconPng,
		iconSize: [40, 40],
	});

	const apartmentIcon = new Icon({
		iconUrl: apartmentIconPng,
		iconSize: [40, 40],
	});

	const officeIcon = new Icon({
		iconUrl: officeIconPng,
		iconSize: [40, 40],
	});

	const initialState = {
		mapInstance: null,
	};

	function reducer(draft, action) {
		switch (action.type) {
			case "getMap":
				draft.mapInstance = action.mapData;
				break;
			default: { // added brackets
				console.log('Empty action received.');
			}
		}

	}

	const [state, dispatch] = useImmerReducer(reducer, initialState);
	const mapRef = useMap();

	function TheMapComponent() {
		dispatch({ type: "getMap", mapData: mapRef });
		return null;
	}

	const [allListings, setAllListings] = useState([]);
	const [dataIsLoading, setDataIsLoading] = useState(true);

	useEffect(() => {
		const source = Axios.CancelToken.source();
		async function GetAllListings() {
			try {
				const response = await Axios.get(
					"https://www.websitehostapitrademark.com/api/listings/",
					//"www.trademarkwebapihost.com/api/listings/",
					{ cancelToken: source.token }
				);

				setAllListings(response.data);
				setDataIsLoading(false);
			} catch (error) {}
		}
		GetAllListings();
		return () => {
			source.cancel();
		};
	}, []);

	if (dataIsLoading === true) {
		return (
			<Grid
				container
				justifyContent="center"
				alignItems="center"
				style={{ height: "100vh" }}
			>
				<CircularProgress />
			</Grid>
		);
	}

	return (
		<Grid container>
			<Grid item xs={4}>
				{allListings.map((listing) => {
					return (
						<Card key={listing.id} className={classes.cardStyle}>
							<CardHeader
								action={
									<IconButton
										aria-label="settings"
										onClick={() =>
											state.mapInstance.flyTo(
												[listing.latitude, listing.longitude],
												16
											)
										}
									>
										<RoomIcon />
									</IconButton>
								}
								title={listing.title}
							/>
							<CardMedia
								className={classes.pictureStyle}
								component="img"
								image={listing.picture1}
								alt={listing.title}
								onClick={() => navigate(`/listings/${listing.id}`)}
							/>
							<CardContent>
								<Typography variant="body2">
									{listing.description.substring(0, 200)}...
								</Typography>
							</CardContent>

							{listing.property_status === "Sale" ? (
								<Typography className={classes.priceOverlay}>
									{listing.listing_type}: $
									{listing.price
										.toString()
										.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
								</Typography>
							) : (
								<Typography className={classes.priceOverlay}>
									{listing.listing_type}: $
									{listing.price
										.toString()
										.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
									/ {listing.rental_frequency}
								</Typography>
							)}

							<CardActions disableSpacing>
								<IconButton aria-label="add to favorites">
									{listing.seller_agency_name}
								</IconButton>
							</CardActions>
						</Card>
					);
				})}
			</Grid>
			<Grid item xs={8} style={{ marginTop: "1rem" }}>
				<AppBar position="sticky">
					<div style={{ height: "150vh" }}>
						<MapContainer
							center={[42.34970066068954, -71.07698950948166]}
							zoom={15}
							scrollWheelZoom={true}
						>
							<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; <a href=&quot;https://www.openstreetmap.org/copyright&quot;>OpenStreetMap</a> contributors" 
							/>
							<TheMapComponent />

							{allListings.map((listing) => {
								function IconDisplay() {
									if (listing.listing_type === "House") {
										return houseIcon;
									} else if (listing.listing_type === "Apartment") {
										return apartmentIcon;
									} else if (listing.listing_type === "Office") {
										return officeIcon;
									}
								}
								return (
									<Marker
										key={listing.id}
										icon={IconDisplay()}
										position={[listing.latitude, listing.longitude]}
									>
										<Popup>
											<Typography variant="h5">{listing.title}</Typography>
											<img
												src={listing.picture1}
												style={{
													height: "15rem",
													width: "18rem",
													cursor: "pointer",
												}}
												onClick={() => navigate(`/listings/${listing.id}`)}
												alt=""
											/>
											<Typography variant="body1">
												{listing.description.substring(0, 150)}...
											</Typography>
											<Button
												variant="contained"
												fullWidth
												onClick={() => navigate(`/listings/${listing.id}`)}
											>
												Details
											</Button>
										</Popup>
									</Marker>
								);
							})}
						</MapContainer>
					</div>
				</AppBar>
			</Grid>
		</Grid>
	);
}

export default Listings;
