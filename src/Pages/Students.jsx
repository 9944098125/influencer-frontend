import React from "react";
import { Modal } from "react-bootstrap";
import Api from "../Api/Api";
import { Formik, Form, Field } from "formik";

const Students = () => {
	const [students, setStudents] = React.useState([]);

	const [createModal, setCreateModal] = React.useState(false);
	const [editModal, setEditModal] = React.useState(false);
	const [stud, setStud] = React.useState({
		_id: "",
		name: "",
		standard: "",
		marks: "",
	});
	const [studentDeleted, setStudentDeleted] = React.useState(false);

	const [values] = React.useState({
		name: "",
		standard: "",
		marks: "",
	});

	const validate = (values) => {
		let errors = {};
		if (!values.name) {
			errors.name = "Name is required";
		}
		if (!values.standard) {
			errors.standard = "Class is required";
		}
		if (!values.marks) {
			errors.marks = "Marks is required";
		}
		return errors;
	};

	const openCreateModal = () => {
		setCreateModal(true);
	};

	const closeCreateModal = () => {
		setCreateModal(false);
	};

	const openEditModal = (student) => {
		setEditModal(true);
		setStud(student);
		// console.log(student);
	};

	const closeEditModal = () => {
		setEditModal(false);
	};

	const createStudent = async (values) => {
		await Api.post("/students/create", values);
		closeCreateModal();
	};

	const fetchStudents = async () => {
		try {
			const res = await Api.get("/students");
			// console.log(res.data);
			setStudents(res.data.students);
		} catch (err) {
			console.log(err);
		}
	};

	React.useEffect(() => {
		fetchStudents();
	}, [createModal, editModal, studentDeleted]);

	const editStudent = async (values) => {
		try {
			await Api.patch(`/students/update/${stud._id}`, values);
			setEditModal(false);
		} catch (err) {
			console.log(err);
		}
	};

	const deleteStudent = async (id) => {
		try {
			await Api.delete(`/students/delete/${id}`);
			setStudentDeleted(!studentDeleted);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<React.Fragment>
			<div className="container-fluid p-4">
				<button onClick={openCreateModal} className="btn btn-dark">
					Create Student
				</button>
				<table className="w-100">
					<tr className="d-flex align-items-center justify-content-between">
						<th className="">Name</th>
						<th className="">Class Pursuing</th>
						<th className="">Marks</th>
						<th>Edit</th>
						<th>Delete</th>
					</tr>
					<tr className="">
						{students?.map((student, idx) => {
							return (
								<div className="d-flex align-items-center justify-content-between">
									<td className="">{student.name}</td>
									<td className="">{student.standard}</td>
									<td className="">{student.marks}</td>
									<td>
										<button
											onClick={() => openEditModal(student)}
											className="btn btn-primary">
											Edit
										</button>
									</td>
									<td>
										<button
											onClick={() => deleteStudent(student._id)}
											className="btn btn-danger">
											Delete
										</button>
									</td>
								</div>
							);
						})}
					</tr>
				</table>
				{createModal && (
					<Modal
						show={createModal}
						onHide={closeCreateModal}
						centered
						size="md"
						backdrop="static">
						<Modal.Header closeButton>Create Student</Modal.Header>
						<Modal.Body>
							<Formik
								initialValues={values}
								validate={(values) => validate(values)}
								onSubmit={(values) => createStudent(values)}
								enableReinitialize>
								{({ errors, touched }) => (
									<Form>
										<div className="form-group mb-2">
											<Field
												type="text"
												name="name"
												className={
													errors.name && touched.name
														? "is-invalid form-control"
														: "form-control"
												}
												placeholder="Student Name"
											/>
											{errors.name && touched.name && (
												<div className="invalid-feedback">{errors.name}</div>
											)}
										</div>
										<div className="form-group mb-2">
											<Field
												type="text"
												name="standard"
												className={
													errors.standard && touched.standard
														? "is-invalid form-control"
														: "form-control"
												}
												placeholder="Class"
											/>
											{errors.standard && touched.standard && (
												<div className="invalid-feedback">
													{errors.standard}
												</div>
											)}
										</div>
										<div className="form-group mb-2">
											<Field
												type="text"
												name="marks"
												className={
													errors.marks && touched.marks
														? "is-invalid form-control"
														: "form-control"
												}
												placeholder="Enter Marks"
											/>
											{errors.marks && touched.marks && (
												<div className="invalid-feedback">{errors.marks}</div>
											)}
										</div>
										<div className="form-group mb-2">
											<button type="submit" className="btn btn-success w-100">
												Submit
											</button>
										</div>
									</Form>
								)}
							</Formik>
						</Modal.Body>
					</Modal>
				)}

				{editModal && (
					<Modal
						show={editModal}
						onHide={closeEditModal}
						centered
						size="md"
						backdrop="static">
						<Modal.Header closeButton>Edit Student</Modal.Header>
						<Modal.Body>
							<Formik
								initialValues={stud}
								validate={(values) => validate(values)}
								onSubmit={(values) => editStudent(values)}
								enableReinitialize>
								{({ errors, touched }) => (
									<Form>
										<div className="form-group mb-2">
											<Field
												type="text"
												name="name"
												className={
													errors.name && touched.name
														? "is-invalid form-control"
														: "form-control"
												}
												placeholder="Student Name"
											/>
											{errors.name && touched.name && (
												<div className="invalid-feedback">{errors.name}</div>
											)}
										</div>
										<div className="form-group mb-2">
											<Field
												type="text"
												name="standard"
												className={
													errors.standard && touched.standard
														? "is-invalid form-control"
														: "form-control"
												}
												placeholder="Class"
											/>
											{errors.standard && touched.standard && (
												<div className="invalid-feedback">
													{errors.standard}
												</div>
											)}
										</div>
										<div className="form-group mb-2">
											<Field
												type="text"
												name="marks"
												className={
													errors.marks && touched.marks
														? "is-invalid form-control"
														: "form-control"
												}
												placeholder="Enter Marks"
											/>
											{errors.marks && touched.marks && (
												<div className="invalid-feedback">{errors.marks}</div>
											)}
										</div>
										<div className="form-group mb-2">
											<button type="submit" className="btn btn-success w-100">
												Submit
											</button>
										</div>
									</Form>
								)}
							</Formik>
						</Modal.Body>
					</Modal>
				)}
			</div>
		</React.Fragment>
	);
};

export default Students;
