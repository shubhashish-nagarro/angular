import { Component, computed, effect, linkedSignal, Signal, signal, untracked } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  title = signal('Angular');
  clickCount = signal(0);
  latestTitle = computed(() => "Hello, " + this.title() + ' ' + this.clickCount());
  showCount = signal(false);
  conditionalCount = computed(() => {
    if (this.showCount()) {
      return `The count is ${this.clickCount()}.`;
    } else {
      return 'Nothing to see here!';
    }
  });
  // 
  shippingOptions: Signal<string[]> = this.getFruitsArray();
  // Initialize selectedOption to the first shipping option.
  selectedOption = linkedSignal(() => this.shippingOptions()[0]);

  constructor() {
    effect(() => {
      console.log(`show value is ${this.showCount()} and the counter is ${untracked(this.clickCount)}`);
    });
  }

  increaseCount() {
    this.clickCount.update((value) => value + 1);
    this.selectedOption.set(this.shippingOptions()[this.clickCount()]);
  }

  show() {
    this.showCount.set(!this.showCount());
  }

  getFruitsArray() {
    return signal(['Apple', 'Banana', 'Mango', 'Orange']);
  }

  getVegArray() {
    return signal(['Potato', 'Onion']);
  }
}
