// import React, { useEffect, useState } from "react";

// const NotificationPage = () => {
//   const [notificationPermission, setNotificationPermission] = useState(Notification.permission);

//   // Request Notification permission when the component mounts
//   useEffect(() => {
//     if (notificationPermission !== "granted") {
//       Notification.requestPermission().then((permission) => {
//         setNotificationPermission(permission);
//       });
//     }
//   }, [notificationPermission]);

//   // Function to show a notification
//   const showNotification = () => {
//     if (notificationPermission === "granted") {
//       const notification = new Notification("Hello!", {
//         body: "This is a React Notification example.",
//         icon: "https://via.placeholder.com/100", // Example icon URL
//       });

//       notification.onclick = () => {
//         window.focus();
//         console.log("Notification clicked!");
//       };
//     } else {
//       alert("Please enable notifications for this feature.");
//     }
//   };

//   return (
//     <div style={{ padding: "20px", textAlign: "center" }}>
//       <h1>Notification Page</h1>
//       {notificationPermission === "denied" ? (
//         <p style={{ color: "red" }}>
//           Notifications are disabled. Please allow them in your browser settings.
//         </p>
//       ) : (
//         <button onClick={showNotification} style={{ padding: "10px 20px", fontSize: "16px" }}>
//           Show Notification
//         </button>
//       )}
//     </div>
//   );
// };

// export default NotificationPage;





import React from 'react';
import styles from './Notification.module.css';

const Notification = () => {
    const notifications = [
        { id: 1, message: "Your profile has been updated successfully.", date: "2023-10-01" },
        { id: 2, message: "New comment on your post.", date: "2023-10-02" },
        { id: 3, message: "You have a new follower.", date: "2023-10-03" },
        { id: 4, message: "Your contribution has been approved.", date: "2023-10-04" },
    ];

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Notifications</h1>
            <div className={styles.notificationList}>
                {notifications.length === 0 ? (
                    <p>No notifications available.</p>
                ) : (
                    notifications.map(notification => (
                        <div key={notification.id} className={styles.notificationItem}>
                            <p>{notification.message}</p>
                            <span className={styles.date}>{notification.date}</span>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Notification;