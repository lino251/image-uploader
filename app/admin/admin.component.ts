import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  private _db: any;
  files: any;
  imgUrl: any = null;

  constructor(public afs: AngularFirestore, public storage: AngularFireStorage, private router: Router, public db: AngularFirestore) {
     // Check for value changes and Get
     this._db = this.db.collection('files').valueChanges();
     this._db.subscribe(res => {
       this.files = res;
       console.log(this.files)
     })
  }
  ngOnInit(): void {
  }

  // Select Preview
  Preview(item){
    this.imgUrl = item;
  }

}
