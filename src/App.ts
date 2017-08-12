import * as express from 'express';
import * as bodyParser from 'body-parser';
import Config from './Config';
import Deps from './Deps';
import ApiRouter from './ApiRouter';

export default class App {
  public express: express.Application;
  private config: Config;

  constructor() {
    this.express = express();
    this.config = new Config();
    const deps = new Deps(this.config);
    this.middleware();
    this.routes(deps);
  }

  private middleware(): void {
    this.express.use(bodyParser.json());
  }

  private routes(deps: Deps): void {
    this.express.use('/', new ApiRouter(deps).router);
  }

  public start(): void {
    this.express.listen(this.config.port, () => {
      console.log(`API running on http://localhost:${this.config.port}`)
    })
  }
}