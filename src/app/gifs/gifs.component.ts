import { Component, OnInit } from '@angular/core';
import { Gif } from '../../model/gif-interface';
import { GifService } from '../../service/gif.service';
import { initFlowbite } from 'flowbite';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-gifs',
  templateUrl: './gifs.component.html',
  styleUrl: './gifs.component.css',
  providers: [MessageService]
})
export class GifsComponent implements OnInit{
  
  gifs: Gif[] = []
  search?:string;
  
  constructor( private gifService : GifService,private messageService: MessageService){}

  ngOnInit(): void {
    console.log(!this.gifs);
    if(!this.gifs){
      this.temp = true
    }
    
    this.getAllGifs();
    initFlowbite();  
    setTimeout(() => {
     
      
      
    }, 1000);  
  }

  getAllGifs():any{
    this.gifs=[]
    this.gifService.getGifs().subscribe(
      (res:any)=>{
        this.gifs = res;
        console.log(this.gifs);
        
      },
      (err)=>{
        console.log(err.message);   
      }
    )
  }
  
  copyToClipboard(text: string, event: Event) {
    event.stopPropagation();
    this.messageService.add({  key: 'tc' + text, severity: 'success', summary: 'Copied', detail:  `Gif name : ${text}` });
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = text;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  temp:boolean= false;




  searchGif(){
    this.gifService.search(this.search).subscribe(
      (res:any)=>{
        this.gifs = res;
        console.log(this.gifs);
        
      },
      (err)=>{
        console.log(err.message);   
      }
    )
  }
  

}

