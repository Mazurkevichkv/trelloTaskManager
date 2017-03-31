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
            }).catch((error) => {
            console.log("Error: " + error);
            }).then(() => {
                this.initQueue(this.queue);
                this.initElements(this.tasksLists);
            });

            
    }

    initElements(boards) {
        for(let item in boards) {
            if(!boards.hasOwnProperty(item)) continue;
            
            let bl = Board.createBoardList(Board.index);
            
            this.board.main.appendChild(bl);
            
            TaskList.elements[item] = new TaskList(bl, {
                tasks: boards[item].tasks, 
                firstName: boards[item].firstName, 
                index: Board.index,
                listIndex: item,
                userId: boards[item].id
            });

            Board.index++;
        }
    }

    initQueue (tasks) {
        TaskList.elements["queue"] = new TaskList(this.board.queue, {
            tasks: tasks, 
            firstName: 'Queue',
            index: 0,
            listIndex: "queue",
            list: ""
        });
    }
}

Board.index = 1;

Board.defaults = {

};

Board.classes = {
    root: 'board',
    main: 'board-main',
    queue: 'board-queue',
    list: 'board-list'
};

export {Board};
