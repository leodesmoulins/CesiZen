import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, MatIcon],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {}
