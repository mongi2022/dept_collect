import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubActionCategoryComponent } from './sub-action-category.component';

describe('SubActionCategoryComponent', () => {
  let component: SubActionCategoryComponent;
  let fixture: ComponentFixture<SubActionCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubActionCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubActionCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
