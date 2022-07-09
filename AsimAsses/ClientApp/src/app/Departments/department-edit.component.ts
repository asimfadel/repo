import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Department } from './../departments/Department';
@Component({
  selector: 'app-department-edit',
  templateUrl: './department-edit.component.html',
  styleUrls: ['./department-edit.component.css']
})
export class DepartmentEditComponent implements OnInit {
  // the view title
  title: string;
  // the form model
  form: FormGroup;
  // the  object to edit or create
  department: Department;
 
  id?: number;
  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string) {
    this.loadData();
  }
  ngOnInit() {
    this.form = this.fb.group({
      name: ['',
        Validators.required,
        this.isDupeField("name")
      ] 
    });
    this.loadData();
  }
  loadData() {
    // retrieve the ID from the 'id'
    this.id = +this.activatedRoute.snapshot.paramMap.get('id');
    if (this.id) {
      // EDIT MODE
      // fetch the dep from the server
      var url = this.baseUrl + "api/departments/" + this.id;
      this.http.get<Department>(url).subscribe(result => {
        this.department = result;
        this.title = "Edit - " + this.department.name;
        // update the form with the dep value
        this.form.patchValue(this.department);
      }, error => console.error(error));
    }
    else {
      // ADD NEW MODE
      this.title = "Create a new department";
    }
  }
  onSubmit() {
    var dep = (this.id) ? this.department : <Department>{};
    dep.name = this.form.get("name").value;
 
    if (this.id) {
      // EDIT mode
      var url = this.baseUrl + "api/departments/" + this.department.id;
      this.http
        .put<Department>(url, dep)
        .subscribe(result => {
          console.log("dep " + dep.id + " has been updated.");
          // go back to dep view
          this.router.navigate(['/departments']);
        }, error => console.error(error));
    }
    else {
      // ADD NEW mode
      var url = this.baseUrl + "api/departments";
      this.http
        .post<Department>(url, dep)
        .subscribe(result => {
          console.log("dep " + result.id + " has been created.");
          // go back to dep view
          this.router.navigate(['/departments']);
        }, error => console.error(error));
    }
  }
  isDupeField(fieldName: string): AsyncValidatorFn {
    return (control: AbstractControl): Observable<{
      [key: string]: any
    } | null> => {
      var params = new HttpParams()
        .set("id", (this.id) ? this.id.toString() : "0")
        .set("fieldName", fieldName)
        .set("fieldValue", control.value);
      var url = this.baseUrl + "api/departments/IsDupeField";
      return this.http.post<boolean>(url, null, { params })
        .pipe(map(result => {
          return (result ? { isDupeField: true } : null);
        }));
    }
  }
}
