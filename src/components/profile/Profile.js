import React, { useState, useContext, useEffect } from 'react';
import style from './Profile.module.css';
import pp from '../contribute/pp.png';
import { AuthContext } from '../../services/AuthContext.js';
import { ToastContainer, toast } from 'react-toastify';
import { Cropper } from 'react-cropper';
import 'react-toastify/dist/ReactToastify.css';
import 'cropperjs/dist/cropper.css';

function Profile() {
    const mandatory = { color: 'red' };
    const { user } = useContext(AuthContext);
    const [password, setPassword1] = useState('');
    const [confirmpass, setPassword2] = useState('');
    const [inputname, setName] = useState(localStorage.getItem('username') || '');
    const [phone, setPhone] = useState(localStorage.getItem('phone') || '');
    const [gender, setGender] = useState(localStorage.getItem('gender') || 'male');
    const [dob, setDob] = useState(localStorage.getItem('dob') || '');
    const [profilePic, setProfilePic] = useState(localStorage.getItem('profilePic') || pp);
    const [isModalOpen, setModalOpen] = useState(false);
    const [cropper, setCropper] = useState();
    const [showProfileButtons, setShowProfileButtons] = useState(false);

    useEffect(() => {
        setName(localStorage.getItem('username') || '');
        setPhone(localStorage.getItem('phone') || '');
        setGender(localStorage.getItem('gender') || 'male');
        setDob(localStorage.getItem('dob') || '');
        setProfilePic(localStorage.getItem('profilePic') || pp);
    }, []);

    const notifySuccess = (msg) => {
        toast.success(`${msg}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
        });
    };

    const notifyWarning = (msg) => {
        toast.warning(`${msg}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
        });
    };

    const saveChanges = () => {
        if (!inputname.trim()) {
            notifyWarning('Username cannot be empty!');
            return;
        }
        if (!/^\d{10}$/.test(phone.trim())) {
            notifyWarning('Enter a valid 10-digit phone number!');
            return;
        }
        if (!dob || new Date(dob) > new Date()) {
            notifyWarning('Please select a valid past date of birth!');
            return;
        }
        if (password !== confirmpass) {
            notifyWarning('Passwords do not match!');
            return;
        }

        localStorage.setItem('username', inputname);
        localStorage.setItem('phone', phone);
        localStorage.setItem('gender', gender);
        localStorage.setItem('dob', dob);
        localStorage.setItem('profilePic', profilePic);
        if (password) {
            localStorage.setItem('password', password);
        }

        notifySuccess('Profile updated successfully!');
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => setProfilePic(e.target.result);
            reader.readAsDataURL(file);
            setModalOpen(true);
        }
    };

    const getCroppedImage = () => {
        if (cropper) {
            const croppedImage = cropper.getCroppedCanvas().toDataURL();
            setProfilePic(croppedImage);
            setModalOpen(false);
            notifySuccess('Profile photo updated!');
        }
    };

    const resetProfilePhoto = () => {
        setProfilePic(pp);
        notifySuccess('Profile photo removed!');
    };

    return (
        <div className={style.parent}>
            <div className={style.Profile}>
                <div className={style.imgSection}>
                    <input
                        type="file"
                        accept="image/*"
                        id="profile-photo-upload"
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                    />
                    <img
                        src={profilePic}
                        alt="Profile"
                        className={style.profileImg}
                        onClick={() => setShowProfileButtons(!showProfileButtons)}
                    />
                </div>

                {showProfileButtons && (
                    <div className={style.profileButtons}>
                        <button 
                            onClick={() => document.getElementById('profile-photo-upload').click()} 
                            className={style.saveButton}
                        >
                            Change Profile
                        </button>
                        <button 
                            onClick={resetProfilePhoto} 
                            className={style.saveButton}
                        >
                            Remove Profile
                        </button>
                    </div>
                )}

                {isModalOpen && (
                    <div className={style.modal}>
                        <div className={style.modalContent}>
                            <Cropper
                                src={profilePic}
                                style={{ height: 300, width: '100%' }}
                                initialAspectRatio={1}
                                aspectRatio={1}
                                guides={true}
                                viewMode={1}
                                responsive={true}
                                autoCropArea={1}
                                onInitialized={(instance) => setCropper(instance)}
                            />
                            <button onClick={getCroppedImage} className={style.modalButton}>
                                Save Cropped Image
                            </button>
                            <button onClick={() => setModalOpen(false)} className={style.modalClose}>
                                Cancel
                            </button>
                        </div>
                    </div>
                )}

                <div className={style.userInfo}>
                    <div className={style.field}>
                        <h1>Username<span style={mandatory}>*</span></h1>
                        <input
                            type="text"
                            placeholder="Username"
                            value={inputname}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className={style.field}>
                        <h1>Email</h1>
                        <input type="text" value={user.email} readOnly />
                    </div>
                    <div className={style.field}>
                        <h1>Phone<span style={mandatory}>*</span></h1>
                        <input
                            type="text"
                            placeholder="10-digit phone number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                    <div className={style.field}>
                        <h1>Gender</h1>
                        <select
                            className={style.choice}
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                        >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                    <div className={style.field}>
                        <h1>DOB<span style={mandatory}>*</span></h1>
                        <input
                            type="date"
                            value={dob}
                            onChange={(e) => setDob(e.target.value)}
                        />
                    </div>
                    <div className={style.field}>
                        <h1>Change Password<span style={mandatory}>*</span></h1>
                        <input
                            type="password"
                            placeholder="Set New Password"
                            value={password}
                            onChange={(e) => setPassword1(e.target.value)}
                            required
                        />
                    </div>
                    <div className={style.field}>
                        <h1>Confirm Password<span style={mandatory}>*</span></h1>
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmpass}
                            onChange={(e) => setPassword2(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <button className={style.saveButton} onClick={saveChanges}>Save Changes</button>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Profile;
