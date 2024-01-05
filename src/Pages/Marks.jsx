import React from "react";
import Api from "../Api/Api";

const Marks = () => {
	const [students, setStudents] = React.useState([]);
	const [marksFilter, setMarksFilter] = React.useState([]);
	const [searchTerm, setSearchTerm] = React.useState("");

	const fetchStudents = async () => {
		try {
			const res = await Api.get("/students");
			console.log(res.data);
			setStudents(res.data.students);
		} catch (err) {
			console.log(err);
		}
	};

	React.useEffect(() => {
		fetchStudents();
	}, [marksFilter]);

	const filterStudents = () => {
		return students.filter((student) => {
			const studentInRange =
				(marksFilter.includes("below400") && parseInt(student.marks) < 400) ||
				(marksFilter.includes("400-700") &&
					parseInt(student.marks) >= 400 &&
					parseInt(student.marks) <= 700) ||
				(marksFilter.includes("above700") && parseInt(student.marks) > 700);

			const searchTermMatch =
				student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
				student.marks.includes(searchTerm);

			return studentInRange && searchTermMatch;
		});
	};

	const handleMarksFilterChange = (value) => {
		if (marksFilter.includes(value)) {
			setMarksFilter(
				marksFilter.filter((filteredValue) => filteredValue !== value)
			);
		} else {
			setMarksFilter([...marksFilter, value]);
		}
	};

	const handleSearchTermChange = (event) => {
		setSearchTerm(event.target.value);
	};

	const filteredStudents =
		marksFilter.length === 0 ? students : filterStudents();

	return (
		<React.Fragment>
			<div className="d-flex justify-content-center">
				<h4 className="text-danger">
					Also Search among the data filters applied
				</h4>
			</div>
			<div className="d-flex align-items-center justify-content-around py-2 px-3 border border-2 border-success rounded">
				<label htmlFor="below400">
					<input
						id="below400"
						type="checkbox"
						value="below400"
						checked={marksFilter.includes("below400")}
						onChange={() => handleMarksFilterChange("below400")}
					/>
					<span className="checkbox-replacement"></span>
					Below 400
				</label>
				<label htmlFor="400-700">
					<input
						id="400-700"
						type="checkbox"
						value="400-700"
						checked={marksFilter.includes("400-700")}
						onChange={() => handleMarksFilterChange("400-700")}
					/>
					<span className="checkbox-replacement"></span>
					400 - 700
				</label>
				<label htmlFor="above700">
					<input
						id="above700"
						type="checkbox"
						value="above700"
						checked={marksFilter.includes("above700")}
						onChange={() => handleMarksFilterChange("above700")}
					/>
					<span className="checkbox-replacement"></span>
					Above 700
				</label>
			</div>
			<div>
				<label htmlFor="search">Search: </label>
				<input
					id="search"
					type="text"
					value={searchTerm}
					onChange={handleSearchTermChange}
					className="w-100 form-control"
					placeholder="Filter & Search"
				/>
			</div>
			<table style={{ width: "100%" }}>
				<thead>
					<tr
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
							padding: "10px 20px",
						}}>
						<th>ID</th>
						<th>Name</th>
						<th>Class</th>
						<th>Marks</th>
					</tr>
				</thead>
				<tbody>
					{filteredStudents?.map((student) => (
						<tr
							style={{
								display: "flex",
								alignItems: "center",
								justifyContent: "space-between",
								padding: "10px 20px",
							}}
							key={student._id}>
							<td className="d-flex justify-content-center">{student._id}</td>
							<td className="d-flex justify-content-center">{student.name}</td>
							<td className="d-flex justify-content-center">
								{student.standard}
							</td>
							<td className="d-flex justify-content-center">{student.marks}</td>
						</tr>
					))}
				</tbody>
			</table>
		</React.Fragment>
	);
};

export default Marks;
