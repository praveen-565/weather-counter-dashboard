import { render } from '@testing-library/angular';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  it('should render hero title', async () => {
    const { getByText } = await render(HomeComponent);
    expect(getByText('Welcome to Project Task')).toBeTruthy();
  });
});