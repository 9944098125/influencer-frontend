import React from "react";
import { Modal } from "react-bootstrap";
import Api from "../Api/Api";
import { Formik, Form, Field } from "formik";

const Teachers = () => {
	const [teachers, setTeachers] = React.useState([]);

	const [createModal, setCreateModal] = React.useState(false);
	const [editModal, setEditModal] = React.useState(false);
	const [teacher, setTeacher] = React.useState({
		_id: "",
		name: "",
		classesManaging: "",
		subject: "",
	});

	const [teacherDeleted, setTeacherDeleted] = React.useState(false);

	const [values] = React.useState({
		name: "",
		classesManaging: "",
		subject: "",
	});

	const validate = (values) => {
		let errors = {};
		if (!values.name) {
			errors.name = "Name is required";
		}
		if (!values.classesManaging) {
			errors.classesManaging = "Classes managing is required";
		}
		if (!values.subject) {
			errors.subject = "Subject is required";
		}
		return errors;
	};

	const openCreateModal = () => {
		setCreateModal(true);
	};

	const closeCreateModal = () => {
		setCreateModal(false);
	};

	const openEditModal = (teacherFromDatabase) => {
		setEditModal(true);
		setTeacher(teacherFromDatabase);
	};

	const closeEditModal = () => {
		setEditModal(false);
	};

	const createTeacher = async (values) => {
		await Api.post("/teachers/create", values);
		closeCreateModal();
	};

	const fetchTeachers = async () => {
		try {
			const res = await Api.get("/teachers");
			// console.log(res.data);
			setTeachers(res.data.teachers);
		} catch (err) {
			console.log(err);
		}
	};

	React.useEffect(() => {
		fetchTeachers();
	}, [createModal, editModal, teacherDeleted]);

	const editTeacher = async (values) => {
		try {
			await Api.patch(`/teachers/update/${teacher._id}`, values);
			setEditModal(false);
		} catch (err) {
			console.log(err);
		}
	};

	const deleteTeacher = async (teacherId) => {
		try {
			await Api.delete(`/teachers/delete/${teacherId}`);
			setTeacherDeleted(!teacherDeleted);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<React.Fragment>
			<div className="container-fluid p-4">
				<button onClick={openCreateModal} className="btn btn-dark">
					Create Teacher
				</button>
				<table className="w-100">
					<tr className="d-flex align-items-center justify-content-between">
						<th className="">Name</th>
						<th className="">Classes Managing</th>
						<th className="">Subject</th>
						<th>Edit</th>
						<th>Delete</th>
					</tr>
					<tr className="">
						{teachers?.map((teacher, idx) => {
							return (
								<div className="d-flex align-items-center justify-content-between">
									<td className="">{teacher.name}</td>
									<td className="">{teacher.classesManaging}</td>
									<td className="">{teacher.subject}</td>
									<td>
										<button
											onClick={() => openEditModal(teacher)}
											className="btn btn-primary">
											Edit
										</button>
									</td>
									<td>
										<button
											onClick={() => deleteTeacher(teacher._id)}
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
						<Modal.Header closeButton>Create Teacher</Modal.Header>
						<Modal.Body>
							<Formik
								initialValues={values}
								validate={(values) => validate(values)}
								onSubmit={(values) => createTeacher(values)}>
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
												placeholder="Teacher Name"
											/>
											{errors.name && touched.name && (
												<div className="invalid-feedback">{errors.name}</div>
											)}
										</div>
										<div className="form-group mb-2">
											<Field
												type="text"
												name="classesManaging"
												className={
													errors.classesManaging && touched.classesManaging
														? "is-invalid form-control"
														: "form-control"
												}
												placeholder="Classes Managing"
											/>
											{errors.classesManaging && touched.classesManaging && (
												<div className="invalid-feedback">
													{errors.classesManaging}
												</div>
											)}
										</div>
										<div className="form-group mb-2">
											<Field
												type="text"
												name="subject"
												className={
													errors.subject && touched.subject
														? "is-invalid form-control"
														: "form-control"
												}
												placeholder="Enter subject"
											/>
											{errors.subject && touched.subject && (
												<div className="invalid-feedback">{errors.subject}</div>
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
						<Modal.Header closeButton>Edit Teacher</Modal.Header>
						<Modal.Body>
							<Formik
								initialValues={teacher}
								validate={(values) => validate(values)}
								onSubmit={(values) => editTeacher(values)}>
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
												placeholder="Teacher Name"
											/>
											{errors.name && touched.name && (
												<div className="invalid-feedback">{errors.name}</div>
											)}
										</div>
										<div className="form-group mb-2">
											<Field
												type="text"
												name="classesManaging"
												className={
													errors.classesManaging && touched.classesManaging
														? "is-invalid form-control"
														: "form-control"
												}
												placeholder="Class"
											/>
											{errors.classesManaging && touched.classesManaging && (
												<div className="invalid-feedback">
													{errors.classesManaging}
												</div>
											)}
										</div>
										<div className="form-group mb-2">
											<Field
												type="text"
												name="subject"
												className={
													errors.subject && touched.subject
														? "is-invalid form-control"
														: "form-control"
												}
												placeholder="Enter subject"
											/>
											{errors.subject && touched.subject && (
												<div className="invalid-feedback">{errors.subject}</div>
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

export default Teachers;
