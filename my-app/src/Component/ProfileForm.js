// ProfileForm
import axios from "axios";
import { useEffect, useState } from "react";
import "../Styles/MyPage.css";

const ProfileForm = ({ userId, baseURL }) => {
    const [profileData, setProfileData] = useState([]);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get(`${baseURL}/my/profile/${userId}`);
                const userData = response.data[0];
                setProfileData(userData);
            } catch (error) {
                console.error('Error: fetching profile data:', error);
            }
        };

        fetchProfile();
    }, [userId]);


    return (
        <div className="my-profile-form">
            <div className="my-form__title">
                <p className="my-form__text">나의 프로필</p>
            </div>

            <div className="my-profile-form__wrapper">
                <div className="my-profile-form__img">
                <img className="my-profile-form__img" src="/user_img/basic.png" alt="IMG" />
                </div>
            </div>

            {profileData.usertype === '2' || profileData.usertype === '3'
                ? (<p>사업자번호 {profileData.businessnumber}</p>) : null}
            <div className="my-profile-name__wrapper">
                <span className="my-profile__username">{profileData.username}</span>
                <span className="my-profile__sir">님</span>
            </div>

            <div className="my-profile-content__detail">
                <table>
                    <tr>
                        <td>아이디</td>
                        <td>{profileData.email}</td>
                    </tr>
                    <tr>
                        <td>휴대전화</td>
                        <td>{profileData.phonenumber &&
                            profileData.phonenumber.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3')}</td>
                    </tr>
                    <tr>
                        <td>주소</td>
                        <td>{profileData.address}</td>
                    </tr>
                    <tr>
                        <td>상세주소</td>
                        <td>{profileData.detailedaddress}</td>
                    </tr>
                </table>
            </div>
        </div>
    );
};
export default ProfileForm;