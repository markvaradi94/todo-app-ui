import {Component, Inject, OnInit, Optional} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {TaskModel} from "../models/task.model";
import {NativeDateAdapter} from '@angular/material/core';
import {CategoryModel} from "../models/category.model";

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css'],
  providers: [{provide: NativeDateAdapter, useExisting: TaskFormComponent}]
})
export class TaskFormComponent implements OnInit {
  categories: CategoryModel[] = [];

  taskForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    deadline: new FormControl({value: '', disabled: true}, Validators.required),
    category: new FormControl('', Validators.required)
  });

  currentTask: TaskModel

  constructor(public dialogRef: MatDialogRef<TaskFormComponent>,
              @Optional() @Inject(MAT_DIALOG_DATA) data: any
  ) {
    this.currentTask = data.value;
    this.categories = data.categories;
  }

  ngOnInit(): void {
    this.taskForm.controls.name.setValue(this.currentTask.name);
    this.taskForm.controls.description.setValue(this.currentTask.description);
    this.taskForm.controls.deadline.setValue(this.currentTask.deadline.toString());
    this.taskForm.controls.category.setValue(this.currentTask.categoryName);
  }

  onSubmit(): void {
    const updatedTask = {
      name: this.taskForm.controls.name.getRawValue(),
      description: this.taskForm.controls.description.getRawValue(),
      deadline: new Date(this.taskForm.controls.deadline.getRawValue()!!).toISOString().slice(0, 19),
      categoryName: this.taskForm.controls.category.getRawValue()
    }

    if (this.currentTask) {
      this.dialogRef.close({event: 'submit', data: updatedTask});
    } else {
      this.dialogRef.close({event: 'add', data: updatedTask});
    }
  }

  cancel(): void {
    this.dialogRef.close({event: 'cancel'});
  }
}
