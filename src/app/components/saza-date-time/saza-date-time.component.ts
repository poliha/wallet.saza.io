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
  selectedTime = {
    hours: 0,
    minutes: 0,
    seconds: 0,
  };

  timeString = 'HH:MM:SS';
  showSelectDateMessage = true;

  constructor(private utility: Utility, private pickerCtrl: PickerController) {}

  ngOnInit() {
    const today = moment();
    if (!this.minDate) {
      this.minDate = today.toISOString();
    }
    if (!this.maxDate) {
      this.maxDate = today.add(10, 'y').toISOString();
    }
    this.makeForm();
  }

  makeForm() {
    this.dateTimeGroup = new FormGroup({
      date: new FormControl(''),
      time: new FormControl(''),
    });

    this.form.removeControl(this.controlName);
    this.form.addControl(this.controlName, new FormControl(''));
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
    const dateValue = event.target.value;
    if (!dateValue) {
      this.selectedDate = null;
    } else {
      this.selectedDate = moment(dateValue);
      this.setTime();
    }
    this.setDateTime();
  }

  /**
   * Updates the selectedTime object with data from the time picker dialog.
   * @param timeObject Oject containing the selected hour, minutes, and seconds.
   * @param timeObject.hours Object
   * @param timeObject.hours.value Number
   */
  timeChanged({ hours, minutes, seconds }) {
    this.selectedTime = {
      hours: hours.value,
      minutes: minutes.value,
      seconds: seconds.value,
    };
    this.setTime();
  }

  /**
   * updates the formControl value with the unix timestamp of the selected date.
   */
  setDateTime() {
    this.datetime.patchValue(this.selectedDate ? this.selectedDate.unix() : '');
  }

  /**
   * Updates the selected date with the selected time from the time picker dialog.
   * @param timeObject Oject containing the selected hour, minutes, and seconds.
   * @param timeObject.hours Object
   * @param timeObject.hours.value Number
   */
  setTime() {
    if (!this.selectedDate) {
      return;
    }
    this.selectedDate.hours(this.selectedTime.hours);
    this.selectedDate.minutes(this.selectedTime.minutes);
    this.selectedDate.seconds(this.selectedTime.seconds);
    this.timeString = this.selectedDate.format('HH:mm:ss');

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
    if (!this.selectedDate) {
      this.showSelectDateMessage = !this.showSelectDateMessage;
      setTimeout(() => {
        this.showSelectDateMessage = !this.showSelectDateMessage;
      }, 2000);

      return;
    }

    const picker = await this.pickerCtrl.create({
      columns: this.getPickerColumns(),
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Confirm',
          handler: (value) => {
            const { hours, minutes, seconds } = value;
            this.timeChanged({ hours, minutes, seconds });
          },
        },
      ],
    });

    await picker.present();
  }
}
