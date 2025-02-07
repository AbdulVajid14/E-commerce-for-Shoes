// import React from 'react';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
// import axios from 'axios';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { Link, useNavigate } from 'react-router-dom';

// const initialValues = {
//   username: '',
//   password: '',
//   email: ''
// };

// const validationSchema = Yup.object({
//   username: Yup.string().required("Name is required!"),
//   email: Yup.string().email('Invalid email format').required('Email is required!'),
//   password: Yup.string().required('Password is required!').min(8, 'Must be at least 8 characters')
// });

// function Register() {
//   const navigate = useNavigate();
//   const onSubmit = async (values, { resetForm }) => {
//     try {
//       const existingEmail = await axios.get('http://localhost:5001/users', {
//         params: { email: values.email }
//       });
//       if (existingEmail.data.length > 0) {
//         toast.error('Email already exists, choose another');
//         return;
//       }
//       const res = await axios.post('http://localhost:5001/users', values);
//       toast.success('Registered successfully!');
//       resetForm();
//       navigate('/login');
//     } catch (error) {
//       console.error('Error:', error);
//       toast.error('Something went wrong. Try again!');
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//     <div className="border p-6 shadow-md rounded-lg bg-white w-full max-w-md">
//       <h3 className="text-xl font-bold text-center mb-4">REGISTER</h3>
//       <Formik
//         initialValues={initialValues}
//         onSubmit={onSubmit}
//         validationSchema={validationSchema}
//       >
//         <Form noValidate>
//           <div className="flex items-center mb-4">
//             <div className="flex-shrink-0 mr-3">
//               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 text-gray-500">
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.5 20.118a7.5 7.5 0 0 1 15 0c-2.676 0-5.216-.584-7.5-1.632a17.932 17.932 0 0 1-7.5 1.632Z" />
//               </svg>
//             </div>
//             <div className="flex-1">
//               <Field type="text" name="username" placeholder="Username" className="w-full px-3 py-2 border rounded-lg" />
//               <ErrorMessage name="username" component="div" className="text-red-500 text-sm mt-1" />
//             </div>
//           </div>
//           <div className="flex items-center mb-4">
//             <div className="flex-shrink-0 mr-3">
//               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 text-gray-500">
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 6.75l8.25 6.75m-8.25-6.75l8.25 6.75M3.75 17.25h16.5a2.25 2.25 0 0 0 2.25-2.25v-6A2.25 2.25 0 0 0 20.25 6.75H3.75a2.25 2.25 0 0 0-2.25 2.25v6a2.25 2.25 0 0 0 2.25 2.25Z" />
//               </svg>
//             </div>
//             <div className="flex-1">
//               <Field type="email" name="email" placeholder="Email" className="w-full px-3 py-2 border rounded-lg" />
//               <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
//             </div>
//           </div>
//           <div className="flex items-center mb-4">
//             <div className="flex-shrink-0 mr-3">
//               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 text-gray-500">
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M12 15.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Zm0 0v1.5m-3.75 0h7.5a2.25 2.25 0 0 0 2.25-2.25V9a2.25 2.25 0 0 0-2.25-2.25h-7.5A2.25 2.25 0 0 0 6 9v6a2.25 2.25 0 0 0 2.25 2.25Zm0 0a2.25 2.25 0 0 1-2.25-2.25v-6A2.25 2.25 0 0 1 8.25 6h7.5a2.25 2.25 0 0 1 2.25 2.25v6a2.25 2.25 0 0 1-2.25 2.25h-7.5Z" />
//               </svg>
//             </div>
//             <div className="flex-1">
//               <Field type="password" name="password" placeholder="Password" className="w-full px-3 py-2 border rounded-lg" />
//               <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
//             </div>
//           </div>
//           <button type="submit" className="w-full bg-blue-400 text-white py-2 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500">
//             Submit
//           </button>
//           <p className="mt-4 text-center text-sm">
//             Already have an account?{' '}
//             <Link to="/login" className="text-blue-500 hover:underline">
//               Login
//             </Link>
//           </p>
//         </Form>
//       </Formik>
//       <ToastContainer />
//     </div>
//     </div>
//   );
// }

// export default Register;


import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';

const initialValues = {
  username: '',
  password: '',
  email: ''
};

const validationSchema = Yup.object({
  username: Yup.string().required("Name is required!"),
  email: Yup.string().email('Invalid email format').required('Email is required!'),
  password: Yup.string().required('Password is required!').min(8, 'Must be at least 8 characters')
});

function Register() {
  const navigate = useNavigate();
  const onSubmit = async (values, { resetForm }) => {
    try {
      const existingEmail = await axios.get('http://localhost:5001/users', {
        params: { email: values.email }
      });
      if (existingEmail.data.length > 0) {
        toast.error('Email already exists, choose another');
        return;
      }
      const res = await axios.post('http://localhost:5001/users', values);
      toast.success('Registered successfully!');
      resetForm();
      navigate('/login');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Something went wrong. Try again!');
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-white p-4">
      <div className="flex w-full max-w-4xl bg-white shadow-2xl rounded-lg overflow-hidden">
        <div className="hidden md:block w-1/2">
          <img src='https://plus.unsplash.com/premium_photo-1681487814165-018814e29155?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' 
          alt="Register Illustration" className="w-full h-full object-cover" />
        </div>
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <h3 className="text-2xl font-bold text-center mb-6 text-gray-800">REGISTER</h3>
          <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            <Form noValidate>
              <div className="mb-4">
                <Field type="text" name="username" placeholder="Username" className="w-full px-3 py-2 border rounded-lg" />
                <ErrorMessage name="username" component="div" className="text-red-500 text-sm mt-1" />
              </div>
              <div className="mb-4">
                <Field type="email" name="email" placeholder="Email" className="w-full px-3 py-2 border rounded-lg" />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
              </div>
              <div className="mb-4">
                <Field type="password" name="password" placeholder="Password" className="w-full px-3 py-2 border rounded-lg" />
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
              </div>
              <button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 rounded-lg hover:scale-105 transition-all duration-300 shadow-lg">
                Submit
              </button>
              <p className="mt-4 text-center text-sm text-gray-700">
                Already have an account?{' '}
                <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
              </p>
            </Form>
          </Formik>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
}

export default Register;
