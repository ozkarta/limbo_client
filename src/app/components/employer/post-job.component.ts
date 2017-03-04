import { Component,OnInit } from '@angular/core';

import { CategoryService ,JobService} from '../../modules/http/employer.service';
import { JobCategory } from '../../modules/models/job-category';
import {  JobPost } from '../../modules/models/job';

@Component({
  selector: 'app-root',
  templateUrl: '../../views/employer/post-job.component.html',
  styleUrls: ['../../styles/employer/post-job.style.css']
})
export class EmployerPostJobComponent extends OnInit{
  title = 'app works!';
  jobCategory: JobCategory[];
  subCategory: JobCategory[];

  categorySelected: boolean;
  jobPost: JobPost;

  constructor(private categoryService: CategoryService,private jobService: JobService){

    super();
    this.jobCategory=[] ;
    this.subCategory = [];
    this.categorySelected = false;
    this.jobPost = new JobPost();
  }

  ngOnInit(){
    this.categoryService.getCategoryList().subscribe(
                          res => {
                            console.log('Category List Recieved....');
                            console.dir(res);
                            this.jobCategory = res as Array<JobCategory>;
                            console.dir(this.jobCategory);
                          },
                          err => {
                            console.dir(err);
                          }
                        );
    console.log('initialized   .....');
  }
  onSubmit(){
      console.log('submitted');
      console.dir(this.jobPost);
      let user = JSON.parse(localStorage.getItem('currentUser'));
      console.dir(user);
      this.jobPost.owner = user._id;
      this.jobService.postNewJob(this.jobPost)
                      .subscribe(
                        res =>{
                          console.dir(res);
                        },
                        err =>{
                          console.dir(err);
                        }
                      )
  }
  onChange(newValue: any){
    console.log('select changed');
    console.dir(newValue);


    if  (newValue){
      this.categorySelected =true;
      this.jobPost.jobCategory = newValue;


      for (let cat of this.jobCategory ){

        if (cat.id === newValue){
          this.subCategory = cat.subCategory as Array<JobCategory> ;
        }
      }
    }else{
      this.categorySelected = false;
      this.jobPost.jobCategory = '';
    }
    
  }

  subCategoryChanged(value:any){
    if (value){
      this.jobPost.jobSubCategory = value;
    }else{
      this.jobPost.jobSubCategory = '';
    }
  }
}
