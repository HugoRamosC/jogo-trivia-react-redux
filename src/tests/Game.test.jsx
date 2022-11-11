import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('tests game page', () => {
  jest.setTimeout(60000)
  const timeout = 4000

  test('test', async ()=>{
    // jest.spyOn(fetchQuestions).mockResolvedValue('2');
    const { history } = renderWithRouterAndRedux(<App/>);
  
    // registra uma pessoa um vez e entra no jogo
    userEvent.type(screen.getByTestId('input-gravatar-email'), 'calebe@gmail.com');
    userEvent.type(screen.getByTestId('input-player-name'), 'calebe');
    userEvent.click(screen.getByTestId('btn-play'));
  
    // espera carregar a página de game
    await waitFor(
      () => {
        expect(screen.getByTestId('correct-answer')).toBeInTheDocument();
        expect(screen.getAllByTestId(/wrong-answer/i)[0]).toBeInTheDocument();
      },
      { timeout: timeout },
    );
  
    // 1 acerta as 5 perguntas
    userEvent.click(screen.getByTestId('correct-answer'));
    userEvent.click(await screen.findByTestId('btn-next'));
    await waitFor(
      () => {
        expect(screen.getByTestId('correct-answer')).toBeInTheDocument();
        expect(screen.getAllByTestId(/wrong-answer/i)[0]).toBeInTheDocument();
      },
      { timeout: timeout },
      );
  
      userEvent.click(screen.getByTestId('correct-answer'));
      userEvent.click(await screen.findByTestId('btn-next'));
      await waitFor(
        () => {
          expect(screen.getByTestId('correct-answer')).toBeInTheDocument();
          expect(screen.getAllByTestId(/wrong-answer/i)[0]).toBeInTheDocument();
        },
        { timeout: timeout },
      );
  
      userEvent.click(screen.getByTestId('correct-answer'));
      userEvent.click(await screen.findByTestId('btn-next'));
      await waitFor(
        () => {
          expect(screen.getByTestId('correct-answer')).toBeInTheDocument();
          expect(screen.getAllByTestId(/wrong-answer/i)[0]).toBeInTheDocument();
        },
        { timeout: timeout },
      );
  
      userEvent.click(screen.getByTestId('correct-answer'));
      userEvent.click(await screen.findByTestId('btn-next'));
      await waitFor(
        () => {
          expect(screen.getByTestId('correct-answer')).toBeInTheDocument();
          expect(screen.getAllByTestId(/wrong-answer/i)[0]).toBeInTheDocument()
        },
        { timeout: timeout },
      );
  
      userEvent.click(screen.getByTestId('correct-answer'));
      userEvent.click(await screen.findByTestId('btn-next'));
      
      // acessa a página de ranking
      const btnRanking = await screen.findByTestId('btn-ranking');
      // console.log(history.location.pathName)
      userEvent.click(btnRanking);
  
      const user = screen.getByRole('heading', { name: /calebe/i });
      expect(user).toBeInTheDocument();

      const playAgain = screen.getByTestId('btn-go-home');
      userEvent.click(playAgain)


    userEvent.type(screen.getByTestId('input-gravatar-email'), 'teste@test.com');
    userEvent.type(screen.getByTestId('input-player-name'), 'teste');
    userEvent.click(screen.getByTestId('btn-play'));
  
    // espera carregar a página de game
    await waitFor(
      () => {
        expect(screen.getByTestId('correct-answer')).toBeInTheDocument();
        expect(screen.getAllByTestId(/wrong-answer/i)[0]).toBeInTheDocument();
      },
      { timeout: timeout },
    );
  
    // 1 acerta as 5 perguntas
    userEvent.click(screen.getByTestId('correct-answer'));
    userEvent.click(await screen.findByTestId('btn-next'));
    await waitFor(
      () => {
        expect(screen.getByTestId('correct-answer')).toBeInTheDocument();
        expect(screen.getAllByTestId(/wrong-answer/i)[0]).toBeInTheDocument();
      },
      { timeout: timeout },
      );
  
      userEvent.click(screen.getByTestId('correct-answer'));
      userEvent.click(await screen.findByTestId('btn-next'));
      await waitFor(
        () => {
          expect(screen.getByTestId('correct-answer')).toBeInTheDocument();
          expect(screen.getAllByTestId(/wrong-answer/i)[0]).toBeInTheDocument();
        },
        { timeout: timeout },
      );
  
      userEvent.click(screen.getByTestId('correct-answer'));
      userEvent.click(await screen.findByTestId('btn-next'));
      await waitFor(
        () => {
          expect(screen.getByTestId('correct-answer')).toBeInTheDocument();
          expect(screen.getAllByTestId(/wrong-answer/i)[0]).toBeInTheDocument();
        },
        { timeout: timeout },
      );
  
      userEvent.click(screen.getByTestId('correct-answer'));
      userEvent.click(await screen.findByTestId('btn-next'));
      await waitFor(
        () => {
          expect(screen.getByTestId('correct-answer')).toBeInTheDocument();
          expect(screen.getAllByTestId(/wrong-answer/i)[0]).toBeInTheDocument()
        },
        { timeout: timeout },
      );
  
      userEvent.click(screen.getByTestId('correct-answer'));
      userEvent.click(await screen.findByTestId('btn-next'));
      
      // acessa a página de ranking
      // console.log(history.location.pathName)
      const btnRanking2 = await screen.findByTestId('btn-ranking');
      userEvent.click(btnRanking2);

      const user1 = screen.getByText(/calebe/i );
      const user2 = screen.getByText(/teste/i );
      expect(user1).toBeInTheDocument();
      expect(user2).toBeInTheDocument();
  
    });
    test('simulate 30 secs waiting', async () => {
      renderWithRouterAndRedux(<App/>);  
      // registra uma pessoa um vez e entra no jogo
      userEvent.type(screen.getByTestId('input-gravatar-email'), 'teste@teste.com');
    userEvent.type(screen.getByTestId('input-player-name'), 'teste');
    userEvent.click(screen.getByTestId('btn-play'));
    
    // espera carregar a página de game
    await waitFor(
      () => {
        expect(screen.getByTestId('correct-answer')).toBeDisabled();
        expect(screen.getAllByTestId(/wrong-answer/i)[0]).toBeDisabled();
        expect(screen.getByText(/tempo esgotado/i)).toBeInTheDocument;
      },
      { timeout: 35000 },
    );
    })
})
