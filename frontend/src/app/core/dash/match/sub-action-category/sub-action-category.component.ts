import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../action-category/category';
import { SubActionCategory } from './sub-action-category';
import { SubActionCategoryService } from './sub-action-category.service';

@Component({
  selector: 'app-sub-action-category',
  templateUrl: './sub-action-category.component.html',
  styleUrls: ['./sub-action-category.component.css']
})
export class SubActionCategoryComponent implements OnInit {
  subActionCategory!: SubActionCategory;
  errMsg!:any;
  categories!: any;
  idCategory!: string;
  subCategoryForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('',[Validators.required]),
  });


  constructor(private subCategoryService: SubActionCategoryService,
    public formBuilder: FormBuilder,
    public route: ActivatedRoute) {
      this.formBuilder.group(this.subCategoryForm)
    }

  ngOnInit(): void {
    this.getCategoriesController();
  }

  getid(id:number){
    console.log(this.categories[id].id);
    this.idCategory=this.categories[id].id;
          }

  AddSubCategoryController() {
  let category=this.idCategory
  
    this.subCategoryService.AddSubCategoryService({...this.subCategoryForm.value,category})
    .subscribe(data => {
      console.log(data);
      alert('Sub Action Category Added Successfully');
    },
    (error) => {
      this.errMsg = error.error.errMsg;
    })
  }

  getCategoriesController() {
    this.subCategoryService.getAllCategoriesService().subscribe(
      (data) => {
        //console.log(data);
        //const test: Category[]=data;
        // console.log(Object.values(data)[0]);
        console.log(Object.values(data)[0]);
        
        this.categories=Object.values(data)[0]
        //this.categories=data;
      }
    )
  }
}
