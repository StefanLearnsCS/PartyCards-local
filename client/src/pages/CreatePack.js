import React from 'react'
import { Formik, Form, Field, ErrorMessage} from "formik";
import { Container, Button, Form as BootstrapForm} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as Yup from 'yup';
import axios from "axios";
import { useNavigate } from 'react-router-dom';


function CreatePack() {

    const initialValues = {
        title:"",
        postText:"",
        username:"",
    };

    const validationSchema = Yup.object().shape({
        title: Yup.string().required("You must include a Title!"),
        postText: Yup.string().required("You must include a Description!"),
        username: Yup.string().min(3, "Username must be longer than 3 characters!")
                                .max(15, "Username must be shorter than 15 characters!")
                                .required("You must include an Username!")
    });

    const onSubmit = (data) => {
        axios.post("http://localhost:3001/posts", data).then((response) => {
            navigate("/");
        });
    };

    let navigate = useNavigate();

    const BootstrapField = ({ field, form: { touched, errors }, ...props }) => (
        <BootstrapForm.Group controlId={field.name}>
            <BootstrapForm.Label>{props.label}</BootstrapForm.Label>
            <BootstrapForm.Control
                {...field}
                {...props}
                isInvalid={touched[field.name] && errors[field.name]}
            />
            <ErrorMessage name={field.name} component="div" className="invalid-feedback" />
        </BootstrapForm.Group>
    );

    return (
        <Container className='col-xl-4' id='create-pack-container'>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                {({ handleSubmit }) => (
                    <Form onSubmit={handleSubmit}>
                        <Field
                            name="title"
                            type="text"
                            label="Title"
                            placeholder="Party Pack Name"
                            component={BootstrapField}
                        />
                        <Field
                            name="postText"
                            type="text"
                            label="Description"
                            placeholder="Describe your Party Pack!"
                            component={BootstrapField}
                        />
                        <Field
                            name="username"
                            type="text"
                            label="Username"
                            placeholder="Your Name"
                            component={BootstrapField}
                        />
                        <Button variant="primary" type="submit" id="create-pack-button">Submit</Button>
                    </Form>
                )}
            </Formik>
        </Container>
    );
}

export default CreatePack
