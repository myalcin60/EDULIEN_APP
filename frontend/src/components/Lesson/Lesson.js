import { UserProfil, GetClasses } from '../../utils/UserData';

const GetLesson = () => {
    const { userData } = UserProfil();
    const userId = userData?.id;

    const { classList, loading } = GetClasses(userId);
    if (loading) return <p>Loading...</p>;

    return (
        <div>
            <h2>Lessons</h2>
            <p>Here are your Lessons assignments.</p>

            {classList.length === 0 ? (
                <p>No classes found.</p>
            ) : (
                <ul>
                    {classList.map((cls) => (
                        <li key={cls.id || cls.classId}>{cls.className}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default GetLesson;