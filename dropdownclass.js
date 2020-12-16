class MyDropDown extends HTMLElement {
                 constructor () {
                     super();
                 }
    
                 connectedCallback() {
                 }
    
                 attributeChangedCallback (attr, oldVal, newVal) {
                     /* console.log("mydropdown.attr", attr); */
                     /* this.dispatchEvent(new CustomEvent('update-term', {bubbles: true, detail: {oldVal: oldVal, newVal: newVal}}), true); */
                 }
    
                 static get observedAttributes() {
                     return ['value'];
                 }
    
                 get _selectedIndex() {
                     return this.children[0].options.selectedIndex
                 }
    
                 get val() {
                     return this.children[0].options[this._selectedIndex].getAttribute('value');
                 }
             }
          customElements.define('my-dropdown', MyDropDown);
    
          function update() {
                 //console.log('update');
                 const mydropdown = document.getElementById('mydropdown');
                 //mydropdown.setAttribute('value', mydropdown.val);
                 //const xajax = document.getElementById('x-ajax');
                 //xajax.setAttribute('url', `https://raw.githubusercontent.com/mimuc/omm-ws1920/master/assignments/04-webcomponents/assignment-statistics-api/${mydropdown.val}.json`);
                 /* xajax.setTerm(mydropdown.val); */
             }
