import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowerDataComponent } from './follower-data.component';

describe('FollowerDataComponent', () => {
  let component: FollowerDataComponent;
  let fixture: ComponentFixture<FollowerDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FollowerDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowerDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
