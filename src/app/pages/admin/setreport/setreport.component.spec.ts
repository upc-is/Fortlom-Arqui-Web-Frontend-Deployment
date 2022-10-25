/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SetreportComponent } from './setreport.component';

describe('SetreportComponent', () => {
  let component: SetreportComponent;
  let fixture: ComponentFixture<SetreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
