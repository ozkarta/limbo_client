import { Component,OnInit } from '@angular/core';
import { SearchModel } from '../../modules/models/search.model';
import { JobCategory } from '../../modules/models/job-category';
import { GenericService } from '../../modules/http/generic.service';
import { JobPost } from '../../modules/models/job'

@Component({
  selector: 'app-root',
  templateUrl: '../../views/employee/home.component.html',
  styleUrls: ['../../styles/employee/home.style.css']
})
export class EmployeeHomeComponent extends OnInit{
  title = 'app works!';

  searchModel: SearchModel;
  jobCategory: JobCategory[];
  subCategory: JobCategory[];
  categorySelected: boolean;
  jobList: JobPost[];

  constructor(private genericService: GenericService){

    
    super();


    console.log('constructor ivnoked......');
    this.searchModel = new SearchModel();
    this.jobCategory = [];
    this.subCategory = [];
    this.jobList = [];
    this.categorySelected = false;
    

    this.genericService.getCategoryList()
                        .subscribe(
                          (res) =>{
                              this.jobCategory = res;
                          },
                          (err) =>{
                            console.dir(err);
                          });

    this.onSubmit();

  }


  ngOnInit(){
    console.log('!!!!!!!!!!  INIT');
  }

  onChange(newValue: any){
    console.log('select changed');
    console.dir(newValue);


    if  (newValue){
      this.categorySelected =true;
     

      for (let cat of this.jobCategory ){

        if (cat.id === newValue){
          console.dir(cat.subCategory);
          this.subCategory = cat.subCategory as Array<JobCategory> ;
          this.searchModel.category = newValue;
        }
      }
    }else{
      this.searchModel.category = '';
      this.categorySelected = false;
    }
    
  }

  subCategoryChanged(val: any){
    if (val){
      this.searchModel.subCategory = val;
    }else{
      this.searchModel.subCategory = '';
    }
  }

  onSubmit(){
    let user = JSON.parse(localStorage.getItem('currentUser'));
    if(user){
      this.searchModel.owner = user._id;
    }
    console.dir(this.searchModel);

    this.genericService.searchForJob(this.searchModel)
                        .subscribe(
                          (res) =>{
                            this.jobList = res;
                            console.dir(res);
                          },
                          (err) =>{
                            console.dir(err);
                          }
                        )
  }
  


}
