const prepareNotification = (user) => {
    const title = 'Prośba o rozmowę';
    const options = {
        body: `Użytkownik ${user.name} ${user.surname} chce porozmawiać`,
        icon: user.avatar,
    };
    return new Notification(title, options);
};

const createNotification = (user) => {
    if ('Notification' in window) {
        if (Notification.permission === "granted") {
            prepareNotification(user);
        } else {
            Notification.requestPermission((permission) => {
                if (permission === "granted") {
                    prepareNotification(user);
                }
            });
        }
    }
};

export default createNotification;