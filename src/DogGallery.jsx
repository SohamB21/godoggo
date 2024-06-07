import React, { useEffect, useState } from "react";
import { fetchDogs } from "./dogApi";
import {
	Container,
	TextField,
	Card,
	CardMedia,
	CardContent,
	Typography,
	Button,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import cardBg from "./assets/cardBg.jpg";

const DogGallery = () => {
	const [dogs, setDogs] = useState([]);
	const [searchQuery, setSearchQuery] = useState("");
	const [breeds, setBreeds] = useState([]);

	const getDogs = async () => {
		const dogs = await fetchDogs();
		setDogs(dogs);
		// Extract unique breed names
		const uniqueBreeds = Array.from(
			new Set(dogs.map((dog) => dog.breeds[0]?.name)),
		);
		setBreeds(uniqueBreeds);
	};

	useEffect(() => {
		getDogs();
	}, []);

	const filteredDogs = dogs.filter((dog) =>
		dog.breeds[0]?.name.toLowerCase().includes(searchQuery.toLowerCase()),
	);

	return (
		<Container sx={{ padding: "2rem" }}>
			<Typography
				variant="h4"
				gutterBottom
				align="center"
				fontSize="3rem"
				fontFamily="georgia"
				sx={{ marginBottom: "2rem" }}
			>
				Dog Gallery
			</Typography>

			<div
				style={{
					display: "flex",
					alignItems: "center",
					gap: "16px",
					marginBottom: "4rem",
				}}
			>
				<Autocomplete
					options={breeds.map((option) => option || "Unknown Breed")}
					renderInput={(params) => (
						<TextField
							{...params}
							label="Search by Breed"
							variant="filled"
							fullWidth
							onChange={(e) => setSearchQuery(e.target.value)}
							sx={{ borderRadius: 5 }}
						/>
					)}
					sx={{ flex: 1 }}
				/>
				<Button
					variant="contained"
					color="primary"
					onClick={getDogs}
					sx={{ height: "50px", borderRadius: 5 }}
				>
					Refresh
				</Button>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
				{filteredDogs.map((dog) => (
					<Card
						key={dog.id}
						sx={{
							boxShadow: 12,
							borderRadius: 8,
							backgroundImage: `linear-gradient(rgba(0, 0, 100, 1), rgba(0, 0, 100, 0.8), rgba(0, 0, 100, 0.6)), url(${cardBg})`,

							backgroundSize: "contain",
							backgroundPosition: "center",
						}}
					>
						<CardMedia
							component="img"
							alt={dog.breeds[0]?.name}
							height="200"
							image={dog.url}
							title={dog.breeds[0]?.name}
							sx={{ objectFit: "cover" }}
						/>
						<CardContent>
							<Typography
								gutterBottom
								variant="h5"
								component="div"
								sx={{
									fontWeight: "bolder",
									color: "white",
								}}
							>
								{dog.breeds[0]?.name || "Unknown Breed"}
							</Typography>
							<Typography
								variant="body2"
								color="textSecondary"
								component="p"
								sx={{
									fontStyle: "italic",
									fontWeight: "bold",
									color: "white",
								}}
							>
								{dog.breeds[0]?.temperament ||
									"No temperament info"}
							</Typography>
						</CardContent>
					</Card>
				))}
			</div>
		</Container>
	);
};

export default DogGallery;
