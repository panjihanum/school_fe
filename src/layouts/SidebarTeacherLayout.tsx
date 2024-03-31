import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BsPeople, BsBoxArrowRight } from 'react-icons/bs';
import { useAuth } from 'src/hooks/AuthContext';

const SidebarTeacherLayout: React.FC = () => {
    const { logout } = useAuth();
    const location = useLocation();

    return (
        <div className="bg-[#10141f] backdrop-filter backdrop-blur-lg text-white lg:w-[272px] overflow-hidden">
            <div className="py-4">
                <div className='border-b border-gray-300 mb-4 pb-4'>
                    <h1 className="text-xl font-bold mx-4">Teacher Panel</h1>
                </div>
                <ul className="space-y-2">
                    <li className="w-full">
                        <Link to="/teacher/list-courses"
                            className={`flex items-center hover:text-gray-300 py-2 px-4 ${location.pathname.includes("/teacher/list-courses") ? "bg-white bg-opacity-25" : ""}`}
                        >
                            <BsPeople className="w-5 h-5 mr-2" /> List Course
                        </Link>
                    </li>
                </ul>
                <div className="absolute bottom-0 left-0 right-0 bg-[#10141f] border-t border-gray-300 py-4">
                    <button onClick={logout} className="text-white hover:text-gray-300 w-full text-left px-4 flex items-center">
                        <BsBoxArrowRight className="w-5 h-5 mr-2" /> Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SidebarTeacherLayout;
