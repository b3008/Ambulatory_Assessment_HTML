import BaseElement from '../aa-baseElement/baseElement.js';
import '../aa-choice-item/aa-choice-item.js';

export default class AAMultipleChoice extends BaseElement {

    horizontal_wasChangedInternally__ = false;
    vertical_wasChangedInternally__ = false;




    static get tag() {
        return 'aa-multiple-choice';
    }

    static get properties() {
        return {
            horizontal: {
                type: Boolean,
                value: false,
                userDefined: true
            },

            vertical: {
                type: Boolean,
                value: true,
                userDefined: true
            },

            name: {
                type: String,
                userDefined: true
            },

            value: {
                type: String,
                userDefined: true,

            },

        }
    }

    static get acceptsElements() {
        return [
            'aa-choice-item'
        ]
    }

    static get observedAttributes() {
        return ["horizontal", "vertical"];
    }


    attributeChangedCallback(name, oldValue, newValue) {
        
        
        console.log("attributeChanged :", name, newValue )
        switch (name) {
            case "horizontal":

                if (newValue == "true") {
                    this.style.display = "flex";
                    for (let i = 0; i < this.children.length; i++) {
                        const node = this.children[i];
                        if (node.tagName == 'AA-CHOICE-ITEM') {
                            node.orientation = "vertical";
                        }
                    }
                }
                
                if (this.vertical_wasChangedInternally__) {
                    this.vertical_wasChangedInternally__ = false;
                    return
                }
                this.vertical_wasChangedInternally__ = true;
                if ((newValue === "false") || (!newValue)) {
                    this.vertical = true;

                } else {
                    this.vertical = false;
                }

                // make a horizontal collection of items
                // and set each item to be oriented vertically
                
                return;
            case "vertical":

                if (newValue == "true") {
                    this.style.display = "block";
                    for (let i = 0; i < this.children.length; i++) {
                        const node = this.children[i];
                        if (node.tagName == 'AA-CHOICE-ITEM') {
                            node.orientation = "horizontal";
                        }
                    }
                }

                if (this.vertical_wasChangedInternally__) {
                    this.vertical_wasChangedInternally__ = false;
                    return
                }
                this.horizontal_wasChangedInternally__ = true;
                if ((newValue === "false") || (!newValue)) {
                    this.horizontal = true;
                } else {
                    this.horizontal = false;
                }

                // make a vertical collection of items
                // and set each item to be oriented horizontally
                
                return;

        }
    }
    get staticObject() {
        return AAMultipleChoice;
    }

    get value() {
        return this.getValueOfSelectedItem();
    }

    set value(val) {
        for (let i = 0; i < this.children.length; i++) {
            const node = this.children[i];
            if (node.tagName === 'AA-CHOICE-ITEM') {
                if (node.value !== val) {
                    node.checked = false;
                } else {
                    node.checked = true
                }
            }
        }

    }

    constructor() {
        super();
    }

    updateState(checkedNode) {
        for (let i = 0; i < this.children.length; i++) {
            const node = this.children[i];
            if (node.tagName === 'AA-CHOICE-ITEM') {
                if (node !== checkedNode) {
                    node.checked = false;
                } else {
                    node.checked = true;
                }
            }
        }
    }

    getValueOfSelectedItem() {
        for (let i = 0; i < this.children.length; i++) {
            const node = this.children[i];
            if (node.tagName === 'AA-CHOICE-ITEM') {
                if (node.checked) {
                    return node.value;
                }
            }
        }
    }

    connectedCallback() {

        super.connectedCallback();




        this.value = this.getAttribute("value");

        this.addEventListener("change", (e) => {
            e.stopPropagation();
            this.updateState(e.target)
            this.parentElement.dispatchEvent(new CustomEvent("change", { bubbles: true, detail: { value: this.value } }))
        })

    }




    toJSON() {
        let result = super.toJSON();
        if ((result.horizontal)) {
            result.horizontal = true;
        }
        return result;
    }
}


BaseElement.registerAAElement('aa-multiple-choice', AAMultipleChoice);