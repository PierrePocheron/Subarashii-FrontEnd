import { HttpClientModule } from "@angular/common/http";
import { TestBed } from "@angular/core/testing"
import { ReactiveFormsModule } from "@angular/forms";
import { By } from "@angular/platform-browser";
import { RouterTestingModule } from "@angular/router/testing";
import { CompteComponent } from "./compte.component"

describe('CompteComponent', () => {
  let app: any = null;
  let fixture: any = null;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule, ReactiveFormsModule],
      declarations: [CompteComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompteComponent);
    app = fixture.componentInstance;
  });

  it('should create', () => {
    expect(app).toBeTruthy()
  })

  it('should be call submitUsername if button click', () => {
    spyOn(app, 'submitUsername');
    app.isOpenInputName = true;
    fixture.detectChanges();
    const button = fixture.debugElement.nativeElement.querySelector('#buttonUsername');
    button.click();

    expect(app.submitUsername).toHaveBeenCalled()
  })

  it('should be call submitPassword if button click', () => {
    spyOn(app, 'submitPassword');
    app.isOpenInputPassword = true;
    fixture.detectChanges();
    const button = fixture.debugElement.nativeElement.querySelector('#buttonPassword');
    button.click();

    expect(app.submitPassword).toHaveBeenCalled()
  })

  it('should be isErrorUsername = true is username = \'\' ', () => {
    app.isOpenInputName = true;
    app.isErrorUsername = false;
    app.updateForm.setValue({username: '', password: ''});
    fixture.detectChanges();
    const button = fixture.debugElement.nativeElement.querySelector('#buttonUsername');
    button.click();

    expect(app.isErrorUsername).toBeTruthy();
  })

  it('should be isErrorUsername = false is username = test ', () => {
    app.isOpenInputName = true;
    app.isErrorUsername = true;
    app.updateForm.setValue({username: 'test', password: ''});

    fixture.detectChanges();
    const button = fixture.debugElement.nativeElement.querySelector('#buttonUsername');
    button.click();

    expect(app.isErrorUsername).toBeFalsy();
    expect(app.isOpenInputName).toBeFalsy();
  })

  it('should be isErrorPasword = true is password.length < 5', () => {
    app.isOpenInputPassword = true;
    app.isErrorPassword = false;
    app.updateForm.setValue({username: '', password: 'test'});
    fixture.detectChanges();
    const button = fixture.debugElement.nativeElement.querySelector('#buttonPassword');
    button.click();

    expect(app.isErrorPassword).toBeTruthy();
  })

  it('should be isErrorPasword = false is password.length >= 5', () => {
    app.isOpenInputPassword = true;
    app.isErrorPassword = false;
    app.updateForm.setValue({username: '', password: 'test12'});
    fixture.detectChanges();
    const button = fixture.debugElement.nativeElement.querySelector('#buttonPassword');
    button.click();

    expect(app.isErrorPassword).toBeFalsy();
    expect(app.isOpenInputPassword).toBeFalsy();
  })
})

