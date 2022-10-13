/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ImageforlistComponent } from './imageforlist.component';

describe('ImageforlistComponent', () => {
  let component: ImageforlistComponent;
  let fixture: ComponentFixture<ImageforlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageforlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageforlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
