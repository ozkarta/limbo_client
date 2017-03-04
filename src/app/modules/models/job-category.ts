export class JobCategory{

    id: String;
    categoryVarName: String;
    type: String;
    subCategory: JobCategory[];

    constructor(){
        this.id = '';
        this.categoryVarName = '';
        this.type = '';
        this.subCategory = [];
    }
}