class InputDropdown {
    constructor(context) {
        this.context = context;

        this.inputArea = this.context.querySelector(".inputDropdown-wrapper");
        this.inputArea.addEventListener("click", this.inputAreaClickHandler.bind(this));

        this.input = this.context.querySelector(".inputDropdown-el");
        this.fakeInput = this.context.querySelector(".inputDropdown-fakeInput");




        this.isClosed = this.context.classList.contains("inputDropdown--closed");
        this.optionsList = this.context.querySelector(".inputDropdown-list");
        this.options = this.context.querySelectorAll(".inputDropdown-option");

        this.currentOption = -1;

        this.defaulOffset = getComputedStyle(this.optionsList).top;
        this.optionHeight = parseInt(getComputedStyle(this.options[0]).height, 10);

        document.documentElement.addEventListener("click", this.documentClickHandler.bind(this));

        Array.prototype.forEach.call(this.options, (option, index) => {
            option.addEventListener("click", this.optionClickHandler.bind(this, index));
            if(this.input.value === option.getAttribute("data-value")) {
                this.selectOption(index);
            }
        });
    }

    getName() {
        return this.input.name;
    }

    getValue() {
        return this.input.value;
    }

    changeOffset() {
        if(this.currentOption >= 0) {
            this.optionsList.style.top = -this.optionHeight*this.currentOption + "px";
        }
        else {
            this.optionsList.style.top = this.defaulOffset;
        }
    }

    open() {
        this.changeOffset();
        this.context.classList.remove("inputDropdown--closed");
        this.isClosed = false;
    }

    close() {
        this.context.classList.add("inputDropdown--closed");
        this.isClosed = true;
    }

    removeSelection(index) {
        this.options[index].classList.remove("inputDropdown-option--selected");
    }

    addSelection(index) {
        this.options[index].classList.add("inputDropdown-option--selected");
    }

    selectOption(index) {
        if(this.currentOption >= 0)
            this.removeSelection(this.currentOption);

        this.addSelection(index);

        this.input.value = this.options[index].getAttribute("data-value");
        this.fakeInput.innerHTML = this.options[index].innerHTML;
        this.currentOption = index;
    }

    inputAreaClickHandler(e) {
        e.preventDefault();
        e.stopPropagation();

        if(this.isClosed) {
            this.open();
        }
        else {
            this.close();
        }
    }

    optionClickHandler(index, e) {
        e.preventDefault();
        e.stopPropagation();

        this.selectOption(index);
        this.close();
    }

    documentClickHandler() {
        if(!this.isClosed) this.close();
    }
    
    validate() {
        return true;
    }
}

export {InputDropdown};