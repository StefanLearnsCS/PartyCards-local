import React from 'react'
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
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
        cards: [{ prompt: "" }]
    };

    const validationSchema = Yup.object().shape({
        title: Yup.string().required("You must include a Title!"),
        postText: Yup.string().required("You must include a Description!"),
        username: Yup.string()
            .min(3, "Username must be longer than 3 characters!")
            .max(15, "Username must be shorter than 15 characters!")
            .required("You must include an Username!"),
        cards: Yup.array().of(
            Yup.object().shape({
                prompt: Yup.string().required("You must include a prompt for each card!")
            })
        ).max(50, "A pack can contain a maximum of 50 cards.")
    });

    const onSubmit = async (data) => {
        try {
            // Post card pack data to /posts
            const postResponse = await axios.post("http://localhost:3001/posts", {
                title: data.title,
                postText: data.postText,
                username: data.username
            });
    
            const packId = postResponse.data.id; // Assuming the response contains the newly created pack ID
    
            // Post individual cards to /cards
            const cardPromises = data.cards.map(card => 
                axios.post("http://localhost:3001/cards", {
                    packId: packId,
                    prompt: card.prompt
                })
            );
    
            await Promise.all(cardPromises);
    
            // Navigate to another page if all requests succeed
            navigate("/");
        } catch (error) {
            console.error("Error creating card pack and cards", error);
        }
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
                {({ values, handleSubmit }) => (
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
                        
                        <FieldArray name="cards">
                            {({ remove, push }) => (
                                <div>
                                    <h4>Cards</h4>
                                    {values.cards.map((card, index) => (
                                        <div key={index}>
                                            <Field
                                                name={`cards.${index}.prompt`}
                                                type="text"
                                                label={`Card ${index + 1}`}
                                                placeholder="Card Prompt"
                                                component={BootstrapField}
                                            />
                                            <Button
                                                variant="danger"
                                                type="button"
                                                onClick={() => remove(index)}
                                                disabled={values.cards.length <= 1}
                                            >
                                                Remove Card
                                            </Button>
                                        </div>
                                    ))}
                                    <Button
                                        variant="secondary"
                                        type="button"
                                        onClick={() => push({ prompt: "" })}
                                        disabled={values.cards.length >= 50}
                                    >
                                        Add Card
                                    </Button>
                                </div>
                            )}
                        </FieldArray>

                        <Button variant="primary" type="submit" id="create-pack-button">Submit</Button>
                    </Form>
                )}
            </Formik>
        </Container>
    );
}

export default CreatePack
