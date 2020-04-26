import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormDebugComponent } from './form-debug/form-debug.component';
import { CampoControlComponent } from './campo-control/campo-control.component';
import { ErrorMessageComponent } from './error-message/error-message.component';
import { InputFieldComponent } from './input-field/input-field.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    FormDebugComponent,
    CampoControlComponent,
    ErrorMessageComponent,
    InputFieldComponent,
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    FormDebugComponent,
    CampoControlComponent,
    ErrorMessageComponent,
    InputFieldComponent,
  ]
})
export class SharedModule { }
