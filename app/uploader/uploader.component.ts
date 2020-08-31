import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.css']
})
export class UploaderComponent implements OnInit {

  uploads: any[];
  allPercentage: Observable<any>;
  files: any;
  _db: Observable<any>;
  fileToSubmit: any;
  uploading: false;
  uploadingSpinner: any;
  constructor(public afs: AngularFirestore, public storage: AngularFireStorage, private router: Router, public db: AngularFirestore) {

  }

  ngOnInit(): void {
  }
  title='image-uploader'

  public imagePath;
  imgURL: any;
  public message: string;
  FileName = "Select Image";

  // Preview Images before Upload
  preview(files) {

    this.fileToSubmit = files;
    this.FileName = files[0].name

    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
  }

  // Upload Image
  uploadImage() {
    this.uploadingSpinner = true;
    // reset the array
    this.uploads = [];
    const filelist = this.fileToSubmit;
    const allPercentage: Observable<number>[] = [];

    for (const file of filelist) {

      const path = `files/${file.name}`;
      const ref = this.storage.ref(path);
      const task = this.storage.upload(path, file);


      // for every upload do whatever you want in firestore with the uploaded file
      const _t = task.then((f) => {
        return f.ref.getDownloadURL().then((url) => {
          this.uploadingSpinner = false;
          this.fileToSubmit = null;
          Swal.fire({
            title: 'Success',
            icon: 'success',
            confirmButtonColor: '#3085d6',
          }).then(() => {
          this.imgURL = null;
          this.FileName = 'Select Image'
          })

          return this.afs.collection('files').add({
            name: f.metadata.name,
            url: url,
            date: f.metadata.timeCreated
          }
          );
        })
      })
    }
  }

}
