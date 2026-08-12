// import React, { useContext, useEffect } from 'react'
// import AuthContext from '../../context/authContext'
// import { useNavigate } from 'react-router-dom'

// export default function PAdminPrivate({children}) {

//   const authContext = useContext(AuthContext)
//   const navigate = useNavigate()

//   // useEffect(() => {
//   //   if(authContext.userInfos.role !== 'ADMIN'){
//   //     navigate('/login')
//   //     console.log('role',authContext.userInfos.role)
      
//   //   }

//   //   console.log('authContext',authContext);
    
//   // },[])

//   // if(!authContext.userInfos || authContext.userInfos.role !== 'ADMIN'){
//   //   return null
//   // }



//   return (
//     <>
//     {authContext.userInfos.role === 'ADMIN' ? <>{children}</> : navigate('/login')}
//     </>
//   )
// }


