import { HttpClientModule } from "@angular/common/http";
import { TestBed } from "@angular/core/testing"
import { RouterTestingModule } from "@angular/router/testing";
import { CommentairesComponent } from "./commentaires.component";

describe('CommentairesComponent', () => {
  let app: any = null;
  let fixture: any = null;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule],
      declarations: [CommentairesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentairesComponent);
    app = fixture.componentInstance;
  });

  it('should create', () => {
    expect(app).toBeTruthy()
  })

  it('should be call delete if button click', () => {
    spyOn(app, 'delete');
    app.arrayComments = [{date: '12/05', nomAnime: 'nomAnime', nomUser: 'nomUser', contenu: 'descirption', id:1}]

    fixture.detectChanges();

    const button = fixture.debugElement.nativeElement.querySelector('#buttonDelete');
    button.click();

    expect(app.delete).toHaveBeenCalled()
  })
})
