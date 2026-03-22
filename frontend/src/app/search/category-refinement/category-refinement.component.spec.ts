import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryRefinementComponent } from './category-refinement.component';

describe('CategoryRefinementComponent', () => {
  let component: CategoryRefinementComponent;
  let fixture: ComponentFixture<CategoryRefinementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryRefinementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryRefinementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
