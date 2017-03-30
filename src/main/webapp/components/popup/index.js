class Popup {
    constructor(context, options) {
        this.context = context;
        this.options = Object.assign(Popup.defaults, options);

        this.elements = {};
        
        this.elements.root = this.context;
        
        if(!this.context.classList.contains(Popup.classes.root)) {
            this.elements.root = this.context.querySelector("." + Popup.classes.root);
        }
        
        if(!this.elements.root) {
            throw new Error("Context " + this.context + " has no ." + Popup.classes.root + " element");
        }
        
        this.initElements();
        this.initHandlers();
    }
    
    initElements() {
        for(let item in Popup.classes) {
            if(!Popup.classes.hasOwnProperty(item)) continue;
            
            if(item === "root") continue; // root element is already initialized
            
            this.elements[item] = this.elements.root.querySelector("." + Popup.classes[item]);
            if(!this.elements[item]) {
                console.log(item + " is not found.");
            }
        }
        
    }
    
    initHandlers() {
        this.elements.closeBtn.addEventListener("click", this.closeBtnClickHandler.bind(this));
    }

    open() {
        this.onBeforeOpen();
        
        this.elements.root.classList.remove(Popup.classes.root + Popup.modifiers.root.isClosed);

        this.onAfterOpen();
    }

    close() {
        this.onBeforeClose();

        this.elements.root.classList.add(Popup.classes.root + Popup.modifiers.root.isClosed);

        this.onAfterClose();
    }

    closeBtnClickHandler(e) {
        e.preventDefault();
        this.close();
    }

    onBeforeClose() {

    }

    onAfterClose() {

    }

    onBeforeOpen() {

    }

    onAfterOpen() {

    }
}

Popup.classes = {
    root: "popup",
    window: "popup-window",
    closeBtn: "popup-closeBtn",
};

Popup.modifiers = {
    root: {
        isClosed: "--isClosed"
    }
};

Popup.defaults = {
    
};

export {Popup};