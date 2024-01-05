import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Students from "../Pages/Students";
import Teachers from "../Pages/Teachers";
import Marks from "../Pages/Marks";
import Navbar from "../Components/Navbar";
import Home from "../Pages/Home";

const Layout = () => {
	return (
		<div>
			<Navbar />
			<div className="outlet-container">
				<Outlet />
			</div>
		</div>
	);
};

const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "/students",
				element: <Students />,
			},
			{
				path: "/teachers",
				element: <Teachers />,
			},
			{
				path: "/marks",
				element: <Marks />,
			},
		],
	},
]);

export default function BaseRoutes() {
	return <RouterProvider router={router} />;
}
