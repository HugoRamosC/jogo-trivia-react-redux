import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Testa a funcionalidade da Login Page', () => {
  const { history } = renderWithRouterAndRedux(<App />);

  test('Verifica endereço de url inicial', () => {
    expect(history.location.pathname).toBe('/');
  });

  test('Verifica se input de email e senha aparece na tela e conseguimos escrever neles', () => {
    renderWithRouterAndRedux(<App />);
    const email = screen.getByTestId('input-gravatar-email');
    const name = screen.getByTestId('input-player-name');

    expect(email).toBeInTheDocument();
    expect(name).toBeInTheDocument();

    userEvent.type(email, 'teste@teste.com')
    userEvent.type(name, 'Bob Esponja')

  });

  test('Testa se os botões esta desativado quando esta fora dos critérios', () => {
    renderWithRouterAndRedux(<App />);
    const email = screen.getByTestId('input-gravatar-email');
    const name = screen.getByTestId('input-player-name');

    const button = screen.getByTestId('btn-play')
    expect(button).toBeDisabled()
    
    userEvent.type(email, 'teste@teste.com')
    userEvent.type(name, 'Bob Esponja')

    expect(button).not.toBeDisabled()

    const buttonSettings = screen.getByTestId('btn-settings') 
    userEvent.click(buttonSettings)
  })

  test('Teste se ao clicar em entrar a rota está correta', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const email = screen.getByTestId('input-gravatar-email');
    const name = screen.getByTestId('input-player-name');

    
    userEvent.type(email, 'teste@teste.com')
    userEvent.type(name, 'Bob Esponja')

    const button = screen.getByTestId('btn-play')
    userEvent.click(button)
    
    await waitFor(() => expect(history.location.pathname).toBe('/game'), 5000)
  });

  test('Testa se os botões esta desativado quando esta fora dos critérios', () => {
    renderWithRouterAndRedux(<App />);
    const email = screen.getByTestId('input-gravatar-email');
    const name = screen.getByTestId('input-player-name');
    const button = screen.getByTestId('btn-play')

    userEvent.type(email, 'teste@teste.com')
    userEvent.type(name, 'Bob Esponja')
    expect(button).not.toBeDisabled()
    
    userEvent.clear(email)
    userEvent.clear(name)

    expect(button).toBeDisabled()
  })
})