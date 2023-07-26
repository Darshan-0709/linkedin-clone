import React, { useEffect, useState } from "react";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import BusinessCenterRoundedIcon from "@mui/icons-material/BusinessCenterRounded";
import TextsmsRoundedIcon from "@mui/icons-material/TextsmsRounded";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import EditIcon from "@mui/icons-material/Edit";
import HeaderButton from "./HeaderButton";
import PersonIcon from '@mui/icons-material/Person';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { useDispatch } from "react-redux";
import { auth, db } from "./Firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { logout, updateDescription } from "./features/userSlice";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import { collection, doc, getDocs, query, updateDoc, where, writeBatch } from "firebase/firestore";
import { Icon } from "@mui/material";

const Header = () => {
  const [overflow, setOverflow] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [newDescription, setNewDescription] = useState("");
  const user = useSelector(selectUser);
  const description = user?.description;
  const profilePic = user?.photoUrl || "";
  const dispatch = useDispatch();

  useEffect(() => {
    setNewDescription(description);
  }, [description]);

  const updateDescriptionAndPosts = async () => { 
    try {
      if (!newDescription) {
        return;
      }
  
      const userRef = doc(db, "users", auth.currentUser.uid);
      await updateDoc(userRef, { description: newDescription });
      dispatch(updateDescription(newDescription));
      const postQuery = query(
        collection(db, "posts"),
        where("uid", "==", auth.currentUser.uid)
      );
      const postSnap = await getDocs(postQuery);
      const batch = writeBatch(db);
      postSnap.forEach((postDoc) => {
        const postRef = doc(db, "posts", postDoc.id);
        batch.update(postRef, { description: newDescription });
      });
      await batch.commit();
      console.log("description updated successfully");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is logged in, call the updateDescriptionAndPosts function
        updateDescriptionAndPosts();
      } else {
        // User is not logged in, do nothing or handle accordingly
        console.log("User not logged in.");
      }
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, [newDescription]);

  function toggleOverFlow() {
    setOverflow(!overflow);
  }

  function toggleShowEditProfile() {
    setShowEditProfile(!showEditProfile);
  }

  window.addEventListener("resize", () => {
    if (window.innerWidth > 415) setOverflow(false);
  });

  const logoutOffApp = () => {
    dispatch(logout());
    signOut(auth);
    toggleShowEditProfile()
  };

  return (
    <div className="bg-white sticky top-0 left-0 border-b-[1px] z-10">
      <div className={`sm:pl-2 max-w-6xl mx-auto flex justify-between `}>
        <div className="flex gap-3 py-2 grow max-w-xs">
          <FontAwesomeIcon
            className="text-[#0072b1] text-4xl"
            icon={faLinkedin}
          />
          <div
            className="sm:bg-[#0073b114] px-1 rounded-sm overflow-hidden flex gap-2 items-center grow">
            <SearchRoundedIcon className="text-gray-600 text-6xl" />
            <input
              className="hidden sm:block focus:outline-none bg-transparent pr-2"
              type="text"
              placeholder="search..."
            />
          </div>
        </div>
        <div className="relative">
          <div
            className={`flex min-[810px]:min-w-[34rem] pt-1 space-x-4 justify-end items-center grow flex-wrap relative max-[415px]:pr-10 ${
              overflow ? "" : "overflow-hidden h-14"
            }`}>
            <button
              className="min-[356px]:hidden absolute z-10 h-6 w-6 top-1/2 -translate-y-1/2 right-3 hover:bg-gray-200"
              onClick={() => toggleOverFlow()}>
              <MoreHorizIcon />{" "}
            </button>
            <HeaderButton
              Icon={HomeRoundedIcon}
              Title={"Home"}
            />
            <HeaderButton
              Icon={SupervisorAccountIcon}
              Title={"My Network"}
            />
            <HeaderButton
              Icon={BusinessCenterRoundedIcon}
              Title={"Jobs"}
            />
            <HeaderButton
              Icon={TextsmsRoundedIcon}
              Title={"Massaging"}
            />
            <HeaderButton
              Icon={NotificationsIcon}
              Title={"Notifications"}
            />
            <HeaderButton
              onButtonClick={toggleShowEditProfile}
              profilePic={profilePic}
              Icon={PersonIcon}
              Title={"Me"}
              Arrow={ArrowDropDownIcon}
            />
          </div>
          {showEditProfile && (
            <div className="absolute shadow-[0_2px_.5rem_#00000043] top-20 rounded-md z-20 right-0 px-3 py-6 bg-white ">
              <div className="absolute p-3 bg-white z-10 -top-2 right-0 transform rotate-45 -translate-x-1/3"></div>
              <div className="absolute p-3 bg-white z-10 -top-2 right-0 transform rotate-45 -translate-x-1/3"></div>
              <div className="flex">
                <span className="w-full text-center font-semibold px-3 py-1">
                  {description}
                </span>
                <button
                  onClick={() =>
                    setNewDescription(prompt("Enter New Discription"))
                  }
                  className="rounded-md px-1 flex items-center hover:bg-slate-200 focus:bg-slate-200 transition">
                  <EditIcon />
                </button>
              </div>
              <div className="w-full border-b-[1px] my-3"></div>
              <button
                onClick={logoutOffApp}
                className="w-full text-center font-semibold px-3 py-1 rounded-md hover:bg-slate-200 focus:bg-slate-200 transition">
                LogOut
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
