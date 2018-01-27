import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentAndPopularMoviesComponent } from './recent-and-popular-movies.component';

describe('RecentAndPopularMoviesComponent', () => {
  let component: RecentAndPopularMoviesComponent;
  let fixture: ComponentFixture<RecentAndPopularMoviesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecentAndPopularMoviesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentAndPopularMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
