import '../src/customElements/aa-session/aa-session.js';
import '../src/customElements/aa-geolocation/aa-geolocation.js';
// var expect = chai.expect;
var assert = chai.assert;
var container;

describe('aa-variable', () => {

    before(function(){
        container = document.querySelector('#container');
        if(!container){
            container = document.createElement('div');
            container.id = "container";
            document.body.appendChild(container);
        }
    });


    beforeEach(function() {
        container.innerHTML = "";
    });

    describe('instance', function () {
        it('should have name and value', function (done) {

            container.innerHTML = html`
            first session:
            <aa-session debug="true" name="test" id="session"> 
                <template>
                    <aa-geolocation id="geo" name="var1" ></aa-geolocation>
                </template>
            </aa-session>`;

            let session = document.querySelector('#session');
            
            // assert(session.getDataDump()['var1']==='val1', 'var1 should exist and have value val1');
            // assert(session.getData('var1')==='val1', 'var1 should exist and have value val1');
            
            
            done();            

        });
        
    })
})


