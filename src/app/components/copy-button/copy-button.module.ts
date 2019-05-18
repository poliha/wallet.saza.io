import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CopyButtonComponent } from './copy-button.component';


@NgModule({
  imports: [CommonModule, FormsModule, IonicModule,],
  declarations: [CopyButtonComponent],
  exports: [CopyButtonComponent]
})
export class CopyButtonComponentModule { }
