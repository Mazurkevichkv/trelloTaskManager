import {InputDropdown} from "../inputDropdown/index";
import {InputText} from "../inputText/index";
import {InputTextarea} from "../inputTextarea/index";
import {Input} from "../input/index";

class Form {
    constructor(context, options) {
        this.context = context;
        this.options = options || {};

        let inputElements = this.context.querySelectorAll(".input");

        if(inputElements) {
            this.inputs = Array.prototype.map.call(
                inputElements,
                (element) => {
                    if(element.classList.contains("inputDropdown")) {
                        return new InputDropdown(element);
                    }

                    if(element.classList.contains("inputText")) {
                        return new InputText(element);
                    }

                    if(element.classList.contains("inputTextarea")) {
                        return new InputTextarea(element);
                    }

                    return new Input(element);
                }
            );
        }

        this.context.addEventListener("submit", this.submitHandler.bind(this));
    }

    submitHandler(e) {
        e.preventDefault();
        console.log("Submitting!");
    }
}

export {Form};