import Axios from "axios";

const Api = Axios.create({
	baseURL: "http://localhost:5000/api",
	headers: {
		"Content-Type": "application/json",
	},
});

export default Api;
