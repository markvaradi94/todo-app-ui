import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {TasksApiService} from '../services/tasks-api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {TaskFormComponent} from '../task-form/task-form.component';
import {TaskModel} from "../models/task.model";
import {CategoriesApiService} from "../services/categories-api.service";
import {CategoryModel} from "../models/category.model";
import {CategoryFormComponent} from "../category-form/category-form.component";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['id', 'name', 'description', 'deadline', 'categoryName', 'categoryDescription', 'actions'];
  dataSource: MatTableDataSource<TaskModel> = new MatTableDataSource<TaskModel>();
  categories: CategoryModel[] = [];

  constructor(private tasksApiService: TasksApiService,
              private categoryApiService: CategoriesApiService,
              private dialogRef: MatDialog) {
  }

  ngOnInit(): void {
    this.tasksApiService.getAll().subscribe(result => {
      this.dataSource.data = result.content.map((element: any) => {
        return {
          id: element.id,
          name: element.name,
          description: element.description,
          deadline: element.deadline,
          categoryName: element.categoryName,
          categoryDescription: element.categoryDescription
        };
      })
    });

    this.categoryApiService.getAll().subscribe(result => {
      this.categories = result.map((element: any) => {
        return {
          id: element.id,
          name: element.name,
          description: element.description
        };
      })
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  openTaskDialog(task?: TaskModel): void {
    const dialogRef = this.dialogRef.open(TaskFormComponent, {
      width: '500px',
      backdropClass: 'custom-dialog-backdrop-class',
      panelClass: 'custom-dialog-panel-class',
      data: {value: task, categories: this.categories}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.event === 'submit' && task) {
        this.tasksApiService.updateTask(task.id, result.data).subscribe();
        location.reload();
      } else if (result.event === 'add') {
        this.tasksApiService.addTask(result.data).subscribe();
        location.reload();
      }
    })
  }

  openCategoryDialog(): void {
    const dialogRef = this.dialogRef.open(CategoryFormComponent, {
      width: '500px',
      backdropClass: 'custom-dialog-backdrop-class',
      panelClass: 'custom-dialog-panel-class',
      data: {categories: this.categories}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.event === 'submit' && result.data) {
        this.categoryApiService.addCategory(result.data).subscribe();
        location.reload();
      }
    })
  }

  delete(id: number): void {
    this.tasksApiService.deleteTask(id).subscribe();
    location.reload();
  }
}
