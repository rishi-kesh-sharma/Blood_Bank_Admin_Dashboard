import { Formik, Form } from "formik";
import React from "react";
import * as Yup from "yup";
import { updateBank } from "../../apiCalls/banks";
import { useDispatch, useSelector } from "react-redux";
import { SET_BANKS } from "../../actions/bankActions";

const BankUpdateForm = ({ editingUserId, setOpen }) => {
  const dispatch = useDispatch();
  const banksInfo = useSelector((state) => state?.bankReducer);
  let initialValues = {
    email: "",
    bankname: "",
    contact: "",
    category: "",
    website: "",
    address: "",
  };
  if (editingUserId) {
    const editingBank = banksInfo?.banks?.find(
      (bank) => bank._id == editingUserId
    );
    const { email, bankname, contact, category, website, address } =
      editingBank;
    initialValues = {
      email,
      bankname,
      contact,
      category,
      website,
      address,
    };
  }
  // if (editingUserId) {

  const schema = Yup.object().shape({
    bankname: Yup.string().required(),
    address: Yup.string().required(),
    email: Yup.string().required().email("Invalid email format"),
    contact: Yup.string().required(),
    category: Yup.string().required(),
    website: Yup.string().required(),
  });

  const submitForm = async (values) => {
    const banks = banksInfo?.banks?.map((bank) => {
      if (bank._id == editingUserId) {
        return { ...bank, ...values };
      }
      return bank;
    });
    const response = await updateBank(editingUserId, values);
    console.log(response);
    dispatch({ type: SET_BANKS, payload: { ...banksInfo, banks } });
    setOpen(false);
  };
  return (
    <div>
      <Formik
        validationSchema={schema}
        initialValues={initialValues}
        onSubmit={submitForm}
        enableReinitialize>
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          isSubmitting,
        }) => (
          <div className="update-bank ">
            <div className="form " style={{ maxWidth: "100%", padding: 0 }}>
              {/* Passing handleSubmit parameter tohtml form onSubmit property */}
              <Form style={{ padding: "0" }}>
                {/* Our input html with passing formik parameters like handleChange, values, handleBlur to input properties */}
                <input
                  type="text"
                  name="bankname"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.bankname}
                  placeholder="Enter bankname"
                  className="form-control"
                  style={{ padding: "10px" }}
                />
                {/* If validation is not passed show errors */}
                <p className="error">
                  {(errors.bankname && touched.bankname && errors.bankname) ||
                    (isSubmitting && errors.bankname)}
                </p>
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  placeholder="Enter email "
                  className="form-control "
                  id="email"
                  style={{ padding: "10px" }}
                />
                {/* If validation is not passed show errors */}
                <p className="error">
                  {errors.email && touched.email && errors.email}
                </p>

                {/* Our input html with passing formik parameters like handleChange, values, handleBlur to input properties */}
                <input
                  type="text"
                  name="address"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.address}
                  placeholder="Enter address"
                  className="form-control"
                  style={{ padding: "10px" }}
                />
                {/* If validation is not passed show errors */}
                <p className="error">
                  {(errors.address && touched.address && errors.address) ||
                    (isSubmitting && errors.address)}
                </p>
                {/* Our input html with passing formik parameters like handleChange, values, handleBlur to input properties */}
                <input
                  type="text"
                  name="contact"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.contact}
                  placeholder="Enter contact"
                  className="form-control"
                  style={{ padding: "10px" }}
                />
                {/* If validation is not passed show errors */}
                <p className="error">
                  {(errors.contact && touched.contact && errors.contact) ||
                    (isSubmitting && errors.contact)}
                </p>
                {/* Our input html with passing formik parameters like handleChange, values, handleBlur to input properties */}
                <input
                  type="text"
                  name="category"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.category}
                  placeholder="Enter category"
                  className="form-control"
                  style={{ padding: "10px" }}
                />
                {/* If validation is not passed show errors */}
                <p className="error">
                  {(errors.category && touched.category && errors.category) ||
                    (isSubmitting && errors.category)}
                </p>
                {/* Our input html with passing formik parameters like handleChange, values, handleBlur to input properties */}
                <input
                  type="text"
                  name="website"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.website}
                  placeholder="Enter website"
                  className="form-control "
                  style={{ padding: "10px" }}
                />
                {/* If validation is not passed show errors */}
                <p className="error">
                  {(errors.website && touched.website && errors.website) ||
                    (isSubmitting && errors.website)}
                </p>
                {/* Click on submit button to submit the form */}
                <button type="submit p-0">Save</button>
              </Form>
            </div>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default BankUpdateForm;
