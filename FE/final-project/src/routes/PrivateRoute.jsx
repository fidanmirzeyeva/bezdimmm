// import React, { useContext } from 'react'
// import { AuthContext } from '../context/AuthProvider'

// function PrivateRoute({role}) {
//     const {token,decoded} = useContext(AuthContext)
//   return (
//    <>
//    {token && role.includes(decoded.role) ? <Outlet/> : <Navigate to={"/login"}/>}

//    </>
//   )
// }

// export default PrivateRoute