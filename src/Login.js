import React, { useState } from "react";
import { auth, db } from "./Firebase";
import { useDispatch } from "react-redux";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc, collection, getDoc } from "firebase/firestore";
import { login } from "./features/userSlice";

const Login = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const dispatch = useDispatch();

  const handleLogin = function (e) {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredentials) => {
      const user = userCredentials.user;
      const userRef = doc(db, 'users', user.uid)
      getDoc(userRef)
        .then((docSnap) => {
          if(docSnap.exists()) {
            const userDocData = docSnap.data();
            const description = userDocData.description || ''
            dispatch(
              login({
                uid: user.uid,
                email: user.email,
                name: user.displayName,
                photoUrl: user.photoURL,
                description: description,
              })
            );
          } else {
            console.log('User document does not exist')
          }
        })
      })
      .catch((error) => alert(error));
      console.log("success login");
    };
    
  const handleRegister = function (e) {
    e.preventDefault();
    
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        return updateProfile(userCredentials.user, {
          displayName: name,
          photoURL: profilePic,
        });
      }).then(()=> {
        const userRef = doc(db, 'users', auth.currentUser.uid)
        setDoc(userRef,{
          uid: auth.currentUser.uid,
          email: auth.currentUser.email,
          name: name,
          photoUrl: profilePic,
          description: '',
        })
      })
      .then(() => {
        dispatch(
          login({
            uid: auth.currentUser.uid,
            email: auth.currentUser.email,
            name: name,
            photoUrl: profilePic,
            description: auth.currentUser.description,
          })
        );
      })
      .catch((error) => alert(error));
  };

  return (
    <div className="flex-grow flex items-center justify-center bg-gray-100 ovreflow-hidden">
      <form className="p-4 py-6 w-96 bg-slate-50 flex flex-col justify-center space-y-4 rounded-lg shadow-xl">
        <img
          className="mx-auto h-10 object-cover"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/LinkedIn_Logo.svg/1200px-LinkedIn_Logo.svg.png"
          alt=""
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full h-10 bg-gray-100 outline-1 font-medium px-3 rounded-md border-gray-500 hover:bg-blue-100 outline hover:outline-[3px] focus:bg-blue-100 focus:outline-[3px] transition-all duration-75"
          placeholder="abc123@email.com"
          type="email"
          required
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full h-10 bg-gray-100 outline-1 font-medium px-3 rounded-md border-gray-500 hover:bg-blue-100 outline hover:outline-[3px] focus:bg-blue-100 focus:outline-[3px] transition-all duration-75"
          placeholder="Password"
          type="password"
          required
        />
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full h-10 bg-gray-100 outline-1 font-medium px-3 rounded-md border-gray-500 hover:bg-blue-100 outline hover:outline-[3px] focus:bg-blue-100 focus:outline-[3px] transition-all duration-75"
          placeholder="*Full name (Require if new registraction)"
          type="text"
          required
        />
        <input
          value={profilePic}
          onChange={(e) => setProfilePic(e.target.value)}
          className="w-full h-10 bg-gray-100 outline-1 font-medium px-3 rounded-md border-gray-500 hover:bg-blue-100 outline hover:outline-[3px] focus:bg-blue-100 focus:outline-[3px] transition-all duration-75"
          placeholder="URL of your profile pic (optional)"
          type="url"
        />
        <button
          onClick={handleLogin}
          className="bg-blue-600 py-2 px-5 text-lg text-white font-semibold m-auto rounded-md hover:opacity-80 focus:opacity-80 outline outline-2 focus:outline-[3px] transition-all duration-75">
          Log In
        </button>
        <div className="flex justify-center">
          <span>New User?</span>
          <button
            type="submit"
            onClick={handleRegister}
            className="text-blue-600 underline pl-1">
            Register Now
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;



