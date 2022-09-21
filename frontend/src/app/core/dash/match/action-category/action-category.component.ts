import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from 'express';
import { ActionCategoryService } from './action-category.service';
import { Category } from './category';

@Component({
  selector: 'app-action-category',
  templateUrl: './action-category.component.html',
  styleUrls: ['./action-category.component.css']
})
export class ActionCategoryComponent implements OnInit {
  category!: Category;
  errMsg!: any;

  categoryForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('',[Validators.required]),
  });



  constructor(private categoryService:ActionCategoryService,
    public formBuilder: FormBuilder,
    public route: ActivatedRoute
    ) {
      this.formBuilder.group(this.categoryForm);
    }

  ngOnInit(): void {
  }

  AddCategoryController() {
    
    this.categoryService.AddCategoryService(this.categoryForm.value)
    .subscribe(data => {
      console.log(data);

      alert('Action Category Added Successfully');
    },
    (error) => {
      this.errMsg=error.error.errMsg
    })
  }

}
