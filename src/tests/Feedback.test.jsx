import React from 'react';
import { screen, act } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Testa a funcionalidade da Ranking Page', () => {
  test('Teste se ao clicar em Ranking a rota está correta', async () => {
    const { history } =renderWithRouterAndRedux(<App />);

    act(() => 
      { history.push('/feedback'); });

    const button = screen.getByTestId('btn-ranking')
    userEvent.click(button)
    expect(history.location.pathname).toBe('/ranking')
  });

  test('Teste se ao clicar em Play Again a rota está correta', async () => {
    const { history } =renderWithRouterAndRedux(<App />);

    act(() => 
      { history.push('/feedback'); });

    const button = screen.getByTestId('btn-play-again')
    userEvent.click(button)
    expect(history.location.pathname).toBe('/')
  });
});