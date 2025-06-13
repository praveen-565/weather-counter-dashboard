import { render, screen, fireEvent } from '@testing-library/angular';
import { CounterComponent } from './counter.component';

describe('CounterComponent', () => {
  it('should add a counter when Add Counter button is clicked', async () => {
    await render(CounterComponent);
    fireEvent.click(screen.getByText('Add Counter'));
    expect(screen.getByText('Counter #1')).toBeTruthy();
  });
});