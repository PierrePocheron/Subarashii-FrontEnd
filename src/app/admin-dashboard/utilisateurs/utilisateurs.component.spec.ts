import { HttpClientModule } from "@angular/common/http";
import { TestBed } from "@angular/core/testing"
import { RouterTestingModule } from "@angular/router/testing";
import { UtilisateursComponent } from "./utilisateurs.component";

describe('UtilisateursComponent', () => {
  let app: any = null;
  let fixture: any = null;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule],
      declarations: [UtilisateursComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UtilisateursComponent);
    app = fixture.componentInstance;
  });

  it('should create', () => {
    expect(app).toBeTruthy()
  })

  it('should be call delete if button click', () => {
    spyOn(app, 'delete');
    app.arrayUsers = [{email: 'tes@gmail.com', username: 'test', role: 'USER', idUser:1}]

    fixture.detectChanges();

    const button = fixture.debugElement.nativeElement.querySelector('#buttonDelete');
    button.click();

    expect(app.delete).toHaveBeenCalled()
  })

  it('should be call upgrade if button click', () => {
    spyOn(app, 'upgrade');
    app.arrayUsers = [{email: 'tes@gmail.com', username: 'test', role: 'USER', idUser:1}]

    fixture.detectChanges();

    const button = fixture.debugElement.nativeElement.querySelector('#buttonUpgrade');
    button.click();

    expect(app.upgrade).toHaveBeenCalled();
  })

  it('should be call down if button click', () => {
    spyOn(app, 'down');
    app.arrayUsers = [{email: 'tes@gmail.com', username: 'test', role: 'ADMIN', idUser:1}]

    fixture.detectChanges();

    const button = fixture.debugElement.nativeElement.querySelector('#buttonDown');
    button.click();

    expect(app.down).toHaveBeenCalled();
  })

})
