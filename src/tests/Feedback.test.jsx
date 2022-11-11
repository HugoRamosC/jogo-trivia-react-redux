import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import userEvent from '@testing-library/user-event';
import App from '../App';
import Ranking from '../pages/Ranking';
import Game from '../pages/Game';

describe('Testa a funcionalidade da Ranking Page', () => {
  test('Teste se ao clicar em Ranking a rota está correta', async () => {
    const { history } =renderWithRouterAndRedux(<Game />);

    const button = screen.getByTestId('btn-ranking')
    userEvent.click(button)
    expect(history.location.pathname).toBe('/ranking')
  });

  test('Teste se ao clicar em Ranking a rota está correta', async () => {
    const { history } =renderWithRouterAndRedux(<Game />);

    const button = screen.getByTestId('btn-ranking')
    userEvent.click(button)
    expect(history.location.pathname).toBe('/ranking')
  });
});