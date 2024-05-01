import {EventEmitter} from '../components/base/events'
interface IItem {
  id: string;
  category: string;
  title: string;
  price: number;
  image: string;
  description?: string
}

interface ICatalogModel {
  items: IItem[];
  setItems(items: IItem[]): void;
  getItem(id: string): IItem;
}

class CatalogModel implements ICatalogModel {
  constructor(protected events: EventEmitter) {}
  items: IItem[];
  setItems(items: IItem[]): void {};
  getItem(id: string): IItem {return };
}

interface IUserForm {
  email: string;
  phone: string;
}

enum PaymentMethod {
  ONLINE = 'Онлайн',
  UPON_RECEIPT = 'При получении'
}

interface IOrderForm {
  adress: string;
  paymentMethod: PaymentMethod;
}

interface IBusketModel {
  items: Map<string, number>;
  add(id: string): void;
  remove(id: string): void;
}

class BusketModel implements IBusketModel {
  constructor(protected events: EventEmitter) {}
  items: Map<string, number>;
  add(id: string): void {

  }

  remove(id: string): void {

  }

  protected _changed() {
    this.events.emit('basket:change', {items: Array.from(this.items.keys)})
  }
}

interface IViewConstructor {
  new (container: HTMLElement, events?: EventEmitter): IView;
}

interface IView {
  render(data?: object): HTMLElement;
}

class BusketItemView implements IView {
  protected title: HTMLSpanElement;
  protected addButton: HTMLButtonElement;
  protected removeButton: HTMLButtonElement;

  protected id: string | null = null;

  constructor(protected container: HTMLElement, protected events: EventEmitter) {
    this.title = container.querySelector('') as HTMLSpanElement;
    this.addButton = container.querySelector('') as HTMLButtonElement;
    this.removeButton = container.querySelector('') as HTMLButtonElement;
    this.addButton.addEventListener('click', () => {
      this.events.emit('ui:basket-add', {id: this.id});
    })
    this.addButton.addEventListener('click', () => {
      this.events.emit('ui:basket-remove', {id: this.id});
    })
  }

  render(data: {id: string, title: string}) {
    if (data) {
      this.id = data.id;
      this.title.textContent = data.title;
    }
    return this.container;
   }
}

class BasketView implements IView {
  constructor(protected container: HTMLElement) {}
  render(data?: {items: HTMLElement[]}): HTMLElement {
    if(data) {
      this.container.replaceChildren(...data.items);
    }
    return this.container
  }
}

export { BasketView, BusketModel, CatalogModel }