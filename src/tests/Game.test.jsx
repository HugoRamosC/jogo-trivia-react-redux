import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { questionsResponse, invalidTokenQuestionsResponse } from './helpers/questions';
import { tokenResponse, invalidTokenResponse } from './helpers/token';

describe('Tests Game Page', () => {
  jest.setTimeout(60000)
  beforeEach(() => {
    
  });

  afterEach(() => {
    localStorage.clear();
    jest.clearAllMocks()
  })

  const player1 = 'Goku'
  const player2 = 'Vegeta'
  const email1 = 'goku@gmail.com'
  const email2 = 'vegeta@gmail.com'

  const state = {
    player: {
      name: player1,
      assertions: 0,
      score: 0,
      gravatarEmail: email1
    },
    time: {
      timeIsOver: false,
      timerValue: 30,
      resetTimer: false
    }
  }
  

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
    
    
    userEvent.type(email, email1)
    userEvent.type(name, player1)
    
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
    expect(screen.getByText(player1)).toBeInTheDocument();
    userEvent.click(screen.getByTestId('btn-go-home'))

    await new Promise((r) => { setTimeout(r, 300); });

    expect(history.location.pathname).toBe('/')
  })
  test('test login, game start and 1 player ranking', async () =>{

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
    
    
    userEvent.type(email, email1)
    userEvent.type(name, player1)
    
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
      userEvent.click(screen.getByTestId('correct-answer'))
      userEvent.click(screen.getByTestId('btn-next'))
    }
    userEvent.click(screen.getByTestId('btn-ranking'))
    expect(screen.getByText(player1)).toBeInTheDocument();
    userEvent.click(screen.getByTestId('btn-go-home'))

    await new Promise((r) => { setTimeout(r, 300); });

    expect(history.location.pathname).toBe('/')
  })
  test('simulate 30 secs waiting', async () => {
    
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(tokenResponse),
    });

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(questionsResponse),
    });

    renderWithRouterAndRedux(<App/>);  
    // registra uma pessoa um vez e entra no jogo
    userEvent.type(screen.getByTestId('input-gravatar-email'), 'teste@teste.com');
    userEvent.type(screen.getByTestId('input-player-name'), 'teste');
    userEvent.click(screen.getByTestId('btn-play'));
  
  await waitFor(
    () => {
      expect(screen.getByTestId('correct-answer')).toBeDisabled();
      expect(screen.getAllByTestId(/wrong-answer/i)[0]).toBeDisabled();
      expect(screen.getByText(/tempo esgotado/i)).toBeInTheDocument;
    },
    { timeout: 32000 },
  );
  })

  test('test button Play Again', async () => {

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(tokenResponse),
    });

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(questionsResponse),
    });

    renderWithRouterAndRedux(<App />);
    // registra uma pessoa um vez e entra no jogo
    userEvent.type(screen.getByTestId('input-gravatar-email'), 'teste@teste.com');
    userEvent.type(screen.getByTestId('input-player-name'), 'teste');
    userEvent.click(screen.getByTestId('btn-play'));

    // espera carregar a página de game
    await new Promise((r) => { setTimeout(r, 300); });


        const btnPlayAgain = screen.getByRole('button', { name: /play again/i })
        expect(btnPlayAgain).toBeDefined();
        userEvent.click(btnPlayAgain);
        expect(screen.getByRole('banner')).toBeDefined();
  })

  test('test button Play Again', async () => {

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(invalidTokenResponse),
    });

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(invalidTokenQuestionsResponse),
    });

    const { history } = renderWithRouterAndRedux(<App />);
    
    userEvent.type(screen.getByTestId('input-gravatar-email'), 'teste@teste.com');
    userEvent.type(screen.getByTestId('input-player-name'), 'teste');
    userEvent.click(screen.getByTestId('btn-play'));
    
    // espera carregar a página de game
    await new Promise((r) => { setTimeout(r, 300); });
    
    expect(history.location.pathname).toBe('/');
  });
});
