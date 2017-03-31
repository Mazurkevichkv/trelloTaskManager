import {Permission} from '../../scripts/utils/Permission'
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

    static createTitle (title) {
        const el = document.createElement('h3');
        el.className = Task.classes.taskTitle;
        el.innerHTML = title;
        return el;
    }

    static createDescription (text) {
        const el = document.createElement('p');
        el.className = Task.classes.taskDescription;
        el.innerHTML = text;
        return el;
    }

    static createCheck () {
        const el = document.createElement('span');
        el.className = Task.classes.taskCheck;
        return el;
    }

    initElements() {
        this.context.appendChild(Task.createTitle(this.options.task.title));
        this.context.appendChild(Task.createDescription(this.options.task.text));
        this.context.appendChild(Task.createCheck());

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
        if (!Permission.isTeamLead) {
            return;
        }
        document.addEventListener("dragstart", this.dragStartHandler);
        document.addEventListener("dragover", this.dragOverHandler);
        document.addEventListener("drop", this.dropHandler);
    }
    
    dragStartHandler(e) {
        e.dataTransfer.setData("text", e.target.id);
    }

    dragOverHandler(e) {
        e.preventDefault();
    }
    
    dropHandler(e) {
        const container = Task.findContainer(e.target);
        if (!container) return;
        e.preventDefault();
        var data = e.dataTransfer.getData("text");
        container.appendChild(document.getElementById(data));
    }

    static findContainer (el) {
        if (el === null) return;
        return el.className === 'taskList-queue' ? el : Task.findContainer(el.parentElement);
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