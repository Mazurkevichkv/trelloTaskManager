import {Form} from "../components/forms/form/index";

class RegisterPage {
    constructor() {
        this.registrationForm = new RegistrationForm();
    }

    static run() {
        RegisterPage.instance = new RegisterPage();
    }
    
    static getInstance() {
        return RegisterPage.instance;
    }
}

class RegistrationForm extends Form {
    constructor(options) {
        super(document.querySelector(".form--registration"), options)
    }

    submitHandler(e) {
        e.preventDefault();
        console.log("RegistrationForm submitting!");
    }
}

export { RegisterPage };