import { render } from '@testing-library/angular';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  it('should render project title and links', async () => {
    const { getByText } = await render(HeaderComponent, { componentProperties: { counterCount: 3 } });
    expect(getByText('Project Task')).toBeTruthy();
    expect(getByText('Counter App')).toBeTruthy();
    expect(getByText('Weather App')).toBeTruthy();
    expect(getByText('Total Counters: 3')).toBeTruthy();
  });
});
