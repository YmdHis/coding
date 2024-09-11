class BaseUI{
   constructor() {
       this.init();
   }
   init() {
       console.log('base init');
   };
   render() {
       console.log('base render');
   };
}

class TestUI extends BaseUI{
   private name = '';

   init() {
       super.init();
       console.log('test init');

       this.name = 'TestUI';

       console.log('-----name1', this.name);
   };
   render() {
       super.render();
       console.log('test render');
       
       console.log('-----name2', this.name);
   };
}

const ui = new TestUI();
ui.render();