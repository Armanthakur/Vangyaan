import React, { useEffect, useState, useContext } from "react";
import { useLazyQuery, gql } from "@apollo/client";
import styles from "../showPosts/style.module.css";
import { Link, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../services/AuthContext.js";

function 
ShowPost() {
  const [pList, setpList] = useState([]);
  const { logout } = useContext(AuthContext);
  const { state } = useLocation();

  const notifyError = (msg) => {
    toast.error(` ${msg}!`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      containerId: "Error",
    });
  };

  const [getpList] = useLazyQuery(
    gql`
      query GetPosts($details: searchQuery) {
        getPosts(details: $details) {
          createdAt
          description
          location
          species
          imagesLink
          postID
          postedBy
        }
      }
    `,
    {
      errorPolicy: "all",
      onCompleted: (data) => {
        setpList(data.getPosts);
      },
      onError: (error) => {
        console.error("Error:", error);
        notifyError(error.message);
        if (error.graphQLErrors[0]?.code === 601) {
          setTimeout(() => {
            logout();
          }, 1000);
        }
      },
    }
  );

  useEffect(() => {
    const searchText = state?.searchText || null; // Use null if no searchText is provided
    const variables = {
      details: {
        showMyPosts: false,
      },
    };

    // Add searchText only if it is valid
    if (searchText && searchText.trim().length > 0) {
      variables.details.searchText = searchText.trim();
    }

    getpList({ variables });
  }, [state]);

  return (
    <div className={styles.top}>
      <div className={styles.parent1}>
        <div className={styles.listOptions}>
          <input
            type="text"
            className={styles.search}
            placeholder="Search Observation"
            onChange={(e) => {
              const searchText = e.target.value.trim();
              const variables = {
                details: {
                  showMyPosts: false,
                },
              };

              // Add searchText only if it is valid
              if (searchText.length > 0) {
                variables.details.searchText = searchText;
              }

              getpList({ variables });
            }}
          />
        </div>

        <ul className={styles.listContainer}>
          {pList?.map((post) => (
            <Link
              key={post.postID}
              to={{ pathname: `/showposts/${post.postID}` }}
              state={{ postinfo: post }}
            >
              <li className={styles.listItem}>
                <img
                  src={`https://eflora.vangyaan.com/images/${post.imagesLink[0]}`}
                  alt="r2"
                />
                <div className={styles.itemContent}>
                  <h3>{post.postedBy}</h3>
                  <p>{post.description}</p>
                </div>
              </li>
            </Link>
          ))}
        </ul>
      </div>

      <ToastContainer containerId="Error" />
    </div>
  );
}

export default ShowPost;
