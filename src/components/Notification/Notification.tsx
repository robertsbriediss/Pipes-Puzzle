import { useEffect, useState } from 'react';

import './Notification.scss';

export function Notification() {
    const [isOnline, changeIsOnline] = useState(navigator.onLine);

    const setOnline = () => changeIsOnline(true);
    const setOffline = () => changeIsOnline(false);

    useEffect(() => {
        window.addEventListener('offline', setOffline);
        window.addEventListener('online', setOnline);

        return () => {
            window.removeEventListener('offline', setOffline);
            window.removeEventListener('online', setOnline);
        };
    }, []);

    if (isOnline) {
        return null;
    }

    return (
        <div className="Notification">
            <p className="NotificationMessage">Internet connection lost!</p>
        </div>
    );
}
