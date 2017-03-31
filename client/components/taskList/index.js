import {Task} from "../task/index";
import {Permission} from "../../scripts/utils/Permission";

class TaskList {
    constructor(context, options) {
        this.options = Object.assign({}, TaskList.defaults, options);
        
        this.elements = {};

        this.elements.root = TaskList.createTaskList(options);
        this.elements.queue = TaskList.createTaskQueue();

        this.elements.root.appendChild(this.elements.queue);
        context.appendChild(this.elements.root);

        this.context = this.elements.root;
                
        this.setTitle();
        this.initElements();
    }

    static createTaskList(options) {
        const taskList = document.createElement('div');
        taskList.className = TaskList.classes.root;
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
        let index = 1;
        for(let item in this.options.tasks) {
            if(!this.options.tasks.hasOwnProperty(item)) continue;
            
            let task = Task.createElement(index);
            this.elements.queue.appendChild(task);
            
            this.elements[item] = new Task(task, {
                task: this.options.tasks[item],
                draggable: Permission.isTeamLead
            });
        }
    }

    setTitle() {
        this.context.appendChild(TaskList.createTitle(this.options.firstName));
    }
}

TaskList.classes = {
    root: "taskList",
    title: "taskList-title",
    queue: "taskList-queue"
};


TaskList.defaults = {

};

export {TaskList};
