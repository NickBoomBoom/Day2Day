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


let passcode = "secret passcode";

class Employee {
    private _fullName: string;

    get fullName(): string {
        console.log('get==>')
        return this._fullName;
    }

    set fullName(newName: string) {
      console.log('set==>',newName)
        if (passcode && passcode == "secret passcode") {
            this._fullName = newName;
        }
        else {
            console.log("Error: Unauthorized update of employee!");
        }
    }
}

let employee = new Employee();
employee.fullName = "Bob Smith";
if (employee.fullName) {
    console.log(employee.fullName);
}