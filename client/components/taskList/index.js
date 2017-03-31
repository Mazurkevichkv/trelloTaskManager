import {Task} from "../task/index";

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

    static createTitle () {
        const title = document.createElement('h2');
        title.className = TaskList.classes.title;
        title.innerHTML = TaskList.defaults.firstName;
        return title;
    }

    initElements() {
        let index = 1;
        for(let item in this.options.tasks) {
            if(!this.options.tasks.hasOwnProperty(item)) continue;
            
            this.context.appendChild( Task.createElement(index) );
            this.elements[item] = new Task(document.querySelector(`#task${index++}`), {task: TaskList.defaults.tasks[item]});
        }
    }

    setTitle() {
        this.context.appendChild(TaskList.createTitle());
    }
}

TaskList.classes = {
    root: "taskList",
    title: "taskList-title"
};


TaskList.defaults = {

};

export {TaskList};
