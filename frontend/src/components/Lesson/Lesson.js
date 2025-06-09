import { UserProfil, GetClasses } from '../../utils/UserData';

const GetLesson = () => {
    const { userData } = UserProfil();
    const userId = userData?.id;

    const { classList, loading } = GetClasses(userId);
    if (loading) return <p>Loading...</p>;

    return (
        <div>
            <h2>Lessons</h2>
            {classList.length === 0 ? (
                <p>No classes found.</p>
            ) : (
                <ol>
                    {classList.map((cls) => (
                        <li key={cls.id}> {cls.className} {cls.teacherName}  </li>
                    ))}
                </ol>
            )}
        </div>
    );
};

export default GetLesson;