import React from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import { FormGroup, Button } from "reactstrap";

const AddTodo = (props) => {
    return (
        <Form>
            <FormGroup>
                <Field
                    className="form-control"
                    type="text"
                    name="task"
                    placeholder="Task"
                />
                <Button color="primary" type="submit">
                    Add Todo
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
            task: props.task || ""
        };
    },
    validationSchema: Yup.object().shape({
        task: Yup.string()
            .required("Task is required.")
            .min(10, "Must be at least 10 characters long!")
    }),
    handleSubmit: (values, formikBag) => {
        formikBag.props.addTodo({
            values
        });
        formikBag.resetForm();
    }
})(AddTodo);
