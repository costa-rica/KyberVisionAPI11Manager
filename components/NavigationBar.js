import styles from "../styles/NavigationBar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { logoutUser } from "../reducers/user";

export default function NavigationBar() {
  const userReducer = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false);
  const [uploadDropdownOpen, setUploadDropdownOpen] = useState(false);
  const menuRef = useRef(null);
  const uploadMenuRef = useRef(null);
  const router = useRouter();

  const toggleMenu = () => {
    setMenuOpen(true);
  };

  const toggleUploadDropdown = () => {
    setUploadDropdownOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
      if (
        uploadMenuRef.current &&
        !uploadMenuRef.current.contains(event.target)
      ) {
        setUploadDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const pressedLogoutUser = () => {
    dispatch(logoutUser());
    alert("Logged out");
    router.push("/login");
  };

  return (
    <nav className="nav-custom">
      <div className={styles.divHeaderTop}>
        <div className={styles.divHeaderTopLeft}>
          <Image
            src="/images/KyberV2Shiny.png"
            width={315}
            height={47}
            alt="Kyber Vision Logo"
          />
          <h2 className={styles.h2MachineName}>{userReducer.email}</h2>
          <h2 className={styles.h2MachineName}>
            API URL: {process.env.NEXT_PUBLIC_API_BASE_URL}
          </h2>
        </div>
        <div className={styles.divHeaderRight}>
          <button
            className={styles.hamburgerMenu}
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
          >
            <FontAwesomeIcon
              icon={faBars}
              style={{ fontSize: "xx-large", color: "white" }}
            />
          </button>
          <ul
            className={`${styles.divHeaderRightUl} ${
              menuOpen ? styles.menuOpen : ""
            }`}
            ref={menuRef}
          >
            <li className={styles.divHeaderRightLi}>
              <button onClick={() => router.push("/admin-db")}>
                Admin Database
              </button>
              <button onClick={() => router.push("/versions")}>Versions</button>
              <button onClick={() => pressedLogoutUser()}>Logout</button>
              <div className={styles.uploadDropdown} ref={uploadMenuRef}>
                <button onClick={toggleUploadDropdown}>Select ▼</button>
                {uploadDropdownOpen && (
                  <ul className={styles.uploadDropdownMenu}>
                    <li>
                      <button onClick={() => router.push("/admin-db/Videos")}>
                        Upload Video
                      </button>
                    </li>
                    <li>
                      <button onClick={() => router.push("/admin-db/Matches")}>
                        Matches
                      </button>
                    </li>
                    <li>
                      <button onClick={() => router.push("/admin-db/Leagues")}>
                        Leagues
                      </button>
                    </li>
                    <li>
                      <button onClick={() => router.push("/admin-db/Teams")}>
                        Teams
                      </button>
                    </li>
                    <li>
                      <button onClick={() => router.push("/admin-db/Players")}>
                        Players
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => router.push("/admin-db/PlayerContracts")}
                      >
                        Player Contracts
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

// import styles from "../styles/NavigationBar.module.css";
// import { useDispatch, useSelector } from "react-redux";
// import { useRouter } from "next/router";
// import { useState, useEffect, useRef } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faBars } from "@fortawesome/free-solid-svg-icons";
// import Image from "next/image";
// import { logoutUser } from "../reducers/user";

// export default function NavigationBar() {
//   const userReducer = useSelector((state) => state.user.value);
//   const dispatch = useDispatch();
//   const [menuOpen, setMenuOpen] = useState(false);
//   const menuRef = useRef(null); // Create a ref for the menu container
//   const router = useRouter();

//   const toggleMenu = () => {
//     setMenuOpen(true);
//   };

//   // Handle clicks outside the menu
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (menuRef.current && !menuRef.current.contains(event.target)) {
//         setMenuOpen(false); // Close the menu if clicked outside
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   const pressedLogoutUser = () => {
//     dispatch(logoutUser());
//     alert("Logged out");
//     router.push("/login");
//   };

//   return (
//     <nav className="nav-custom">
//       <div className={styles.divHeaderTop}>
//         <div className={styles.divHeaderTopLeft}>
//           <Image
//             src="/images/KyberV2Shiny.png"
//             width={315}
//             height={47}
//             alt="Kyber Vision Logo"
//           />
//           <h2 className={styles.h2MachineName}>{userReducer.email}</h2>
//           <h2 className={styles.h2MachineName}>
//             API URL: {process.env.NEXT_PUBLIC_API_BASE_URL}
//           </h2>
//         </div>
//         <div className={styles.divHeaderRight}>
//           <button
//             className={styles.hamburgerMenu}
//             onClick={toggleMenu}
//             aria-label="Toggle navigation menu"
//           >
//             <FontAwesomeIcon
//               icon={faBars}
//               style={{ fontSize: "xx-large", color: "white" }}
//             />
//           </button>
//           <ul
//             className={`${styles.divHeaderRightUl} ${
//               menuOpen ? styles.menuOpen : ""
//             }`}
//             ref={menuRef}
//           >
//             <li className={styles.divHeaderRightLi}>
//               <button onClick={() => router.push("/uploader")}>Upload</button>
//               <button onClick={() => router.push("/admin-db")}>
//                 Admin Database
//               </button>
//               <button onClick={() => router.push("/versions")}>Versions</button>
//               <button onClick={() => pressedLogoutUser()}>Logout</button>
//             </li>
//           </ul>
//         </div>
//       </div>

//     </nav>
//   );
// }
