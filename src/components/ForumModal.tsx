import React from 'react';
import { Forum } from 'src/interface/forum';
import ForumPartial from './ForumPartial';
import Modal from './Modal';
import { useAuth } from 'src/hooks/AuthContext';

interface ForumModalProps {
    forum: Forum;
    handleClose: () => void;
}

const ForumModal: React.FC<ForumModalProps> = ({ forum, handleClose }) => {
    const { user } = useAuth();
    return (
        <Modal
            isOpen
            handleClose={handleClose}
        >
            <div className="flex flex-col p-6 space-y-4">
                <h2 className="text-lg font-semibold">{forum.title}</h2>
                <p className="text-sm">{forum.description}</p>
                <ForumPartial senderId={user?.id ?? ""} forumId={forum.id} />
            </div>
        </Modal>
    );
};

export default ForumModal;
