import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { CustomValidators, Utility, UserService } from '../../providers/providers';
import { ModalController } from '@ionic/angular';
import { RecoveryPasswordModalComponent } from '../../components/recovery-password-modal/recovery-password-modal.component';
import { OverlayEventDetail } from '@ionic/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-saza-setup',
  templateUrl: './saza-setup.page.html',
  styleUrls: ['./saza-setup.page.scss'],
})
export class SazaSetupPage implements OnInit {
  suggestedPassword = '';
  private passwordForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private utility: Utility, private userService: UserService,
    public modalController: ModalController, private router: Router) { }

  ngOnInit() {
    this.makeForm();
  }

  makeForm() {
    this.passwordForm = this.formBuilder.group({
      useSuggestion: [''],
      passwordSaved: ['', Validators.compose([CustomValidators.requiredIf('useSuggestion')
      ])],
      password: ['', Validators.compose([Validators.minLength(8), Validators.required, CustomValidators.isValidPassword()])],
      confirmPassword: ['', Validators.compose([Validators.minLength(8), Validators.required, CustomValidators.isValidPassword(), CustomValidators.equalTo('password')])],
    });
  }

  /**
   * adds the suggested password to the form when clicked. Resets the form otherwise.
   * @param event the checkbox event that was clicked
   */
  setSuggestion(event) {
    if (event.target.checked) {
      this.passwordForm.patchValue({ password: this.suggestedPassword, confirmPassword: this.suggestedPassword });
      this.password.disable();
      this.confirmPassword.disable();
    } else {
      this.passwordForm.reset();
      this.password.enable();
      this.confirmPassword.enable();
    }
  }

  /**
   * Copies a value to the clipboard
   * @param item value to be copied
   */
  itemCopy(item) {
    console.log("item: ", item);
  }

  /**
   * sets the suggested password to the "suggestedPassword" member variable.
   * @param password password to be set.
   */
  setSuggestedPassword(password) {
    this.suggestedPassword = password;
    console.log("suggested PW: ", this.suggestedPassword);
  }

  // Getters for template
  get password() { return this.passwordForm.get('password'); }
  get confirmPassword() { return this.passwordForm.get('confirmPassword'); }
  get useSuggestion() { return this.passwordForm.get('useSuggestion'); }

  formSubmit(){
    // check that passwords match
    // get hash of password
    // generate recovery password
    // use recovery password to encrypt main password
    // save hash of password
    // save encrypted password
    // return recovery password to user in plain text
    try {
      const trimmedPwd = String(this.password.value).trim()
      const passwordHash = this.utility.getHash(trimmedPwd)
      const recoveryPassword = this.utility.generatePassword();
      console.log("hash valid: ", this.utility.validateHash(trimmedPwd, passwordHash))

      // use the recovery password to encrypt the primary password.
      const encrpytedPassword = this.utility.encrypt(trimmedPwd, recoveryPassword);
      console.log("PE: ", encrpytedPassword);
      console.log("PH: ", passwordHash);
      console.log("PR: ", recoveryPassword)
      // save hash of primary password
      this.userService.setPassword(passwordHash);
      // save encrypted password
      this.userService.setPasswordRecovery(encrpytedPassword);
      // display recovery password to user
      this.presentModal(recoveryPassword);
    } catch (error) {
      // to do handle and show error
      console.log(error);
    }

  }

  async presentModal(modalValue) {
    const modal = await this.modalController.create({
      component: RecoveryPasswordModalComponent,
      componentProps: { recoveryPassword: modalValue },
      backdropDismiss: false
    });

    modal.onDidDismiss().then((detail: OverlayEventDetail) => {
      console.log("modal dismissed");
      this.router.navigate(['home/']);
    });

    return await modal.present();
  }

   async canDeactivate(nextUrl: string){
    try {
      let status = false;

      if (nextUrl === '/' || nextUrl === '/home') {
        status = true;
        return status;
      }
      status = await this.userService.isSetupComplete();
      console.log(status);
      return status;
    } catch (error) {
      // to do handle and show error
      console.log(error);
      // this.notificationService.show('Hang on ...', 'Please complete account setup.', 'warning');
    }
  }

}
