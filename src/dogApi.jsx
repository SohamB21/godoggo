import axios from "axios";

const DOG_API_URL =
	"https://api.thedogapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=10";
const API_KEY =
	"live_M8cJP7tHNcq2qzrAbGlWXQA6ojaXE5zzRmzwlCaQpGzZlTV8JfRaHSSt7MChQ84E";

export const fetchDogs = async () => {
	// fetching the dog api with a try-catch block
	try {
		const response = await axios.get(DOG_API_URL, {
			headers: {
				"Content-Type": "application/json",
				"x-api-key": API_KEY,
			},
		});
		console.log(response.data);
		return response.data;
	} catch (error) {
		console.error("Error fetching dogs:", error);
		return [];
	}
};
