import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from "@angular/forms"

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})
export class CounterComponent implements OnInit {
  @Output() counterEmitter: EventEmitter<number> = new EventEmitter<number>()

  public counter: number = 0
  public form: FormGroup

  constructor(private fb: FormBuilder) {
    this.form = fb.group({
      login: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  ngOnInit(): void {}

  public inc(): void {
    this.counter++
    this.counterEmitter.emit(this.counter)
  }

  public dec(): void {
    this.counter--
    this.counterEmitter.emit(this.counter)
  }
}
