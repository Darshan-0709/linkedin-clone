import { useEffect } from "react";
import { auth, db } from "./Firebase";
import Feed from "./Feed";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Widgets from "./Widgets";
import { useDispatch, useSelector } from "react-redux";
import { logout, login, selectUser } from "./features/userSlice";
import Login from "./Login";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

function App() {
  const user = useSelector(selectUser)
  const dispatch = useDispatch();
  
  useEffect(() => {
    onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        const userRef = doc(db, 'users', userAuth.uid)
        getDoc(userRef)
        .then((docSnap) => {
          if (docSnap.exists()) {
            const userDocData = docSnap.data();
            const userDescription = userDocData.description || '';
            dispatch(login({
              email: userAuth.email,
              name: userAuth.displayName,
              uid: userAuth.uid,
              photoUrl: userAuth.photoURL,
              description: userDescription,
            }))
          } else {
            console.log("No such document!");
          }
        })
      }else{
        dispatch(logout());
      }
    });
  }, [])

  return (
    <div className="m-auto min-h-screen flex flex-col">
      {/* header */}
      {/* app body */}
      {user && <Header />}
      {!user ? (
        <Login />
      ) : (
        <div className="bg-gray-100 flex-1 border-2">
        <div className="md:flex md:px-2 md:space-x-6 max-w-6xl mx-auto pt-6 flex-wrap">
          {/* sideber */}
            <Sidebar />
            {/* feed */}
            <Feed />
            {/* widgets */}
            <Widgets />
        </div>
        </div>
      )}
    </div>
  );
}

export default App;
