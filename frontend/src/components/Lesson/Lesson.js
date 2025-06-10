import { UserProfil, GetClasses } from '../../utils/UserData';
import './Lesson.css';

const GetLesson = () => {
    const { userData } = UserProfil();
    const userId = userData?.id;

    const { classList, loading } = GetClasses(userId);
    if (loading) return <p>Loading...</p>;

    return (
        <div className='container'>
            <h2>Lessons</h2>
            {classList.length === 0 ? (
                <p className="no-classes">No classes found.</p>
            ) : (

                <div className='lesson-grid'>
                    {classList.map((cls) => (

                        <div key={cls.id} className='lesson-card'>
                            <h3>{cls.className} </h3>
                            <p>{cls.teacherName}   </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default GetLesson;