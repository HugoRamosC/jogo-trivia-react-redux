import React from 'react';
import { act, screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { tokenResponse } from './helpers/token';
import { questionsResponse } from './helpers/questions';

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
  test('test login, game start and 2 player ranking', async () =>{

    localStorage.setItem('players', JSON.stringify(
      [{name: "Teago", score: 170, imgGrvtr: 0}]))

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(tokenResponse),
    });

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(questionsResponse),
    });

    const { history } = renderWithRouterAndRedux(<App/>)
    
    const email = screen.getByTestId('input-gravatar-email');
    const name = screen.getByTestId('input-player-name');
    
    
    userEvent.type(email, 'teste@teste.com')
    userEvent.type(name, 'teste')
    
    const button = screen.getByRole('button', {
      name: /entrar/i
    })
    userEvent.click(button)
    
    expect(global.fetch).toHaveBeenCalled()
    expect(global.fetch).toHaveBeenCalledTimes(1);
    
    await new Promise((r) => { setTimeout(r, 300); });

    // const question =  screen.getByTestId('question-category')
    expect(history.location.pathname).toBe('/game')
    
    for(let i = 0; i < 5; i++){
      const time = screen.getByTestId('timer')
      expect(time.innerHTML).toBe('30')
      expect(screen.getByTestId('correct-answer')).toBeInTheDocument();
      expect(screen.getAllByTestId(/wrong-answer/i)[0]).toBeInTheDocument();
      userEvent.click(screen.getAllByTestId(/wrong-answer/i)[0])
      userEvent.click(screen.getByTestId('btn-next'))
    }
    userEvent.click(screen.getByTestId('btn-ranking'))
    expect(screen.getByText('teste')).toBeInTheDocument();
    userEvent.click(screen.getByTestId('btn-go-home'))

    await new Promise((r) => { setTimeout(r, 300); });

    expect(history.location.pathname).toBe('/')
  })
})