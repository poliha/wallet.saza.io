import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CustomValidators, Utility } from 'src/app/providers/providers';
import { PickerController } from '@ionic/angular';

@Component({
  selector: 'app-saza-date-time',
  templateUrl: './saza-date-time.component.html',
  styleUrls: ['./saza-date-time.component.scss'],
})
export class SazaDateTimeComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() controlName: string;
  @Input() maxDate;
  @Input() minDate;

  dateTimeGroup: FormGroup;
  timeColumns = [];
  timeFields = [
    { title: 'hours', length: 24 },
    { title: 'minutes', length: 60 },
    { title: 'seconds', length: 60 },
  ];

  constructor(private utility: Utility, private pickerCtrl: PickerController) {}

  ngOnInit() {
    const today = new Date(Date.now());
    if (!this.minDate) {
      this.minDate = today;
    }
    if (!this.maxDate) {
      this.maxDate = this.utility.addYears(today, 3);
    }

    this.makeForm();
  }

  makeForm() {
    if (!this.form) {
      console.log('No form');
      return;
    }
    console.log('Making datetime input...');
    this.dateTimeGroup = new FormGroup({
      date: new FormControl(this.minDate),
      time: new FormControl(''),
    });

    this.form.removeControl(this.controlName);
    this.form.addControl(this.controlName, this.dateTimeGroup);
    console.log('Made datetime input...', this.form);
  }

  // getters
  get datetime() {
    return this.form.get(this.controlName);
  }
  get date() {
    return this.form.get(`${this.controlName}.date`);
  }
  get time() {
    return this.form.get(`${this.controlName}.time`);
  }

  getPickerColumns() {
    const output = [];
    for (let i = 0; i < this.timeFields.length; i++) {
      output.push({
        name: this.timeFields[i].title,
        options: this.getColumnOptions(
          this.utility.range(this.timeFields[i].length),
        ),
      });
    }
    return output;
  }

  getColumnOptions(columnOptions) {
    const options = [];
    for (let i = 0; i < columnOptions.length; i++) {
      options.push({
        text: String(columnOptions[i]).padStart(2, '0'),
        value: i,
      });
    }
    return options;
  }

  async openPicker() {
    const picker = await this.pickerCtrl.create({
      columns: this.getPickerColumns(),
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Confirm',
          handler: value => {
            console.log(`Got Value: `, value);
            const { hours, minutes, seconds } = value;
            const timeString = `${hours.text}:${minutes.text}:${seconds.text}`;
            this.setTime(timeString);
          },
        },
      ],
    });

    await picker.present();
  }

  setTime(value) {
    if (!value) {
      return;
    }
    this.time.patchValue(value);
  }
}
