import React, { useEffect, useState } from 'react';
import { Forum } from 'src/interface/forum';
import { useLoading } from 'src/hooks/LoadingContext';
import { axiosForumutil } from 'src/util/axiosUtil';
import LayoutTeacher from 'src/layouts/TeacherLayout';
import { useParams } from 'react-router-dom';
import ForumModal from 'src/components/ForumModal';

const TeacherForumPage: React.FC = () => {
    const { courseId } = useParams<{ courseId: string }>();
    const [forums, setForums] = useState<Forum[]>([]);
    const [selectedForum, setSelectedForum] = useState<Forum | null>(null); // State to hold the selected forum ID
    const { setLoading } = useLoading();

    useEffect(() => {
        const fetchForums = async () => {
            try {
                setLoading(true);
                const response = await axiosForumutil.get(`/forum?courseId=${courseId}`);
                setForums(response.data);
            } catch (error) {
                console.error('Error fetching forums:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchForums();
    }, [courseId]);

    const handleOpenModal = (forum: Forum) => {
        setSelectedForum(forum);
    };

    const handleCloseModal = () => {
        setSelectedForum(null);
    };

    return (
        <LayoutTeacher>
            <div className="container mx-auto px-4 py-8">
                <span className='text-2xl font-bold'>List Forum:</span>
                <div className='h-10' />
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {!forums.length && <p className="col-span-full text-center">No forums found.</p>}
                    {forums.map((forum) => (
                        <div key={forum.id} onClick={() => handleOpenModal(forum)}>
                            <ForumCard forum={forum} />
                        </div>
                    ))}
                </div>
            </div>
            {selectedForum && (
                <ForumModal
                    forum={selectedForum}
                    handleClose={handleCloseModal}
                />
            )}
        </LayoutTeacher>
    );
};

interface ForumCardProps {
    forum: Forum;
}

const ForumCard: React.FC<ForumCardProps> = ({ forum }) => {
    return (
        <div className="bg-[#10141f] bg-opacity-[0.9] backdrop-filter backdrop-blur-lg shadow-lg rounded-lg overflow-hidden transform transition duration-500 hover:scale-105 rounded-lg flex justify-start items-start text-start">
            <div className="p-4 w-full">
                <h3 className="text-xl font-semibold mb-2 text-white">{forum.title}</h3>
                <div className='border-b border-white w-full mt-4' />
                <p className="mb-4 text-sm text-white mt-4">{forum.description}</p>
            </div>
        </div>
    );
};

export default TeacherForumPage;
