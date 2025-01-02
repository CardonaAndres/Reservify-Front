import { useEffect, useState } from "react"
import { profileRequest } from "../../API/user.js"
import { Navbar } from "../../components/navbar/Navbar.jsx"
import { SpinnerLoading } from "../../components/common/SpinnerLoading.jsx";
import { errorAlert } from "../../components/common/Alerts.jsx";
import { useNavigate } from "react-router-dom";
import { ProfileCard } from "../../components/users/profile/ProfileCard.jsx";
import { router } from "../../configs/config.js";

export const Profile = () => {
    const [user, setUserData] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()

    useEffect(() => {

        const getUserData = async () => {
            try {
                const res = await profileRequest();
                if(!res.status)
                    throw new Error(res.message)

                setUserData(res.data);

            } catch (err) {
                await errorAlert({ message : err.message });
                navigate(router.home);
            } finally {
                setLoading(false);
            }
        }

        getUserData();

    }, []);

    if(loading) return <SpinnerLoading />

    return (
        <>
            <Navbar/> 
            <ProfileCard userData={user} />

        </>
    )
}

