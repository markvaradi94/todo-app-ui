import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent {
  categoryForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required)
  });

  constructor(public dialogRef: MatDialogRef<CategoryFormComponent>) {
  }

  onSubmit(): void {
    const updatedCategory = {
      name: this.categoryForm.controls.name.getRawValue(),
      description: this.categoryForm.controls.description.getRawValue()
    }

    if (updatedCategory) {
      this.dialogRef.close({event: 'submit', data: updatedCategory});
    }
  }

  cancel(): void {
    this.dialogRef.close({event: 'cancel'});
  }
}
