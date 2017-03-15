import { Component,OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


import { JobService, CategoryService} from '../../modules/http/employer.service';
import {  JobPost } from '../../modules/models/job';

import { JobCategory } from '../../modules/models/job-category';

@Component({
  templateUrl: '../../views/employer/edit-job.component.html',
  styleUrls: ['../../styles/employer/edit-job.style.css']
})
export class EditJobComponent extends OnInit{
  title = 'app works!';
  jobPost: JobPost;

  jobCategory: JobCategory[];
  subCategory: JobCategory[];

  categorySelected: boolean;


  constructor(private route: ActivatedRoute,
              private jobService: JobService,
              private categoryService: CategoryService,
              private router: Router
  ){
      super();

      this.jobPost = new JobPost();
      this.jobCategory = [];
      this.subCategory = [];
      this.categorySelected = false;
  }

  ngOnInit(){
    console.log('asdasdasdasdasd');
    console.dir(this.jobPost);

    let id: string = this.route.snapshot.params['id'];
    console.log(id);

    this.jobService.getEmployerPosterJobWithId(id)
                  .subscribe(
                    res =>{
                      console.dir(res);
                      console.log('result is ...');
                      if (res){
                        this.jobPost = res[0];
                      } else{
                        this.router.navigate(['404']);
                      }                    
                      console.dir(this.jobPost);
                    },
                    err =>{

                      this.router.navigate(['404']);
                      console.log('err');
                      console.dir(err);
                    }
                  );
    this.categoryService.getCategoryList().subscribe(
                          res => {
                            console.log('Category List Recieved....');
                            console.dir(res);
                            this.jobCategory = res as Array<JobCategory>;
                            console.dir(this.jobCategory);
                          },
                          err => {
                            console.log('err');
                            console.dir(err);
                          }
                        );
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
    console.log('onchange onvoked....');
    
    return 'selected';
  }

  subCategoryChanged(value:any){
    if (value){
      this.jobPost.jobSubCategory = value;
    }else{
      this.jobPost.jobSubCategory = '';
    }
  }

  saveChanges(){
    let user = JSON.parse(localStorage.getItem('currentUser'));
      console.dir(user);
      this.jobPost.owner = user._id;
      console.log('sending data.....');
      console.dir(this.jobPost);
      this.jobService.updateJob(this.jobPost)
                      .subscribe(
                        res =>{
                          if(res){
                            this.jobPost = res;
                            console.dir(this.jobPost);
                          }                          
                        },
                        err =>{
                          console.dir(err);
                        }
                      );
  }
}
