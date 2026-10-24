import { Component } from '@angular/core';
import { LegalPage } from '../../components/legal-page/legal-page';

@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [LegalPage],
  templateUrl: './privacy.html'
})
export class Privacy {}