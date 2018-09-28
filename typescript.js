// class Student {
//   fullName: string;
//   constructor(public firstName, public middleInitial, public lastName) {
//     this.fullName = firstName + " " + middleInitial + " " + lastName;
//     console.log(this.fullName)
//   }
// }
// interface Person {
//   firstName: string;
//   lastName: string;
// }
// function greeter(person : Person) {
//   console.log(person) ;
// }
// let user = new Student("Jane", "M.", "User");
// greeter(user);
var passcode = "secret passcode";
var Employee = /** @class */ (function () {
    function Employee() {
    }
    Object.defineProperty(Employee.prototype, "fullName", {
        get: function () {
            console.log('get==>');
            return this._fullName;
        },
        set: function (newName) {
            console.log('set==>', newName);
            if (passcode && passcode == "secret passcode") {
                this._fullName = newName;
            }
            else {
                console.log("Error: Unauthorized update of employee!");
            }
        },
        enumerable: true,
        configurable: true
    });
    return Employee;
}());
var employee = new Employee();
employee.fullName = "Bob Smith";
if (employee.fullName) {
    console.log(employee.fullName);
}
