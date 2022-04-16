import BaseElement from '../aa-baseElement/baseElement.js';
export default class AAChoiceItem extends BaseElement {

    kind = "radioButton";

    item = null;
    itemBlock = document.createElement('div');
    label = document.createElement('div');


    static get tag() {
        return 'aa-choice-item';
    }

    static get properties() {
        return {
            value: {
                type: String,
                userDefined: true
            },

            checked: {
                type: Boolean,
                value: false
            }
        }
    }
    static get observedAttributes() {
        return [
            'name',
        ];
    }

    static get acceptsElements() {
        return ["#text"];
    }



    _orientation = "vertical"

    set orientation(val) {
        this._orientation = val;
        if (val == "vertical") {
            this.itemBlock.style.flexDirection = "column";
            this.label.classList.add("label-vertical");
            this.label.classList.remove("label-horizontal");
        } else if (val == "horizontal") {
            this.itemBlock.style.flexDirection = "row";
            this.label.classList.remove("label-vertical");
            this.label.classList.add("label-horizontal");
        }
        return;
    }

    get orientation() {
        return this._orientation;
    }




    get checked() {
        if (this.item) return this.item.checked;
    }

    set checked(val) {
        if (this.item) this.item.checked = eval(val);
    }

    get value() {
        const v = this.getAttribute('value')
        const val = v ? v : this.innerHTML.trim();
        return val;
    }



    set value(val) {
        this.setAttribute('value', val);
    }



    constructor() {
        super();
        this.root = this.attachShadow({ mode: 'open' });
        this.root.innerHTML = this.css;

    }

    connectedCallback() {
        super.connectedCallback();
    
        this.slot = document.createElement('slot');
        this.label.innerHTML= `<slot></slot>`;

        if (this.parentElement.tagName === 'AA-CHECKBOXES') {
            this.kind = "checkBox"
        }

        if (this.parentElement.value === this.value) {
            this.checked = true;
        }


        if (this.kind == "radioButton") {
            if(this.item){
                this.item.remove();
            }
            this.item = document.createElement('paper-radio-button');
            this.item.style.display = "block"
            this.item.checked = this.checked;
            this.label.addEventListener("click", () => {
                this.item.checked = true;
                this.dispatchEvent(new CustomEvent("change", { bubbles: true }))
            })

            this.itemBlock.appendChild(this.item);
            this.itemBlock.appendChild(this.label);
            this.root.appendChild(this.itemBlock);

            this.item.shadowRoot.querySelector("#radioLabel").remove();
       


        } else {
            if(this.item){
                this.item.remove();
            }
            this.item = document.createElement('paper-checkbox');
            this.item.style.display = "block"
            this.item.checked = this.checked;
            this.label.addEventListener("click", () => {
                this.item.checked = !this.item.checked;
                this.checked = this.item.checked;
                this.dispatchEvent(new CustomEvent("change", { bubbles: true }))
            })

            this.itemBlock.appendChild(this.item);
            this.itemBlock.appendChild(this.label);
            this.root.appendChild(this.itemBlock);

        }


        this.label.classList.add("label-horizontal");
        

        this.itemBlock.style.display = "flex";
        this.itemBlock.style.alignItems = "center";
        this.itemBlock.style.padding = "10px";

    }



    get css() {
        return html`<style>
            :host{
                cursor:pointer;
                font-family:Roboto;
            }
            :host(:focus) {
                 outline: none;
            }

            .label-horizontal{
                padding-left:10px;
            }
            
            .label-vertical{
                padding-top:10px;
            }
            
            

            
        paper-radio-button {
            
            user-select:none;
            display: block;
        }
        </style>`;
    }

    toJSON() {
        let result = super.toJSON();
        return result;
    }
}

BaseElement.registerAAElement('aa-choice-item', AAChoiceItem);