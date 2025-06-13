import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.scss'
})
export class CounterComponent {
  counters = signal<number[]>([]);

  addCounter() {
    this.counters.update(counters => [0, ...counters]);
    Swal.fire({
      icon: 'success',
      title: 'New Counter Added',
      timer: 1000,
      showConfirmButton: false
    });
  }

  resetCounters() {
    if (this.counters().length > 0) {
      Swal.fire({
        title: 'Reset All Counters?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, Reset!',
        cancelButtonText: 'Cancel'
      }).then(result => {
        if (result.isConfirmed) {
          this.counters.set([]);
          Swal.fire('Reset!', 'All counters have been reset.', 'success');
        }
      });
    }
  }

  increment(index: number) {
    const updated = [...this.counters()];
    updated[index]++;
    this.counters.set(updated);
  }

  decrement(index: number) {
    const updated = [...this.counters()];
    updated[index]--;
    this.counters.set(updated);
  }

  removeCounter(index: number) {
    Swal.fire({
      title: 'Remove this counter?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, remove!',
      cancelButtonText: 'Cancel'
    }).then(result => {
      if (result.isConfirmed) {
        const updated = [...this.counters()];
        updated.splice(index, 1);
        this.counters.set(updated);
        Swal.fire('Removed!', 'Counter removed.', 'success');
      }
    });
  }
}