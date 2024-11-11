import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/slices/userSlice';
import { RootState, AppDispatch } from '../store/store';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Box, Typography } from '@mui/material';

const validationSchema = Yup.object({
  username: Yup.string().min(4, 'Minimum 4 characters required').required('Required'),
  password: Yup.string().min(4, 'Minimum 4 characters required').required('Required'),
});

function LoginForm() {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.user);

  return (
    <Box sx={{ maxWidth: 300, mx: 'auto', mt: 5 }}>
      <Typography variant="h5" component="h1" gutterBottom>
        Login
      </Typography>
      <Formik
        initialValues={{ username: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          dispatch(login(values));
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field
              name="username"
              as={TextField}
              label="Username"
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <Box color="red">
              <ErrorMessage name="username" component="div" />
            </Box>
            
            <Field
              name="password"
              as={TextField}
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <Box color="red">
              <ErrorMessage name="password" component="div" />
            </Box>
            
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={isSubmitting || loading}
            >
              Login
            </Button>
            {error && <Typography color="error">{error}</Typography>}
          </Form>
        )}
      </Formik>
    </Box>
  );
}

export default LoginForm;
