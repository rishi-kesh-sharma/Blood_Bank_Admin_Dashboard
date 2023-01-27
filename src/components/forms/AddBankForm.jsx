import { Formik, Form } from "formik";
import React from "react";
import * as Yup from "yup";
import { registerBank } from "../../apiCalls/banks";
import { useDispatch, useSelector } from "react-redux";
import { ADD_BANK, SET_BANKS } from "../../actions/bankActions";
import Swal from "sweetalert2";

const AddBankForm = ({ setOpen }) => {
  const dispatch = useDispatch();
  const banksInfo = useSelector((state) => state?.bankReducer);
  let initialValues = {
    email: "",
    bankname: "",
    contact: "",
    category: "",
    website: "",
    address: "",
    organizationName: "",
    estd: "",
    website: "",
  };

  const schema = Yup.object().shape({
    bankname: Yup.string().required(),
    address: Yup.string().required(),
    email: Yup.string().required().email("Invalid email format"),
    contact: Yup.string().required(),
    category: Yup.string().required(),
    website: Yup.string(),
    organizationName: Yup.string().required(),
    estd: Yup.string().required(),
    // socialMediaHandles: Yup.string(),
  });

  const submitForm = async (values, { resetForm }) => {
    const response = await registerBank(values);
    if (response.status != 200) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
    resetForm({ values: "" });
    setOpen(false);
    Swal.fire("Bank Added", "", "success");
    dispatch({ type: ADD_BANK, payload: values });
  };
  return (
    <div className="w-[100%] ">
      <Formik
        validationSchema={schema}
        initialValues={initialValues}
        onSubmit={submitForm}
        enableReinitialize
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          isSubmitting,
        }) => (
          <div className="add-bank">
            <div className="form " style={{ maxWidth: "100%", padding: 0 }}>
              {/* Passing handleSubmit parameter tohtml form onSubmit property */}
              <Form
                style={{
                  padding: "0",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.3rem",
                }}
              >
                {/* Our input html with passing formik parameters like handleChange, values, handleBlur to input properties */}
                <input
                  style={{ padding: "10px" }}
                  className="w-[100%] outline-none border text-gray-700"
                  type="text"
                  name="bankname"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.bankname}
                  placeholder="Enter bankname"
                />
                {/* If validation is not passed show errors */}
                <p className="text-red-500 text-sm pl-2">
                  {(errors.bankname && touched.bankname && errors.bankname) ||
                    (isSubmitting && errors.bankname)}
                </p>
                <input
                  style={{ padding: "10px" }}
                  className="w-[100%] outline-none border text-gray-700"
                  type="text"
                  name="organizationName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.organizationName}
                  placeholder="Enter organizationName"
                />
                {/* If validation is not passed show errors */}
                <p className="text-red-500 text-sm pl-2">
                  {(errors.organizationName &&
                    touched.organizationName &&
                    errors.organizationName) ||
                    (isSubmitting && errors.organizationName)}
                </p>
                <input
                  style={{ padding: "10px" }}
                  className="w-[100%] outline-none border text-gray-700"
                  type="text"
                  name="estd"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.estd}
                  placeholder="Enter estd"
                />
                {/* If validation is not passed show errors */}
                <p className="text-red-500 text-sm pl-2">
                  {(errors.estd && touched.estd && errors.estd) ||
                    (isSubmitting && errors.estd)}
                </p>
                {/* <input
                  type="text"
                  name="socialMediaHandles"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.socialMediaHandles}
                  placeholder="Enter socialMediaHandles"
                  style={{ padding: "10px" , fontSize: "1.2rem" }}
                />
                 If validation is not passed show errors 
                <p className="text-red-500 text-sm pl-2">
                  {(errors.socialMediaHandles && touched.socialMediaHandles && errors.socialMediaHandles) ||
                    (isSubmitting && errors.socialMediaHandles)}
                </p> */}
                <input
                  style={{ padding: "10px" }}
                  className="w-[100%] outline-none border text-gray-700"
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  placeholder="Enter email "
                  id="email"
                />
                {/* If validation is not passed show errors */}
                <p className="text-red-500 text-sm pl-2">
                  {errors.email && touched.email && errors.email}
                </p>

                {/* Our input html with passing formik parameters like handleChange, values, handleBlur to input properties */}
                <input
                  style={{ padding: "10px" }}
                  className="w-[100%] outline-none border text-gray-700"
                  type="text"
                  name="address"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.address}
                  placeholder="Enter address"
                />
                {/* If validation is not passed show errors */}
                <p className="text-red-500 text-sm pl-2">
                  {(errors.address && touched.address && errors.address) ||
                    (isSubmitting && errors.address)}
                </p>
                {/* Our input html with passing formik parameters like handleChange, values, handleBlur to input properties */}
                <input
                  style={{ padding: "10px" }}
                  className="w-[100%] outline-none border text-gray-700"
                  type="text"
                  name="contact"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.contact}
                  placeholder="Enter contact"
                />
                {/* If validation is not passed show errors */}
                <p className="text-red-500 text-sm pl-2">
                  {(errors.contact && touched.contact && errors.contact) ||
                    (isSubmitting && errors.contact)}
                </p>
                {/* Our input html with passing formik parameters like handleChange, values, handleBlur to input properties */}
                <input
                  style={{ padding: "10px" }}
                  className="w-[100%] outline-none border text-gray-700"
                  type="text"
                  name="category"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.category}
                  placeholder="Enter category"
                />
                {/* If validation is not passed show errors */}
                <p className="text-red-500 text-sm pl-2">
                  {(errors.category && touched.category && errors.category) ||
                    (isSubmitting && errors.category)}
                </p>
                {/* Our input html with passing formik parameters like handleChange, values, handleBlur to input properties */}
                <input
                  style={{ padding: "10px" }}
                  className="w-[100%] outline-none border text-gray-700"
                  type="text"
                  name="website"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.website}
                  placeholder="Enter website"
                />
                {/* If validation is not passed show errors */}
                <p className="text-red-500 text-sm pl-2">
                  {(errors.website && touched.website && errors.website) ||
                    (isSubmitting && errors.website)}
                </p>
                {/* Click on submit button to submit the form */}
                <button
                  type="submit"
                  className="bg-red-500 text-gray-100 p-2 text-lg"
                >
                  Add
                </button>
              </Form>
            </div>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default AddBankForm;
