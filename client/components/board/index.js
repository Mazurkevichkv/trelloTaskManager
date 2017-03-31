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
        
        request.send()
            .then((response) => {
                console.log(response);
                this.queue = response.queue;
                this.tasksLists = response.developers;
                this.initQueue(response.queue);
                this.initElements(response.developers);
            }).catch((error) => {
                console.log("Error: " + error);
            })
            
    }

    initElements(boards) {
        let index = 1;
        for(let item in boards) {
            if(!boards.hasOwnProperty(item)) continue;
            
            let bl = Board.createBoardList(index);
            
            this.board.main.appendChild(bl);

            console.log(this.board.main, bl);
            this.elements[item] = new TaskList(document.querySelector(`#${Board.classes.list}${index}`), { 
                tasks: boards[item].tasks, 
                firstName: boards[item].firstName, 
                index: index++
            });
        }
    }

    initQueue (tasks) {
        this.elements[0] = new TaskList(this.board.queue, {
            tasks: tasks, 
            firstName: 'Queue',
            index: 0
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
