import {Request} from "./Request";
class Permission {
    constructor() {
        
    }

    static run() {
        Permission.instance = new Permission();
    }

    static getInstance() {
        return Permission.instance;
    }

    static getUserRole () {
        return Permission.userRole;
    }

    static get isDeveloper() {
        return Permission.userRole === Permission.USER_ROLES.DEVELOPER;
    }

    static get isTeamLead () {
        return Permission.userRole === Permission.USER_ROLES.TEAM_LEAD;
    }

    static get isProductOwner () {
        return Permission.userRole === Permission.USER_ROLES.PRODUCT_OWNER;
    }

    getUserRole () {
        const request = new Request("/rest/user/current", "GET");

        return request.send().then((response) => {
            Permission.userRole = response.userRole;
            console.log(response);
        });
    }
}

Permission.USER_ROLES = {
    DEVELOPER: 'DEVELOPER',
    TEAM_LEAD: 'TEAM_LEAD',
    PRODUCT_OWNER: 'PRODUCT_OWNER'
};

export {Permission};
