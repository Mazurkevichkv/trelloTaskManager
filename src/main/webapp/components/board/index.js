import {Request} from "../../scripts/utils/Request";
import {BLACKBOARD} from "../../scripts/mocks/mock";
import {TaskList} from "../taskList/index";

class Board {
    constructor(context, options) {
        this.context = context;
        this.options = Object.assign({}, Board.defaults, options);

        this.elements = {};
        this.elements.root = this.context;

        this.board = {};
        this.board.main = this.elements.root.querySelector(`.${Board.classes.main}`);
        this.board.queue = this.elements.root.querySelector(`.${Board.classes.queue}`);
        this.loadElements();
    }

    static createBoardList (index) {
        const div = document.createElement('div');
        let id = `${Board.classes.list}${index}`;
        div.setAttribute('id', id);
        div.className = Board.classes.list;
        return div;
    }

    loadElements() {
        const request = new Request("/rest/blackboard", "GET");
        
        const auth = new Request("/login_check", "POST");
        
        console.log(location.protocol+'//'+location.hostname+(location.port ? ':'+location.port: ''));
        
        request.send()
            .then((response) => {
                 this.queue = response.queue;
                 this.tasksLists = response.developers;
                 this.initQueue();
                 this.initElements();
            }).catch((error) => {
                console.log("Error: " + error);
            })
            
    }

    initElements() {
        let index = 1;
        for(let item in this.tasksLists) {
            if(!this.tasksLists.hasOwnProperty(item)) continue;
            
            this.board.main.appendChild( Board.createBoardList(index) );
            this.elements[item] = new TaskList(document.querySelector(`#${Board.classes.list}${index}`), { 
                tasks: this.tasksLists[item].tasks, 
                firstName: this.tasksLists[item].firstName, 
                index: index++
            });
        }
    }

    initQueue () {
        this.elements[0] = new TaskList(this.board.queue, {
            tasks: this.queue, 
            firstName: 'Queue', index: 0
        });
    }

    initUserTasks () {
        for(let item in this.queue) {
            if(!this.queue.hasOwnProperty(item)) continue;
            
            const div = document.createElement('div');
            div.className = 'board-list';
            this.board.main.appendChild( div );
            this.elements[item] = new TaskList(div);
        }
    }

    initHandlers() {
        //this.elements.closeBtn.addEventListener("click", this.closeBtnClickHandler.bind(this));
    }
}

Board.defaults = {

};

Board.classes = {
    root: 'board',
    main: 'board-main',
    queue: 'board-queue',
    list: 'board-list'
};

export {Board};
