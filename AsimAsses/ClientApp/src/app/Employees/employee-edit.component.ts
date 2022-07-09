import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl,Validators,AbstractControl,AsyncValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Employee } from './Employee';
import { Department } from './../departments/Department';
import { CONTROL } from '@angular/cdk/keycodes';
import { BaseFormComponent } from '../Base.from.component';
@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent extends BaseFormComponent implements OnInit {
  // the view title
  title: string;
  // the form model
  form: FormGroup;
  // the  object to edit or create 
  emp: Employee;

 
  id?: number;

  // the  array for the select

  departments: Department[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string) {
    super();
  }
  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      salary: new FormControl('', [Validators.required
      ]),
      designation: new FormControl('', [
        Validators.required
      ]),
      joinningDate: new FormControl('', Validators.required),
      departmentId: new FormControl('', Validators.required)
    }, null, this.isDupeEmployee());
    this.loadData();
  }
  loadData() {

    //load departments

    this.loadDepartments();

    //retrieve the id from the 'id'
    this.id = +this.activatedRoute.snapshot.paramMap.get('id');
    if (this.id) {

      //edit mode

      //fetch the employee from the server
      var url = this.baseUrl + "api/employees/" + this.id;
      this.http.get<Employee>(url).subscribe(result => {
        this.emp = result;
        this.title = "Edit - " + this.emp.name;

        //update the form with the emp value

        this.form.patchValue(this.emp);
      }, error => console.error(error));

    } else {
      //Add new emp mode

      this.title = "add a new emp";

    }

    
 
  }

        


  loadDepartments() {
    //fetch all departments from the server
    var url = this.baseUrl + "api/departments";
    var params = new HttpParams()
      .set("pageIndex", "0")
      .set("pageSize", "9999")
      .set("sortColumn", "name")

    this.http.get<any>(url, { params }).subscribe(result => {
      this.departments = result.data;
    }, error => console.error(error));
  }



  isDupeEmployee(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<{ [key: string]: any } | null>  => {
      var emp1 = <Employee>{};
      emp1.id = (this.id) ? this.id : 0;
      emp1.name = this.form.get("name").value;
      emp1.salary = this.form.get("salary").value;
      emp1.designation = this.form.get("designation").value;
      emp1.joinningDate = this.form.get("joinningDate").value;
      emp1.departmentId = this.form.get("departmentId").value;
      var url = this.baseUrl + "api/employees/isDupeEmployee";
      return this.http.post<boolean>(url, emp1).pipe(map(result => {
        return (result ? { isDupeEmployee: true } : null);
      }));
    }
  }

  delete(name: string) {
    if (confirm("Are you sure to delete " + name)) {
      var em = (this.id) ? this.emp : <Employee>{};
      var url = this.baseUrl + "api/employees/" + this.emp.id;
      this.http
        .delete<Employee>(url)
        .subscribe(result => {
          console.log("employee " + em.id + " has been deleted.");
          // go back to emp view
          this.router.navigate(['/employees']);
        }, error => console.error(error));
    }

  }

  onSubmit() {
    var emp2 = (this.id) ? this.emp : <Employee>{}
     
    emp2.name = this.form.get("name").value;
    emp2.salary = this.form.get("salary").value;
    emp2.designation = this.form.get("designation").value;
    emp2.joinningDate = this.form.get("joinningDate").value;
    emp2.departmentId = +this.form.get("departmentId").value;

    if (this.id) {
      var url = this.baseUrl + "api/employees/" + this.emp.id;
      this.http.put<Employee>(url, emp2).subscribe(result => {
        console.log("emp " + emp2.id + " has been updated.");

        //go bcak to the emp views
        this.router.navigate(['/employees']);

      }, error => console.error(error));
    } else {
      //add new mode
      var url = this.baseUrl + "api/employees";
      console.log(emp2);
      this.http.post<Employee>(url, emp2).subscribe(result => {
        console.log("emp " + result.id + " has been added.");

        //go back to emp view
        this.router.navigate(['/employees']);

      }, error => console.error(error));
    }




 
  }
}
