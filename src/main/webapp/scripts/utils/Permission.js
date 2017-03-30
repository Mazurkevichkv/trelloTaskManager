import {Request} from "./Request";
class Permission {
    constructor() {
        this.getUserRole();
    }

    static run() {
        Permission.instance = new Permission();
    }

    static getInstance() {
        return Permission.instance;
    }

    getUserRole () {
        const request = new Request("/rest/user/current", "GET");

        // request.send().then((response) => {
        //         console.log(response);
        //     }).catch((error) => {
        //         console.log("Error: " + error);
        //     })
        let mock = {
            id: 1,
            userRole: 1
        };

        Promise.resolve(mock).then((response) => {
            console.log(response);
        });
    }
}

export {Permission};
