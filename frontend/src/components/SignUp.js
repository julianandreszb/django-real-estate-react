import React from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import {SIGN_UP_WINDOW_NAME} from "./Constants";

/**
 * @return {null}
 */
function SignUp(props) {

    if (props.currentWindowName !== SIGN_UP_WINDOW_NAME) {
        return null;
    }

    const {classes} = props;

    return <>
        <Container maxWidth="sm">
            <Box my={4}>
                <Formik
                    initialValues={{email: '', password: ''}}
                    validate={values => {
                        const errors = {};
                        if (!values.email) {
                            errors.email = 'Required';
                        } else if (
                            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                        ) {
                            errors.email = 'Invalid email address';
                        }
                        return errors;
                    }}
                    onSubmit={(values, {setSubmitting}) => {
                        setTimeout(() => {
                            alert(JSON.stringify(values, null, 2));
                            setSubmitting(false);
                        }, 400);
                    }}
                    validationSchema={Yup.object().shape({
                        email: Yup.string().email().required('Required'),
                        name: Yup.string().required('Required'),
                        comment: Yup.string().required('Required'),
                    })}
                >
                    {(props) => {
                        const {
                            values,
                            touched,
                            errors,
                            dirty,
                            isSubmitting,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            handleReset,
                        } = props;

                        return (
                            <form onSubmit={handleSubmit}>
                                <TextField
                                    label="name"
                                    name="name"
                                    className={classes.textField}
                                    value={values.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    helperText={(errors.name && touched.name) && errors.name}
                                    margin="normal"
                                />

                                <TextField
                                    error={errors.email && touched.email}
                                    label="email"
                                    name="email"
                                    className={classes.textField}
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    helperText={(errors.email && touched.email) && errors.email}
                                    margin="normal"
                                />

                                <TextField
                                    label="comment"
                                    name="comment"
                                    className={classes.textField}
                                    value={values.comment}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    helperText={(errors.comment && touched.comment) && errors.comment}
                                    margin="normal"
                                />
                            </form>
                        );
                    }}
                </Formik>
            </Box>
        </Container>
    </>
}

export default SignUp;