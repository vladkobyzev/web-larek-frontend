import './scss/styles.scss';
import {ShopAPI} from './components/base/api';
import { EventEmitter } from './components/base/events';
import { BasketView, BusketModel, CatalogModel } from './types/index';


const api = new ShopAPI(process.env.API_ORIGIN);
const events = new EventEmitter();
const basketView = new BasketView(document.querySelector('.basket'));
const basketModel = new BusketModel(events);
const catalogModel = new CatalogModel(events);

api.getCatalog()
  .then(catalogModel.setItems.bind(catalogModel))
  .catch(err => console.log(err))
