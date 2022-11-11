import React from 'react';
import { act, screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Testa a funcionalidade da Login Page', () => {
  test('Verifica ranking', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    
    act(() => history.push('ranking'))
    expect(history.location.pathname).toBe('/ranking')
    
    const playAgain = screen.getByRole('button', {  name: /play again!/i})
    expect(playAgain).toBeInTheDocument()

    userEvent.click(playAgain)
    expect(history.location.pathname).toBe('/')

  });
})