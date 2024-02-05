import { Component, OnDestroy, OnInit } from '@angular/core';
import { SignalrService } from '../signalr.service';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  constructor(
    public signalrService: SignalrService //Added in tutorial 2 
  ) { }

  ngOnInit(): void {
  }
}
