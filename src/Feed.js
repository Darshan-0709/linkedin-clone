import React, { useEffect, useState } from "react";
import FeedForm from "./FeedForm";
import FeedPost from "./FeedPost";
import { db } from "./Firebase";
import { onSnapshot, query, getFirestore, collection, orderBy, addDoc, serverTimestamp, doc } from "firebase/firestore";
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from './features/userSlice'; 
import { updateDescription } from "./features/userSlice";

const Feed = () => {
  const dispatch = useDispatch()
  const [posts, setPosts] = useState([]);
  const [input, setInput ] = useState('');
  const user = useSelector(selectUser)
  const name = user?.name || ''
  const profilePic = user?.photoUrl || ''
  const description = user?.description || ''

  useEffect(() => {
    const q = query(collection(db, "posts"), (orderBy("timestamp", "desc")));
    onSnapshot(q, (snapshot) => {
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });

  }, [user]);
  function populateFeed(e) {
    e.preventDefault();
    if(input !== '') {
      addDoc(collection(db, "posts"),{
        name: name,
        message: input,
        description: description,
        profilePic: profilePic,
        timestamp: serverTimestamp(),
        uid: user?.uid
      })
      setInput('');
    }
  }
  return (
    <div className="flex max-md:m-auto md:min-w-[28rem] max-md:mt-6 max-w-xl grow flex-col overflow-hidden">
      {/* form */}
      <FeedForm
        onFormSubmit={populateFeed}
        input={input}
        setInput={setInput}
      />
      <div className="border-b-2 mt-3 border-gray-400 w-full mx-auto"></div>
      {/* posts */}
      {posts.map(({id, data: {name, message, profilePic, description }}) => (
        <FeedPost 
          key={id}
          name={name}
          message={message}
          profilePic={profilePic}
          description={description}
        />
      ))}
    </div>
  );
};

export default Feed;
