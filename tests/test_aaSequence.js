import '../src/aa-sequence/aa-sequence.js';
import '../src/aa-session/aa-session.js';
import '../src/aa-screen/aa-screen.js';
// var expect = chai.expect;
var assert = chai.assert;
var container;

describe('aa-sequence', () => {

    before(function () {
        container = document.querySelector('#container');
        if (!container) {
            container = document.createElement('div');
            container.id = "container";
            document.body.appendChild(container);
        }
    });

    beforeEach(function () {
        container.innerHTML = "";
    });

    describe('instance', function () {
        xit('should find sequence and run next', function (done) {

            container.innerHTML = html`
            first session:
            <aa-session debug="true" name="test" id="session"> 
                  
                <template>
                    <aa-sequence id="sequence">textBefore1
                    
                        <aa-screen id="screen1" name="first">
                                <div>screen1</div>
                        </aa-screen>textBefore2

                        <aa-screen id="screen2" name="second">
                                <div>screen2</div>
                        </aa-screen>textAfter2

                    </aa-sequence>

                  
                </template>

            </aa-session>`;

            let session = document.querySelector('#session');
            let sequence = document.querySelector("#sequence");
            debugger;
            // let screen1 = document.querySelector("#screen1");
            // let screen2 = document.querySelector("#screen2");
            // assert(screen1 != null, "screen1 should not be null");
            // assert(screen2 == null, "screen2 should be null");
            // sequence.next();
            // screen2 = document.querySelector("#screen2");
            // assert(screen2 != null, "screen2 should not be null after calling next");

            done();

        });


        xit('jumps backwards', (done) => {
            container.innerHTML = '';
            
            container.innerHTML = html`
             session:
            <aa-session debug="true" name="test" id="session"> 
                  
                <template>

                    <aa-sequence id="sequence">
                    
                        <aa-screen id="screen1" name="first">
                                <div>screen1</div>
                        </aa-screen>

                        <aa-screen id="screen2" name="second">
                                <div>screen2</div>
                        </aa-screen>

                        <aa-jump goto="first" name="jump"></aa-jump>
                    </aa-sequence>

                  
                </template>

            </aa-session>`;

            let session = document.querySelector('#session');
            let sequence = document.querySelector("#sequence");
            let screen1 = document.querySelector("#screen1");
            let screen2 = document.querySelector("#screen2");
        
            assert(sequence.currentNode.name=="first", "currentNode should be named first");
            sequence.next();
            assert(sequence.currentNode.name=="second", "currentNode should be named second");
            sequence.next();
            assert(sequence.currentNode.name=="first", "currentNode should be named first");
            sequence.next();
            assert(sequence.currentNode.name=="second", "currentNode should be named second");
            sequence.next();
            
            done();
        })

        xit('jumps forwards', (done) => {
            container.innerHTML = '';
            
            container.innerHTML = html`
             session:
            <aa-session debug="true" name="test" id="session"> 
                  
                <template>

                    <aa-sequence id="sequence">
                    
                        <aa-screen id="screen1" name="first">
                                <div>screen1</div>
                        </aa-screen>

                        <aa-screen id="screen1" name="second">
                                <div>screen2</div>
                        </aa-screen>

                        <aa-jump goto="first" name="jump"></aa-jump>
                    </aa-sequence>

                  
                </template>

            </aa-session>`;

            let session = document.querySelector('#session');
            let sequence = document.querySelector("#sequence");
            let screen1 = document.querySelector("#screen1");
            let screen2 = document.querySelector("#screen2");
        
            assert(sequence.currentNode.name=="first", "currentNode should be named first");
            sequence.next();
            assert(sequence.currentNode.name=="second", "currentNode should be named second");
            sequence.next();
            assert(sequence.currentNode.name=="first", "currentNode should be named first");
            sequence.next();
            assert(sequence.currentNode.name=="second", "currentNode should be named second");
            sequence.next();
            
            done();
        })




    })
})


