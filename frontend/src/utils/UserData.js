import { useState, useEffect } from "react";
import { config, endpoints, frontendMessages } from "../config";
import { handleError } from './Helpers';

export const UserProfil = () => {
    const [userData, setUserData] = useState(null);
    const email = localStorage.getItem("userEmail");

    useEffect(() => {
        if (!email) return;
        fetch(`${config.API_BASE_URL}${endpoints.PROFILE}/${email}`)
            .then((res) => res.json())
            .then((data) => {
                if (data) setUserData(data);
            })
            .catch((err) => handleError(err, frontendMessages.error.profileFetch));
    }, [email]);
    return { userData };
};

export const GetClasses = (userId) => {
    const [classList, setClassList] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        if (!userId || typeof userId !== "string") return;

        const fetchClasses = async () => {
            if (!userId) return;
            try {
                let res;


                if (userId[0] === "T") {
                    res = await fetch(`${config.API_BASE_URL}${endpoints.CLASS.GET_ALL}${userId}`);
                }
                else {
                    res = await fetch(`${config.API_BASE_URL}${endpoints.CLASS.STUDENT_CLASS}${userId}`);
                }
                if (!res.ok) throw new Error("Class list fetch failed");


                const classData = await res.json();
                setClassList(classData);
            } catch (err) {
                handleError(err, "Class list fetch failed");
            } finally {
                setLoading(false);
            }
        };

        fetchClasses();
    }, [userId]);

    const refreshClasses = async () => {
        if (!userId) return;
        try {
            let res;
            if (userId[0] === "T") {
                res = await fetch(`${config.API_BASE_URL}${endpoints.CLASS.GET_ALL}${userId}`);
            }
            else {
                res = await fetch(`${config.API_BASE_URL}${endpoints.CLASS.STUDENT_CLASS}${userId}`);
            }
            if (!res.ok) throw new Error("Class list fetch failed");

            const classData = await res.json();
            setClassList(classData);
        } catch (err) {
            handleError(err);
        }
    };

    return { classList, loading, refreshClasses };
};

