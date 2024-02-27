import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage'

import { AdminAuthService } from '../../service/admin-auth.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.css'
})
export class AdminPanelComponent implements OnInit{

  gifKeyword :string='';
  gifName :string = ''
  imageLink:string='';
  apiUrl :string = environment.apiUrl;
  adminKey: string = '';
  uploadClicked :boolean = false;

  constructor(private fireStorage : AngularFireStorage, private http:HttpClient, public adminAuthService: AdminAuthService){}

  ngOnInit() {
    // this.adminAuthService.logout()
    this.adminAuthService.isAuthenticated$.subscribe((authenticated) => {
      if (!authenticated) {
        this.showAdminPrompt();
      }
    });
  }

  showAdminPrompt() {
    const adminKey = prompt('Enter admin key:');
    if (adminKey) {
      const isAuthenticated = this.adminAuthService.authenticateAdmin(adminKey);
      if (!isAuthenticated) {
        alert('Invalid admin key. Access denied.');
      }
    } else {
      alert('Access denied.');
    }
  }
  

    // blackbox

  image: File | null = null;

 async handleImageChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files;
    if (files && files[0] && this.gifKeyword && this.gifName ) {
      this.image = files[0];
       const path =`gifs/${this.image.name}${this.gifName}`  // Construct a unique path
        try {
          const uploadedImage = await this.fireStorage.upload(path, this.image);
          this.imageLink = await uploadedImage.ref.getDownloadURL();
         // const img = await uploadedImage.ref.getDownloadURL();
          console.log(this.imageLink);
        } catch (error) {
          console.error('Error uploading image:', error);
        }
    }
  }

  handleRemoveImage() {
    this.image = null;
  }

  get imageUrl() {
    return this.image ? URL.createObjectURL(this.image) : '';
  }

  async uploadGif(){
    this.uploadClicked = true;
    this.http.post(this.apiUrl,{name:this.gifKeyword, gifName:this.gifName, image:this.imageLink})
    .subscribe(
      (res:any)=>{
      console.log(res);
      this.gifKeyword=''
      this.gifName=''
      this.imageLink=''
      this.handleRemoveImage();
      this.uploadClicked=false;
    },
    (err:any)=>{
      console.log(err.message);
    },
    
    )
  }

    
}
