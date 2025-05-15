import { Outlet } from 'react-router';

export default function HomeLibrary() {

    return (
        <div className="flex flex-1 justify-center p-4">
            <Outlet />
        </div>
    );
}
