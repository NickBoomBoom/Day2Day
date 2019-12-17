const handler = {
  set: function (obj, prop, value, receiver) {
    console.log(prop, receiver)
    obj[prop] = value;
  }
};
const proxy = new Proxy({}, handler);
const myObj = {};
Object.setPrototypeOf(myObj, proxy);

myObj.foo = 'bar';



console.log(myObj.foo === myObj, myObj, proxy)