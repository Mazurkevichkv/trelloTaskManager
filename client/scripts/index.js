import {Popup} from "../components/popup/index";
import {Form} from "../components/forms/form/index";
import {Board} from "../components/board/index";
import {Request} from "./utils/Request";
import {Permission} from "./utils/Permission";

class IndexPage {
    constructor() {
        this.permissionsMap = new Permission();
        
        this.addTaskBtn = document.querySelector(".button--addTask");
        
        this.permissionsMap.getUserRole().then(()=> {
            this.addTaskPopup = new Popup(document.querySelector(".popup--addTask"));
            this.addTaskForm = new FormAddTask({}, this.addTaskPopup.close);

            this.board = new Board(document.querySelector(".board"));

            if (Permission.isProductOwner) {
                this.addTaskBtn.hidden = false;
                this.addTaskBtn.addEventListener("click", this.addTaskBtnClickHandler.bind(this));
            }
        });

        
    }

    addTaskBtnClickHandler() {
        this.addTaskPopup.open();
    }
    
    static run() {
        IndexPage.instance = new IndexPage();
    }
    
    static getInstance() {
        return IndexPage.instance;
    }
}

class FormAddTask extends Form {
    constructor(options, popupClose) {
        super(document.querySelector(".form--addTask"), options);
        
        this.request = new Request("/rest/task/form", "GET", {
            "Content-type": "application/json"
        });
        
        this.popupClose = popupClose;
    }
    
    getData() {
        let data = {};
        this.inputs.forEach((item) => data[item.getName()] = item.getValue());
        return data;
    }

    submitHandler(e) {
        e.preventDefault();
        
        this.request.send(this.getData())
            .then((response) => {
                console.log(response);
                this.popupClose();
            })
            .catch((error) => {
                console.log("Error: " + error);
            });
        
        console.log("FormAddTask submitting!");
    }
}

export { IndexPage };