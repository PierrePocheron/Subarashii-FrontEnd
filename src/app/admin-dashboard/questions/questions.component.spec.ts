import { HttpClientModule } from "@angular/common/http";
import { TestBed } from "@angular/core/testing"
import { RouterTestingModule } from "@angular/router/testing";
import { QuestionsComponent } from "./questions.component";

describe('QuestionsComponent', () => {
  let app: any = null;
  let fixture: any = null;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule],
      declarations: [QuestionsComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsComponent);
    app = fixture.componentInstance;
  });

  it('should create', () => {
    expect(app).toBeTruthy()
  })

  it('should be call delete if button click', () => {
    spyOn(app, 'delete');
    app.arrayQuestions = [{question: 'questtion ?', idSecretQuestion:1}]

    fixture.detectChanges();

    const button = fixture.debugElement.nativeElement.querySelector('#buttonDelete');
    button.click();

    expect(app.delete).toHaveBeenCalled()
  })
})
