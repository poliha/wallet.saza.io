import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Utility } from 'src/app/providers/providers';
import { PickerController } from '@ionic/angular';
import * as moment from 'moment';

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
  selectedDate: moment.Moment;
  timeFields = [
    { title: 'hours', length: 24 },
    { title: 'minutes', length: 60 },
    { title: 'seconds', length: 60 },
  ];
  timeString = '00:00:00';

  constructor(private utility: Utility, private pickerCtrl: PickerController) {}

  ngOnInit() {
    const today = moment();
    if (!this.minDate) {
      this.minDate = today.toISOString();
    }
    if (!this.maxDate) {
      this.maxDate = today.add(10, 'y').toISOString();
    }
    // default to minimum allowed date before any input is received from user
    this.selectedDate = moment(this.minDate);
    // this.timeString = this.selectedDate.format('HH:mm:ss');
    this.makeForm();
  }

  makeForm() {
    console.log('Making datetime input...');
    this.dateTimeGroup = new FormGroup({
      date: new FormControl(''),
      time: new FormControl(''),
    });

    this.form.removeControl(this.controlName);
    this.form.addControl(this.controlName, new FormControl(''));
    console.log('Made datetime input...', this.dateTimeGroup);
    console.log('datetime input parent...', this.form);
    // default to the selectedDate before any input from user.
    // this.setDateTime();
  }

  // getters
  get datetime() {
    return this.form.get(this.controlName);
  }
  get date() {
    return this.dateTimeGroup.get('date');
  }
  get time() {
    return this.dateTimeGroup.get('time');
  }

  /**
   * Updates the selected date when an input is received.
   * @param event input event
   */
  dateChanged(event) {
    this.selectedDate = moment(event.target.value);
    this.timeString = this.selectedDate.format('HH:mm:ss');
    this.setDateTime();
  }

  /**
   * updates the formControl value with the unix timestamp of the selected date.
   */
  setDateTime() {
    this.datetime.patchValue(this.selectedDate.unix());
  }

  /**
   * Updates the selected date with the selected time from the time picker dialog.
   * @param timeObject Oject containing the selected hour, minutes, and seconds.
   * @param timeObject.hours Object
   * @param timeObject.hours.value Number
   */
  setTime({ hours, minutes, seconds }) {
    this.selectedDate.hours(hours.value);
    this.selectedDate.minutes(minutes.value);
    this.selectedDate.seconds(seconds.value);
    this.timeString = this.selectedDate.format('HH:mm:ss');
    console.log('SD: ', this.selectedDate.toString());
    console.log('SD unix: ', this.selectedDate.unix());

    this.setDateTime();
  }

  /**
   * Populates the colums to be displayed in the time picker.
   */
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

  /**
   *
   * @param columnOptions an array of values for the time picker.
   */
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

  /**
   * opens the time picker dialog
   */
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
            this.setTime({ hours, minutes, seconds });
          },
        },
      ],
    });

    await picker.present();
  }
}
