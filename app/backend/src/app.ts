import * as express from 'express';
import errorMiddleware from './database/Utils/errorMiddleware';
import UserRouter from './database/routes/UserRouter';
import TeamsRouter from './database/routes/TeamsRouter';
import MatchesRouter from './database/routes/MatchesRouter';
import LeaderboardRouter from './database/routes/LeaderbordRouter';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
  }

  private config(): void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(accessControl);

    this.app.use(UserRouter);
    this.app.use(TeamsRouter);
    this.app.use(MatchesRouter);
    this.app.use(LeaderboardRouter);
    this.app.use(errorMiddleware);
  }

  public start(PORT: string | number): void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
