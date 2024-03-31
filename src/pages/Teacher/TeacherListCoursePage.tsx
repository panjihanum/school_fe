import React, { useState, useEffect } from 'react';
import { axiosCourseUtil } from 'src/util/axiosUtil';
import { useLoading } from 'src/hooks/LoadingContext';
import { Course } from 'src/interface/course';
import LayoutTeacher from 'src/layouts/TeacherLayout';

const TeacherListCoursePage: React.FC = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const { setLoading } = useLoading();

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                setLoading(true);
                const response = await axiosCourseUtil.get('/teacher/courses');
                setCourses(response.data);
            } catch (error) {
                console.error('Error fetching courses:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    return (
        <LayoutTeacher>
            <div className="container mx-auto px-4 py-8">
                <span className='text-2xl font-bold'>List Course</span>
                <div className='h-10' />
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {!courses.length && <p className="col-span-full text-center">No courses found.</p>}
                    {courses.map((course) => (
                        <ListBoxCardAnimation key={course.id} course={course} />
                    ))}
                </div>
            </div>
        </LayoutTeacher>
    );
};

interface ListBoxCardAnimationProps {
    course: Course;
}

const ListBoxCardAnimation: React.FC<ListBoxCardAnimationProps> = ({ course }) => {
    return (
        <button className="bg-[#10141f] bg-opacity-[0.9] backdrop-filter backdrop-blur-lg shadow-lg rounded-lg overflow-hidden transform transition duration-500 hover:scale-105 rounded-lg flex justify-start items-start text-start">
            <div className="p-4 w-full">
                <h3 className="text-xl font-semibold mb-2 text-white">{course.title}</h3>
                <div className='border-b border-white w-full mt-4' />
                <p className="mb-4 text-sm text-white mt-4">{course.description}</p>
            </div>
        </button>
    );
};

export default TeacherListCoursePage;
