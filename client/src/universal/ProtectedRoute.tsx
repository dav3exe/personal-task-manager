import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { CircleLoader } from 'react-spinners';
// interface Props {
 
//   adminOnly?: boolean; 
// }

const ProtectedRoute = () => {
  const {isLoggedIn, isCheckingAuth}= useAuth()
  
  // if (adminOnly && !isAdmin) {
  //   return <Navigate to="/" />;
  // }

  if (isCheckingAuth) {
    return <CircleLoader/>; // or a spinner / null
  }

  if (!isLoggedIn) {
    return <Navigate to="/auth" replace/>;
  }
  return <Outlet />;
};

export default ProtectedRoute;