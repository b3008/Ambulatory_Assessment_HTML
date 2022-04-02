export default class AAVariable extends BaseElement {
    static get tag(): string;
    static get properties(): {
        name: {
            type: StringConstructor;
            userDefined: boolean;
        };
        value: {
            /**
             * string values should be given in quotes, e.g.,
             * <aa-variable name="myString" value="'myStringValue'"></aa-variable>
             * Here 'myStringValue' is passed to the value attribute in single quotes
             *
             * otherwise it will try to find a named variable, e.g.,
             * <aa-variable name="myOtherSring" value="'myStringValue'"></aa-variable>
             * <aa-variable name="myString" value="myOtherString"></aa-variable>
             * Here the value will be the same value as a variable with name="myOtherString"
             *
             */
            type: StringConstructor;
            userDefined: boolean;
        };
    };
    static get acceptsElements(): any[];
    static get observedAttributes(): string[];
    evaluateValueExpression(test: any): any;
    replaceExpressionIdentifiersWithValues(expression: any, memoryElement: any): any;
}
import BaseElement from "./../aa-baseElement/baseElement.js";
//# sourceMappingURL=aa-variable.d.ts.map