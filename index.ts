import { Api } from './src/api/api';
import './src/helpers/console.overrides';
import { App } from './src/helpers/app';

class SampleApp extends App {
  constructor() {
    super(true);
  }

  async init() {
    Api.init();
  }
}

App.run(SampleApp);
