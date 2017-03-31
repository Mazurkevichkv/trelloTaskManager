import {Task} from "../task/index";
import {Permission} from "../../scripts/utils/Permission";

class TaskList {
    constructor(context, options) {
        this.options = Object.assign({}, TaskList.defaults, options);
        
        this.elements = {};

        this.elements.root = TaskList.createTaskList(this.options);
        this.elements.queue = TaskList.createTaskQueue();
        this.elements.title = TaskList.createTitle(this.options.firstName);

        this.elements.root.appendChild(this.elements.title);
        this.elements.root.appendChild(this.elements.queue);
        context.appendChild(this.elements.root);

        this.context = this.elements.root;
        
        this.initElements();
    }

    static addTask(data) {

    }

    static createTaskList(options) {
        const taskList = document.createElement('div');
        taskList.className = TaskList.classes.root;
        taskList.setAttribute("data-list-index", options.listIndex);
        taskList.setAttribute('id', `${TaskList.classes.root}${options.index}`);
        
        return taskList;
    }

    static  createTaskQueue() {
        const taskQueue = document.createElement('div');
        taskQueue.className = TaskList.classes.queue;
        
        return taskQueue;
    }

    static createTitle (title) {
        const titleElement = document.createElement('h2');
        titleElement.className = TaskList.classes.title;
        titleElement.innerHTML = title;
        return titleElement;
    }

    initElements() {
        for(let item in this.options.tasks) {
            if(!this.options.tasks.hasOwnProperty(item)) continue;
            
            let task = Task.createElement(TaskList.index++);
            this.elements.queue.appendChild(task);

            Task.elements[this.options.tasks[item].id] = new Task(task, {
                task: this.options.tasks[item],
                draggable: Permission.isTeamLead,
                taskIndex: this.options.tasks[item].id
            });
        }
    }
}
TaskList.elements = {};

TaskList.index = 1;

TaskList.classes = {
    root: "taskList",
    title: "taskList-title",
    queue: "taskList-queue"
};

TaskList.modifiers = {
    root: {
        isDropable: "taskList--isDropable"
    }
};

TaskList.defaults = {

};

export {TaskList};
