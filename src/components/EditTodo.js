import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import { FormGroup, Button } from "reactstrap";

const EditTodo = (props) => {
    const [todo, setTodo] = useState(props.currentTodo);

    useEffect(() => {
        setTodo(props.currentTodo);
    }, [props]);

    return (
        <Form>
            <FormGroup>
                <Field
                    className="form-control"
                    type="text"
                    name="task"
                    placeholder="Name"
                />
                <Button color="primary" type="submit">
                    Edit Todo
                </Button>
                {props.touched.task && props.errors.task ? (
                    <p className="error">{props.errors.task}</p>
                ) : null}
            </FormGroup>
        </Form>
    );
};

export default withFormik({
    mapPropsToValues: (props) => {
        return {
            id: props.currentTodo.id,
            task: props.currentTodo.task || ""
        };
    },
    validationSchema: Yup.object().shape({
        task: Yup.string()
            .required("Task is required.")
            .min(10, "Must be at least 10 characters long!")
    }),
    handleSubmit: (values, formikBag) => {
        formikBag.props.updateTodo({
            id: values.id,
            task: values.task
        });
        formikBag.resetForm();
    }
})(EditTodo);
