import React, { useEffect, useState } from "react";
import { fetchDogs } from "./dogApi";
import {
	Container,
	TextField,
	Card,
	CardMedia,
	CardContent,
	Typography,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";

const DogGallery = () => {
	const [dogs, setDogs] = useState([]);
	const [searchQuery, setSearchQuery] = useState("");
	const [breeds, setBreeds] = useState([]);

	useEffect(() => {
		const getDogs = async () => {
			const dogs = await fetchDogs();
			setDogs(dogs);
			// Extract unique breed names
			const uniqueBreeds = Array.from(
				new Set(dogs.map((dog) => dog.breeds[0]?.name)),
			);
			setBreeds(uniqueBreeds);
		};
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
				sx={{ marginBottom: "1rem" }}
			>
				Dog Gallery
			</Typography>

			<Autocomplete
				options={breeds.map((option) => option || "Unknown Breed")}
				renderInput={(params) => (
					<TextField
						{...params}
						label="Search by Breed"
						variant="filled"
						fullWidth
						margin="normal"
						onChange={(e) => setSearchQuery(e.target.value)}
						sx={{ marginTop: "1rem", marginBottom: "4rem" }}
					/>
				)}
			/>

			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
				{filteredDogs.map((dog) => (
					<Card
						key={dog.id}
						sx={{
							boxShadow: 5,
							borderRadius: 4,
							backgroundImage: `linear-gradient(to bottom right, #C3CBDC, #91A6FF, #F0E68C, #C3CBDC)`,
						}}
					>
						<CardMedia
							component="img"
							alt={dog.breeds[0]?.name}
							height="150"
							image={dog.url}
							title={dog.breeds[0]?.name}
						/>
						<CardContent>
							<Typography
								gutterBottom
								variant="h5"
								component="div"
							>
								{dog.breeds[0]?.name || "Unknown Breed"}
							</Typography>
							<Typography
								variant="body2"
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
