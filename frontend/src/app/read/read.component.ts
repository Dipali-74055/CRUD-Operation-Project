import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {ApiserviceService} from '../apiservice.service';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit {

  dataSource :any;
  totalRecords:any;
  p = 1;
  pageSize =10;
  readData:any;
  successmsg:any;

  @ViewChild(MatPaginator) paginator !:MatPaginator;

  constructor(private service:ApiserviceService){

  }

  
ngOnInit(): void {

      this.getAllData();
    
  }

  // get delete by id

deleteID(id:any)
{
   console.log(id,'deletedID==>');
   this.service.deleteData(id).subscribe((res)=>{
    console.log(res,'deleteres==>');
    this.successmsg = res.message;
    this.getAllData();
   });
}

  //  getAllRecord

 getAllData()
{
  this.service.getAllData().subscribe(res=>{ 
    this.readData = res.data;
    console.log(this.readData); 

    this.dataSource = new MatTableDataSource<any>(this.readData);
    this.dataSource.paginator = this.paginator; 

  });


}

}