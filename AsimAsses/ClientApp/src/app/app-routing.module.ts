import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EmployeesComponent } from './Employees/employees.component';
import { EmployeeEditComponent } from './Employees/employee-edit.component';
import { DepartmentsComponent } from './Departments/departments.component';
import { DepartmentEditComponent } from './Departments/department-edit.component';
import { AuthorizeGuard } from 'src/api-authorization/authorize.guard';
const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'employees', component: EmployeesComponent },
  { path: 'employee/:id', component: EmployeeEditComponent, canActivate: [AuthorizeGuard] },
  { path: 'employee', component: EmployeeEditComponent, canActivate: [AuthorizeGuard] },
  { path: 'departments', component: DepartmentsComponent },
  { path: 'department/:id', component: DepartmentEditComponent, canActivate: [AuthorizeGuard] },
  { path: 'department', component: DepartmentEditComponent, canActivate: [AuthorizeGuard] }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
