import {Task} from "../task/index";
import {Permission} from "../../scripts/utils/Permission";

class TaskList {
    constructor(context, options) {
        this.options = Object.assign({}, TaskList.defaults, options);
        
        this.elements = {};

        context.appendChild(TaskList.createTaskList(options));

        this.context = context.querySelector(`#${TaskList.classes.root}${options.index}`);
        this.elements.root = this.context;

        this.setTitle();
        this.initElements();
    }

    static createTaskList(options) {
        const taskList = document.createElement('div');
        taskList.className = TaskList.classes.root;
        taskList.setAttribute('id', `${TaskList.classes.root}${options.index}`);

        return taskList;
    }

    static createTitle (title) {
        const titleElement = document.createElement('h2');
        titleElement.className = TaskList.classes.title;
        titleElement.innerHTML = title;
        return titleElement;
    }

    initElements() {
        let index = 1;
        for(let item in this.options.tasks) {
            if(!this.options.tasks.hasOwnProperty(item)) continue;
            
            let task = Task.createElement(index);
            this.context.appendChild(task);
            this.elements[item] = new Task(task, {
                task: this.options.tasks[item],
                draggable: Permission.isTeamLead()
            });
        }
    }

    setTitle() {
        this.context.appendChild(TaskList.createTitle(this.options.firstName));
    }
}

TaskList.classes = {
    root: "taskList",
    title: "taskList-title"
};


TaskList.defaults = {

};

export {TaskList};
