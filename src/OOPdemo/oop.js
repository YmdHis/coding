function foo (){
  const _isClass = this instanceof foo;
  if(!_isClass){
    return new foo()
  }
  this.name = 'cxh'
}

const fun = foo()

function Foo (){}

const fun = new Foo()