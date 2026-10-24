import { Component } from '@angular/core';
import { LegalPage } from '../../components/legal-page/legal-page';

@Component({
  selector: 'app-terms',
  standalone: true,
  imports: [LegalPage],
  templateUrl: './terms.html'
})
export class Terms {}