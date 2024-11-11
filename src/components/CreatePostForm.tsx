import React from 'react';
import { useDispatch } from 'react-redux';
import { createPost } from '../store/slices/exhibitActions';
import { AppDispatch } from '../store/store';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function CreatePostForm() {
    const dispatch = useDispatch<AppDispatch>();

    const validationSchema = Yup.object({
        description: Yup.string().required('Description is required'),
        image: Yup.mixed().required('Image is required'),
    });

    return (
        <Formik
            initialValues={{ description: '', image: null as unknown as File }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
                dispatch(createPost(values));
                setSubmitting(false);
            }}
        >
            {({ setFieldValue, isSubmitting }) => (
                <Form>
                    <div>
                        <label>Image</label>
                        <input
                            type="file"
                            onChange={(event) => {
                                if (event.currentTarget.files) {
                                    setFieldValue("image", event.currentTarget.files[0]);
                                }
                            }}
                        />
                        <ErrorMessage name="image" component="div" className="error-message" />
                    </div>
                    <div>
                        <label>Description</label>
                        <Field as="textarea" name="description" />
                        <ErrorMessage name="description" component="div" className="error-message" />
                    </div>
                    <button type="submit" disabled={isSubmitting}>Create Post</button>
                </Form>
            )}
        </Formik>
    );
}

export default CreatePostForm;
