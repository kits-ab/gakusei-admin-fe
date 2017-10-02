export default function userUtils() {
    return {
        timestampToDate(timestamp) {
            let date = new Date(timestamp);
            return date.toLocaleString('sv');
        },
    
        createHeader(user) {
            return `${this.stringifyRole(user.role)} : ${user.username}`;
        },
    
        stringifyRole(role) {
            switch (role) {
                case 'ROLE_USER':
                    return 'User';
                case 'ROLE_ADMIN':
                    return 'Admin';
                default:
                    return 'Null';
            }
        }
    };
}
