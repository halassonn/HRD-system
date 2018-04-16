import { Component, OnInit } from '@angular/core';
import { ElectronService } from '../../providers/electron.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
public pesan: string;
  constructor(public electronService: ElectronService) {
    this.docheck();
   }

  ngOnInit() {
    this.electronService.ipcRenderer.send('getversion');
    this.electronService.ipcRenderer.on('version', (event, arg) => {
      document.getElementById('version').innerText = arg;
    })

  }


  docheck() {
    this.electronService.ipcRenderer.send('check-update-app');
    this.electronService.ipcRenderer.on('message', (event, data) => {
      this.pesan = data;
      console.log('version', this.pesan);
  });
  }
}
