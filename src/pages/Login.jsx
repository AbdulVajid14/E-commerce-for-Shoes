import { Form, Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux'; 
import { setUser } from '../slice/userSlice'; 

const initialValues = {
  password: "",
  email: ""
};

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email format').required('Email is required!'),
  password: Yup.string().required('Password is required!').min(8, 'Must be at least 8 characters')
});

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch(); 
  const onSubmit = async (values) => {
    try {
      const adminEmail = "admin@gmail.com";
      const adminPassword = "admin123";
  
      const valid = await axios.get('http://localhost:5001/users');
      if (values.email === adminEmail && values.password === adminPassword) {
        toast.success("Admin logged in successfully");
        setTimeout(() => {
          navigate("/admin/dashboard");
          localStorage.setItem("isAdmin", true);
        }, 1000);
        return;
      }
      const user = valid.data.find(
        (val) => val.email === values.email && val.password === values.password
      );
  
      if (user) {
        if (user.isBlocked) {
          toast.error("Your account has been blocked. Please contact support.");
          return; 
        }
        dispatch(setUser(user));
        toast.success("Logged in successfully");
        alert("login successfull")
        navigate('/');

        return;
      }
      toast.error("Invalid email or password");
    } catch (error) {
      console.error('Error:', error);
      toast.error("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="border p-6 shadow-md rounded-lg bg-white w-full max-w-md">
        <h3 className="text-xl font-bold text-center mb-4">LOGIN</h3>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          <Form>
            <div className="flex items-center border rounded-lg px-3 py-2 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6 text-gray-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25H4.5a2.25 2.25 0 0 1-2.25-2.25V6.75M12 12.75l6.75-6.75M12 12.75l-6.75-6.75m6.75 6.75L6.75 18m5.25-5.25l6.75 6.75"
                />
              </svg>
              <Field
                type="email"
                placeholder="Email"
                name="email"
                className="w-full focus:outline-none ml-2"
              />
            </div>
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-600 text-sm mb-4"
            />
            <div className="flex items-center border rounded-lg px-3 py-2 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6 text-gray-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 15.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Zm0 0v1.5m-3.75 0h7.5a2.25 2.25 0 0 0 2.25-2.25V9a2.25 2.25 0 0 0-2.25-2.25h-7.5A2.25 2.25 0 0 0 6 9v6a2.25 2.25 0 0 0 2.25 2.25Zm0 0a2.25 2.25 0 0 1-2.25-2.25v-6A2.25 2.25 0 0 1 8.25 6h7.5a2.25 2.25 0 0 1 2.25 2.25v6a2.25 2.25 0 0 1-2.25 2.25h-7.5Z"
                />
              </svg>
              <Field
                type="password"
                placeholder="Password"
                name="password"
                className="w-full focus:outline-none ml-2"
              />
            </div>
            <ErrorMessage
              name="password"
              component="div"
              className="text-red-600 text-sm mb-4"
            />
            <button
              type="submit"
              className="w-full bg-blue-400 text-white py-2 rounded-lg hover:bg-blue-500"
            >
              Login
            </button>
            <p className="mt-4 text-center text-sm">
              Don't have an account?{' '}
              <Link to="/register" className="text-blue-500 hover:underline">
                Register
              </Link>
            </p>
          </Form>
        </Formik>
        <ToastContainer />
      </div>
    </div>
  );
}

export default Login;
