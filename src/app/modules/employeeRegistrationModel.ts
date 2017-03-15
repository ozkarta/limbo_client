export class Employee {
    userRole: String;


    constructor(
        public userName: String = '',
        public fName: String = '',
        public lName: String = '',
        public eMail: String = '',
        public password: String = '',
        public employeeType: String = '',
        public businessName: String = '',
        public controlNumber: String = '',
        public businessType: String = '',
        public principalOfficeAddress: String = '',
        public registrationDate: String = '',
        public directorFName: String = '',
        public directorLName: String = ''
    ){
        this.userRole = "employee";
    }
}

export class Individual extends Employee{
    constructor(){
        super();
        this.employeeType = 'individual';
    }
}
export class Company extends Employee{
    constructor(){
        super();
        this.employeeType = 'company';
    }

}