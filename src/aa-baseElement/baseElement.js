
window.html = function (txt, ...val) {

    let result = txt[0];
    for (let i = 0; i < val.length; i++) {
        result += val[i];
        result += txt[i + 1];
    }
    return result;
}

export default class BaseElement extends HTMLElement {


    constructor() {
        super();
        this._props = this.makePropertiesFromAttributes();
    }

    connectedCallback() {
        this._attachedTimestamp = new Date().getTime();
    }


    makePropertiesFromAttributes() {
        
        let ElementClass = customElements.get(this.tagName.toLowerCase());

        let attr = ElementClass.observedAttributes;
        if (!attr) return null;
        let props = {};
        for (let i = 0; i < attr.length; i++) {
            let prop = this.toCamelCase(attr[i]);
            props[prop] = attr[i];


            if (typeof this[prop] != 'undefined') {
                // console.log(prop, this[prop]);
                continue;
            } else {
                // console.log('defining property for ', prop);
                Object.defineProperty(this, prop, {
                    get: () => {
                     
                        let result = this.getAttribute(attr[i]);
                        if (result === 'true') { return true; }
                        else if (result === 'false') { return false; }
                        else { return result; }
                    },
                    set: (value) => {
                        this.setAttribute(attr[i], value);
                    }
                });
            }
        }
        return props;
    }

    // setAttributes(){
    //     let propKeys = Object.keys(this._props)
    //     for(let i=0; i<propKeys.length; i++){
    //         let p = this._propKeys[i];
    //         if(this[p]){
    //             this.setAttribute(this._props[p])
    //         }
    //     }
    // }
    toCamelCase(str) {
        let words = str.split('-');
        let result = words[0];
        for (let i = 1; i < words.length; i++) {
            result += words[i][0].toUpperCase() + words[i].substr(1);
        }
        return result;
    }

    toHyphenated(str) {
        let result = '';
        for (let i = 0; i < str.length; i++) {
            let letter = str[i];
            if (letter.toLowerCase() !== letter) {
                // letter is uppercase
                result += `-${letter.toLowerCase()}`;
            } else {
                result += letter;
            }
        }
        return result;
    }

    _analyzeChildNodesForElement(element) {
        // console.log(element, 'isAAElement=', this._isAAElement(element))
        if (this._isAAElement(element)) {
            this._replaceElementWithHolder(element);
        }
        else for (let i = 0; i < element.childNodes.length; i++) {
            if (this._isAAElement(element.childNodes[i])) {
                this._replaceElementWithHolder(element.childNodes[i])
            } else {
                this._analyzeChildNodesForElement(element.childNodes[i]);
            }
        }

    }


    _isAAElement(element) {

        if (AANodeNames.indexOf(element.nodeName) != -1) {
            return true;
        }
        return false;
    }

    _isHolder(element) {
        if (element.tagName == 'AA-HOLDER') {
            return true;
        }
        return false;
    }



    _restoreHeldNodes(element) {

        let childNodes = element.childNodes;
        for (let i = 0; i < childNodes.length; i++) {
            let child = childNodes[i];
            if (this._isHolder(child)) {

                //before restoring, strip element of ema- content
                // this.analyzeChildNodesForElement(child.heldElement);
                this._replaceHolderWithElement(child);
            }
            else if (child.childNodes.length > 0) {
                this._restoreHeldNodes(child);
            }
        }
    }


    _replaceElementWithHolder(element) {


        let holder = document.createElement("aa-holder");
        holder.id = element.getAttribute("name") + "-holder";
        holder.heldElementOuterHTML = element.outerHTML;

        // holder.innerHTML = "holder for " + element.nodeName + " with name " + element.getAttribute("name")
        // console.log("replacing", element, "with", holder);

        holder.heldElement = element.cloneNode(false);
        //holder.heldElement.innerFragment = document.createRange().createContextualFragment(element.innerHTML);
        holder.heldElement.innerFragment = this._createFragmentForElement(element);

        element.replaceWith(holder);
        return holder;
    }
    _replaceHolderWithElement(holder) {

        holder.replaceWith(holder.heldElement);
        return holder.heldElement;
    }

    _createFragmentForElement(element) {

        let fragment = document.createDocumentFragment();
        //  first get references to the children,
        //  because the element.children array will be modified as they are appended elsewhere
        let childNodes = [];
        for (let i = 0; i < element.childNodes.length; i++) {
            childNodes.push(element.childNodes[i]);
        }
        // the append each child to the fragment
        for (let i = 0; i < childNodes.length; i++) {
            fragment.appendChild(childNodes[i])
        }
        return fragment;
    }

    _dispatchDebugEvent(detail) {
        if (this._debug) {
            this.dispatchEvent(new CustomEvent('debug', { detail, bubbles:true }));
        }
    }

    _dispatchAssignableEnd() {
        let assignableEndEvent = new CustomEvent('assignableEnd', { bubbles: true });
        this.dispatchEvent(assignableEndEvent);
    }

    _getParentSession(){
        let _sessionElement = this;
        while ((_sessionElement != null) && (_sessionElement.nodeName != 'AA-SESSION')) {
            _sessionElement = _sessionElement.parentNode;
        }
        return _sessionElement;
    }

}

if (!customElements.get('aa-base-element')) {

    if (typeof window.AANodeNames === 'undefined') { window.AANodeNames = []; }
    window.AANodeNames.push('AA-BASE-ELEMENT');

    customElements.define('aa-base-element', BaseElement);
}