import { Component, OnInit } from '@angular/core';
import { EmployeeService, Employee } from '../employee.service';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  employees: Employee[] = [];
  employee: Employee = { name: '', email: '', place: '', status: 'Active' };
  isFormVisible = false;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees(): void {
    this.employeeService.getEmployees().subscribe(employees => this.employees = employees);
  }

  showAddEmployeeForm(): void {
    this.employee = { name: '', email: '', place: '', status: 'Active' };
    this.isFormVisible = true;
  }

  onSubmit(): void {
    if (this.employee.id) {
      this.updateEmployee();
    } else {
      this.addEmployee();
    }
  }

  addEmployee(): void {
    this.employeeService.addEmployee(this.employee).subscribe(employee => {
      this.employees.push(employee);
   
      this.isFormVisible = false;
    });
  }

  updateEmployee(): void {
    this.employeeService.updateEmployee(this.employee).subscribe(updatedEmployee => {
      const index = this.employees.findIndex(emp => emp.id === updatedEmployee.id);
      if (index !== -1) {
        this.employees[index] = updatedEmployee;
       
      }
      this.isFormVisible = false;
    });
  }

  editEmployee(emp: Employee): void {
    this.employee = { ...emp }; // Create a copy of emp to edit
    this.isFormVisible = true;
  }

  deleteEmployee(id: number): void {
    this.employeeService.deleteEmployee(id).subscribe(() => {
      this.employees = this.employees.filter(emp => emp.id !== id);
      
    });
  }

  cancel(): void {
    this.isFormVisible = false;
  }
}
