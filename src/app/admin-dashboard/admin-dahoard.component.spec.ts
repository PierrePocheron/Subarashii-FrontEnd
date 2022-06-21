import { HttpClientModule } from "@angular/common/http";
import { TestBed } from "@angular/core/testing"
import { RouterTestingModule } from "@angular/router/testing";
import { AdminDashboardComponent } from "./admin-dashboard.component";

describe('AdminDashoardComponent', () => {
  let app: any = null;
  let fixture: any = null;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule],
      declarations: [AdminDashboardComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDashboardComponent);
    app = fixture.componentInstance;
  });

  it('should create', () => {
    expect(app).toBeTruthy()
  })
})
