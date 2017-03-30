class Task {
    constructor(context, options) {
        this.context = context;
        this.options = Object.assign({}, Task.defaults, options);

        this.elements = {};

        this.elements.root = this.context;

        if(!this.context.classList.contains(Task.classes.root)) {
            this.elements.root = this.context.querySelector("." + Task.classes.root);
        }

        if(!this.elements.root) {
            throw new Error("Context " + this.context + " has no ." + Task.classes.root + " element");
        }

        this.initElements();
        this.initHandlers();

        if(this.options.draggable) {
            this.elements.root.setAttribute("draggable", "true");
        }
    }

    static createElement (index) {
        const div = document.createElement('div');
        let id = `${Task.classes.root}${index}`;
        div.setAttribute('id', id);
        div.className = Task.classes.root;
        return div;
    }

    initElements() {
        for(let item in Task.classes) {
            if(!Task.classes.hasOwnProperty(item)) continue;

            if(item === "root") continue; // root element is already initialized

            this.elements[item] = this.elements.root.querySelector("." + Task.classes[item]);
            if(!this.elements[item]) {
                console.log(item + " is not found.");
            }
        }

    }
    
    changeStatus() {
        
    }

    initHandlers() {
        this.elements.root.addEventListener("dragstart", this.dragStartHandler.bind(this));
        this.elements.root.addEventListener("dragover", this.dragOverHandler.bind(this));
        this.elements.root.addEventListener("drop", this.dropHandler.bind(this));
    }
    
    dragStartHandler(e) {
        this.options.onDragStart(this);
    }

    dragOverHandler(e) {
        e.preventDefault();
        this.options.onDragOver(this);
    }
    
    dropHandler(e) {
        this.options.onDrop(this);
    }
}

Task.defaults = {
    draggable: true,
    onDragStart: function () {},
    onDragOver: function () {},
    onDrop: function () {}
};

Task.classes = {
    root: "task",
    taskCheck: "task-check",
    taskTitle: "task-title",
    taskDescription: "task-description"
};

export {Task};