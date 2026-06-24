import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Loader } from 'lucide-react';
// interface Props {
 
//   adminOnly?: boolean; 
// }

const ProtectedRoute = () => {
  const {isLoggedIn, isCheckingAuth}= useAuth()
  
  // if (adminOnly && !isAdmin) {
  //   return <Navigate to="/" />;
  // }

  if (isCheckingAuth) {
    return <Loader className='flex w-screen self-center'/>; // or a spinner / null
  }

  if (!isLoggedIn) {
    return <Navigate to="/auth" replace/>;
  }
  return <Outlet />;
};

export default ProtectedRoute;