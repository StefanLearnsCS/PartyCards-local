import React from 'react'
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import { Container, Button, Form as BootstrapForm} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as Yup from 'yup';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../helpers/AuthContext';
import { useEffect, useState, useContext } from 'react';




function CreatePack() {

    const { authState, setAuthState } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");
    
        if (!accessToken) {
          navigate("/login");
        }
    
        axios.get("http://localhost:3001/auth/auth", { 
          headers: { accessToken } 
        }).then((response) => {
          if (response.data.error) {
            setAuthState({ ...authState, status: false });
            navigate("/login")
          } else {
            setAuthState({
              username: response.data.username,
              id: response.data.id,
              status: true,
            });
          }
          setLoading(false);
        }).catch(() => {
          navigate("/login");
          setLoading(false);
        }); 
    }, []);

    const initialValues = {
        title:"",
        postText:"",
        username:"",
        cards: [{ prompt: "" }]
    };

    const validationSchema = Yup.object().shape({
        title: Yup.string().required("You must include a Title!")
        .min(3, "Title must be longer than 3 characters!")
        .max(20, "Title must be shorter than 20 characters!"),
        postText: Yup.string().required("You must include a Description!")
        .max(80, "Description must be shorter than 80 characters!"),
        cards: Yup.array()
            .of(
                Yup.object().shape({
                    prompt: Yup.string()
                        .required('You must include a prompt for each card!')
                        .max(150, 'Prompt may not exceed 150 characters!'),
                })
            )
            .max(50, 'A pack can contain a maximum of 50 cards.')
            .min(2, 'A pack must contain a minimum of 2 cards.'),
    });

    const onSubmit = async (data) => {
        try {
            // Post card pack data to /posts
            const postResponse = await axios.post("http://localhost:3001/posts", {
                title: data.title,
                postText: data.postText,
            },
            {
                headers: {
                    accessToken: localStorage.getItem("accessToken"),
                },
            });
    
            const packId = postResponse.data.id; 
    
            // Post individual cards to /cards
            const cardPromises = data.cards.map(card => 
                axios.post("http://localhost:3001/cards", {
                    packId: packId,
                    prompt: card.prompt
                })
            );
    
            await Promise.all(cardPromises);
    
            navigate(`/pack/${packId}`);
        } catch (error) {
            alert('Error creating pack. Please try again later.');
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

    const BootstrapFieldText = ({ field, form: { touched, errors }, ...props }) => (
        <BootstrapForm.Group controlId={field.name}>
            <BootstrapForm.Label>{props.label}</BootstrapForm.Label>
            <BootstrapForm.Control
                {...field}
                {...props}
                isInvalid={touched[field.name] && errors[field.name]}
                as="textarea"
            />
            <ErrorMessage name={field.name} component="div" className="invalid-feedback" />
        </BootstrapForm.Group>
    );

    if (loading) {
        return <div>Loading...</div>; // Show a loading message or spinner
      }

    return (
        <Container className='col-xl-4 col-lg-6 col-md-7 rounded border border-secondary' id='create-pack-container'>
            <Formik 
                initialValues={initialValues} 
                onSubmit={onSubmit} 
                validationSchema={validationSchema} 
                validateOnChange={true}
                validateOnBlur={true}
            >
                {({ values, handleSubmit }) => (
                    <Form onSubmit={handleSubmit}>
                        <Field
                            name="title"
                            type="text"
                            label="Title:"
                            placeholder="Party Pack Name"
                            component={BootstrapField}
                        />
                        <Field
                            name="postText"
                            type="text"
                            label="Description:"
                            placeholder="Describe your Party Pack!"
                            component={BootstrapFieldText}
                        />
                        
                        <FieldArray name="cards">
                            {({ remove, push, form }) => (
                                <div>
                                    {values.cards.map((card, index) => (
                                        <div key={index}>
                                            <Field
                                                name={`cards.${index}.prompt`}
                                                type="text"
                                                label={`Card ${index + 1}:`}
                                                placeholder="Card Prompt"
                                                component={BootstrapFieldText}
                                            />
                                            <Button
                                                variant="danger"
                                                type="button"
                                                onClick={() => remove(index)}
                                                disabled={values.cards.length <= 1}
                                                id="create-pack-button"
                                            >
                                                Remove Card
                                            </Button>
                                            <ErrorMessage
                                                name={`cards.${index}.prompt`}
                                                component="div"
                                                className="invalid-feedback"
                                                style={{ display: 'block' }}
                                            />
                                        </div>
                                    ))}
                                    <Button
                                        variant="secondary"
                                        type="button"
                                        onClick={() => push({ prompt: '' })}
                                        disabled={values.cards.length >= 50}
                                        id="create-pack-button"
                                    >
                                        Add Card
                                    </Button>
                                </div>
                            )}
                        </FieldArray>

                        <Button variant="primary" type="submit" id="create-pack-button" 
                        disabled={values.cards.length >= 50 || values.cards.length < 2}>Submit</Button>
                    </Form>
                )}
            </Formik>
        </Container>
    );
}

export default CreatePack
