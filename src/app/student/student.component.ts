import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { studentdata } from './student.model';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit{

  // hide
  showadd!: boolean;
  showupdate!: boolean;
  studentmodelobj: studentdata = new studentdata
  formvalue!: FormGroup;
  allstudentdata:any;
  constructor(private formBuilder:FormBuilder,private api:ApiService) { }

  ngOnInit(): void {
    this.formvalue = this.formBuilder.group({
      name:['',Validators.required],
      email:['',Validators.required],
      mobile:['',Validators.required],
      city:['',Validators.required]
    })
    this.getdata()
    
  }
// to hide add
  add(){
    this.showadd = true;
    this.showupdate = false;
  }

  edit(data:any){
    this.showadd = false;
    this.showupdate = true;
    this.studentmodelobj.id = data.id;

    this.formvalue.controls['name'].setValue(data.name)
    this.formvalue.controls['email'].setValue(data.email)
    this.formvalue.controls['mobile'].setValue(data.mobile)
    this.formvalue.controls['city'].setValue(data.city)
  }
// update on edit
update(){
  this.studentmodelobj.name = this.formvalue.value.name;
  this.studentmodelobj.email = this.formvalue.value.email;
  this.studentmodelobj.mobile = this.formvalue.value.mobile;
  this.studentmodelobj.city = this.formvalue.value.city;
  
  this.api.updatestudent(this.studentmodelobj,this.studentmodelobj.id)
  .subscribe(res=>{
    this.formvalue.reset();
    this.getdata();
    alert("Updated successfully!");
    
  },
  err=>{
    alert("Something went wrong!");
  })
}

  addstudent(){
    this.studentmodelobj.name = this.formvalue.value.name;
    this.studentmodelobj.email = this.formvalue.value.email;
    this.studentmodelobj.mobile = this.formvalue.value.mobile;
    this.studentmodelobj.city = this.formvalue.value.city;

    this.api.poststudent(this.studentmodelobj).subscribe(res=>{
      console.log(res);
      this.formvalue.reset();
      this.getdata();
      
      alert("Student added successfully!")
    },
    err=>{
      alert("Something went wrong!")
    })
  }

// getdata
  getdata(){
    this.api.getstudent().subscribe(res=>{
      this.allstudentdata=res;
    })
}

// delete
deletestud(data:any){
  this.api.deletestudent(data.id)
  .subscribe(res=>{
    alert("Student deleted successfully!")
    this.getdata();
  })
}
}
