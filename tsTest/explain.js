class BaseUI{
  constructor() {
      console.log('this',this)
      this.init();
      console.log('this.name',this.name)
  }
  init() {
      console.log('base init');
  };
  render() {
      console.log('base render');
  };
}

class TestUI extends BaseUI{
  name = 'init';

  init() {
      super.init();
      console.log('test init');

      this.name = 'TestUI';

      console.log('-----name1', this, this.name);
  };
  render() {
      console.log(this.name)
      super.render();
      console.log('test render');
      
      console.log('-----name2', this, this.name);
  };
}

const ui = new TestUI();
ui.render();