import {Form} from "../components/forms/form/index";

class WelcomePage {
    constructor() {
        this.signInForm = new SignInForm();
    }
    
    static run() {
        WelcomePage.instance = new WelcomePage();
    }
    
    static getInstance() {
        return WelcomePage.instance;
    }
}

class SignInForm extends Form {
    constructor(options) {
        super(document.querySelector(".form--signIn"), options)
    }

    submitHandler(e) {
        console.log("SignInForm submitted!");
    }
}

export { WelcomePage };