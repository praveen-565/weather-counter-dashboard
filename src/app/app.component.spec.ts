import { render } from '@testing-library/angular';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  it('should render header and router outlet', async () => {
    const { getByText } = await render(AppComponent);
    expect(getByText('Project Task')).toBeTruthy();
  });
});
