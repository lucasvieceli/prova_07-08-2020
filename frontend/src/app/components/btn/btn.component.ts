import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-btn',
    template: `
        <button class="btn {{classe}}" [disabled]="isDisabled()" [type]="type" [innerHTML]="text"></button>
      
    `,
    styles:[
        ':host{display: flex}'
    ]
})
export class BtnComponent{

  textBackup         : string = '';
  isSpinner     : boolean = false;
  @Input() classe             : string;
  @Input() disabled           : boolean;
  @Input() type               : string = 'button';
  @Input() text              : string = '';
  @Input() textoProcessando   : string = `<i class='fa fa-circle-o-notch fa-spin'></i> <span class="hidden-xs-down"> Processando...</span>`;
  
    @Input()
    public set spinner(valor : boolean){
        if(valor){
            this.isSpinner    = true;
            this.textBackup        = this.text;
            this.text              = this.textoProcessando;
        }else{
            if(this.isSpinner) {
                this.isSpinner    = false;
                if(this.textBackup) {
                    this.text = this.textBackup;
                }
            }
        }
        
    }

    constructor() {
    }

    isDisabled(){
        return this.isSpinner || this.disabled
    }

}