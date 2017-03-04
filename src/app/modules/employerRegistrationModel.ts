export class Employer {
    userRole: String;

    constructor(
        public userName: String = '',
        public fName: String = '',
        public lName: String = '',
        public eMail: String = '',
        public password: String = ''
    ){
        this.userRole = 'employer';
    }

}