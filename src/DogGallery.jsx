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
							boxShadow: 10,
							borderRadius: 5,
							backgroundImage: `linear-gradient(to bottom right, #eee9f1, #c6feff, #ffd295)`,
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
								sx={{ fontFamily: "times" }}
							>
								{dog.breeds[0]?.name || "Unknown Breed"}
							</Typography>
							<Typography
								variant="body1"
								color="textSecondary"
								component="p"
								sx={{ fontStyle: "italic" }}
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
