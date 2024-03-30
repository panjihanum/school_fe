import React from 'react';
import { useLoading } from './LoadingContext';

const LoadingSpinner: React.FC = () => {
    const { isLoading } = useLoading();

    return isLoading ? (
        <div className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center bg-transparent">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
        </div>
    ) : null;
};

export default LoadingSpinner;
