import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../store/slices/userSlice';
import { RootState, AppDispatch } from '../store/store';
import { TextField, Button, Box, Typography } from '@mui/material';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function RegisterForm() {
    const dispatch = useDispatch<AppDispatch>();
    const { loading, error } = useSelector((state: RootState) => state.user);

    const validationSchema = Yup.object({
        username: Yup.string()
            .required('Username is required')
            .min(4, 'Username must be at least 4 characters'),
        password: Yup.string()
            .required('Password is required')
            .min(4, 'Password must be at least 4 characters'),
    });

    return (
        <Formik
            initialValues={{ username: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
                dispatch(register(values));
            }}
        >
            {({ isSubmitting }) => (
                <Form>
                    <Box sx={{ maxWidth: 300, mx: 'auto', mt: 5 }}>
                        <Typography variant="h5" component="h1" gutterBottom>
                            Register
                        </Typography>
                        <Field
                            name="username"
                            as={TextField}
                            label="Username"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                        />
                        <div style={{ color: 'red' }}>
                            <ErrorMessage name="username" component="div" />
                        </div>

                        <Field
                            name="password"
                            as={TextField}
                            label="Password"
                            type="password"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                        />
                        <div style={{ color: 'red' }}>
                            <ErrorMessage name="password" component="div" />
                        </div>

                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            disabled={isSubmitting || loading}
                        >
                            Register
                        </Button>
                        {error && <Typography color="error">{error}</Typography>}
                    </Box>
                </Form>
            )}
        </Formik>
    );
}

export default RegisterForm;
