class Input {
    constructor(context, options) {
        this.context = context;

        if(this.context.classList.contains("input")) {
            this.root = this.context;
        }
        else {
            this.root = document.querySelector(".input");
        }
        
        console.log(this.root) ;
        
        this.input = this.root.querySelector(".input-el");

        this.input.addEventListener("input", this.inputHandler.bind(this));

        this.checkEmptity();
    }
    
    getName() {
        return this.input.name;
    }
    
    getValue() {
        return this.input.value;
    }
    
    checkEmptity() {
        if(this.input.value === "") {
            this.root.classList.add("input--empty");
        }
        else {
            this.root.classList.remove("input--empty");
        }
    }

    inputHandler(e) {
        this.checkEmptity();
    }
    
    focus() {
        this.input.focus();
    }
    
    
}

export { Input };