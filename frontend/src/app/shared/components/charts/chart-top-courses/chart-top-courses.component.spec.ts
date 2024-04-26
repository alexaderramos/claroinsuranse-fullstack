import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartTopCoursesComponent } from './chart-top-courses.component';

describe('ChartTopCoursesComponent', () => {
  let component: ChartTopCoursesComponent;
  let fixture: ComponentFixture<ChartTopCoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartTopCoursesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChartTopCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
