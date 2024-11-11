import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPost } from '../store/slices/exhibitActions';
import { AppDispatch } from '../store/store';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Box, Button, TextField, Typography, IconButton } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

const validationSchema = Yup.object({
    description: Yup.string()
        .required('Description is required')
        .max(300, 'Description can\'t exceed 300 characters'),
    image: Yup.mixed().nullable().required('An image is required'),
});

const NewPost: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [preview, setPreview] = useState<string | null>(null);

    const handleImageChange = (file: File | null) => {
        if (file) {
            setPreview(URL.createObjectURL(file));
        } else {
            setPreview(null);
        }
    };

    return (
        <Formik
            initialValues={{ description: '', image: null }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
                if (values.image) {
                    dispatch(createPost({ description: values.description, image: values.image }));
                }
                setSubmitting(false);
            }}
        >
            {({ setFieldValue, isSubmitting }) => (
                <Form>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, width: '100%', maxWidth: 400, mx: 'auto' }}>
                        <Typography variant="h5" component="h2">
                            Create a New Post
                        </Typography>

                        <Box sx={{ position: 'relative', width: '100%', textAlign: 'center' }}>
                            {preview && (
                                <img src={preview} alt="Preview" style={{ maxWidth: '100%', marginBottom: '1rem', borderRadius: 8 }} />
                            )}
                            <input
                                accept="image/*"
                                id="image-upload"
                                type="file"
                                hidden
                                onChange={(e) => {
                                    const file = e.target.files ? e.target.files[0] : null;
                                    setFieldValue("image", file);
                                    handleImageChange(file);
                                }}
                            />
                            <label htmlFor="image-upload">
                                <IconButton color="primary" component="span" aria-label="upload picture">
                                    <PhotoCamera fontSize="large" />
                                </IconButton>
                            </label>
                            <Box color="red">
                                <ErrorMessage name="image" component="div" />
                            </Box>
                        </Box>

                        <Field
                            as={TextField}
                            label="Description"
                            name="description"
                            multiline
                            rows={3}
                            fullWidth
                            variant="outlined"
                            helperText="Max 300 characters"
                        />
                        <Box color="red">
                            <ErrorMessage name="description" component="div" />
                        </Box>

                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            disabled={isSubmitting}
                        >
                            Create Post
                        </Button>
                    </Box>
                </Form>
            )}
        </Formik>
    );
};

export default NewPost;
