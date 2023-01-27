import { Formik, Form } from "formik";
import React from "react";
import * as Yup from "yup";
import { updateBank } from "../../apiCalls/banks";
import { useDispatch, useSelector } from "react-redux";
import { SET_BANKS } from "../../actions/bankActions";
import Swal from "sweetalert2";

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
    if (editingBank) {
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
    console.log(response.status);
    if (response.status != 200) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
    dispatch({ type: SET_BANKS, payload: { ...banksInfo, banks } });

    setOpen(false);
    Swal.fire("Bank Updated", "", "success");
  };
  return (
    <div>
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
          <div className="update-bank ">
            <div className=" form " style={{ maxWidth: "100%", padding: 0 }}>
              {/* Passing handleSubmit parameter tohtml form onSubmit property */}
              <Form
                style={{
                  padding: "0",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                {/* Our input html with passing formik parameters like handleChange, values, handleBlur to input properties */}
                <div>
                  <input
                    type="text"
                    name="bankname"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.bankname}
                    placeholder="Enter bankname"
                    style={{ padding: "10px" }}
                    className="w-[100%] outline-none border text-gray-700"
                  />
                  {/* If validation is not passed show errors */}
                  <p className="text-red-500 text-sm pl-2">
                    {(errors.bankname && touched.bankname && errors.bankname) ||
                      (isSubmitting && errors.bankname)}
                  </p>
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    placeholder="Enter email "
                    className="w-[100%] outline-none border text-gray-700"
                    id="email"
                    style={{ padding: "10px" }}
                  />
                  {/* If validation is not passed show errors */}
                  <p className="text-red-500 text-sm pl-2">
                    {errors.email && touched.email && errors.email}
                  </p>
                </div>

                {/* Our input html with passing formik parameters like handleChange, values, handleBlur to input properties */}
                <div>
                  <input
                    type="text"
                    name="address"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.address}
                    placeholder="Enter address"
                    style={{ padding: "10px" }}
                    className="w-[100%] outline-none border text-gray-700"
                  />
                  {/* If validation is not passed show errors */}
                  <p className="text-red-500 text-sm pl-2">
                    {(errors.address && touched.address && errors.address) ||
                      (isSubmitting && errors.address)}
                  </p>
                </div>
                {/* Our input html with passing formik parameters like handleChange, values, handleBlur to input properties */}
                <div>
                  <input
                    type="text"
                    name="contact"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.contact}
                    placeholder="Enter contact"
                    style={{ padding: "10px" }}
                    className="w-[100%] outline-none border text-gray-700"
                  />
                  {/* If validation is not passed show errors */}
                  <p className="text-red-500 text-sm pl-2">
                    {(errors.contact && touched.contact && errors.contact) ||
                      (isSubmitting && errors.contact)}
                  </p>
                </div>
                {/* Our input html with passing formik parameters like handleChange, values, handleBlur to input properties */}
                <div>
                  <input
                    type="text"
                    name="category"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.category}
                    placeholder="Enter category"
                    style={{ padding: "10px" }}
                    className="w-[100%] outline-none border text-gray-700"
                  />
                  {/* If validation is not passed show errors */}
                  <p className="text-red-500 text-sm pl-2">
                    {(errors.category && touched.category && errors.category) ||
                      (isSubmitting && errors.category)}
                  </p>
                </div>
                {/* Our input html with passing formik parameters like handleChange, values, handleBlur to input properties */}
                <div>
                  <input
                    type="text"
                    name="website"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.website}
                    placeholder="Enter website"
                    style={{ padding: "10px" }}
                    className="w-[100%] outline-none border text-gray-700"
                  />
                  {/* If validation is not passed show errors */}
                  <p className="text-red-500 text-sm pl-2">
                    {(errors.website && touched.website && errors.website) ||
                      (isSubmitting && errors.website)}
                  </p>
                </div>
                {/* Click on submit button to submit the form */}
                <button
                  type="submit p-0"
                  className="bg-red-500 text-gray-100 p-2 text-lg"
                >
                  Save
                </button>
              </Form>
            </div>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default BankUpdateForm;
