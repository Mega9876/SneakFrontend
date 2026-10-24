import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { provideRouter, Router } from '@angular/router';
import { routes } from './app.routes';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter(routes)],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the Sneakzone landing page', async () => {
    const fixture = TestBed.createComponent(App);
    await TestBed.inject(Router).navigateByUrl('/');
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toBe('MOVEYOURWORLD.');
    expect(compiled.querySelector('nav')?.textContent).toContain('Colección');
    expect(compiled.querySelector('.primary-link')?.getAttribute('href')).toBe('/coleccion');
  });

  it('should navigate through administration and return to the storefront', async () => {
    const fixture = TestBed.createComponent(App);
    const router = TestBed.inject(Router);
    const compiled = fixture.nativeElement as HTMLElement;

    for (const [path, title] of [
      ['', 'Vista general.'], ['productos', 'Productos.'], ['marcas', 'Marcas.'],
      ['inventario', 'Inventario.'], ['clientes', 'Clientes.'], ['pedidos', 'Pedidos.']
    ]) {
      await router.navigateByUrl('/administracion' + (path ? '/' + path : ''));
      await fixture.whenStable();
      expect(compiled.querySelector('h1')?.textContent).toBe(title);
      expect(compiled.querySelectorAll('.sidebar nav .active').length).toBe(1);
      expect(compiled.querySelector('.footer')).toBeNull();
      if (path) {
        expect(compiled.querySelector('table tbody')?.textContent).toContain('No hay');
      }
      if (path === 'inventario') {
        expect(compiled.querySelectorAll('.stat').length).toBe(3);
      }
    }

    compiled.querySelector<HTMLAnchorElement>('.sidebar-bottom a')!.click();
    await fixture.whenStable();
    expect(router.url).toBe('/');
    expect(compiled.querySelector('.sidebar')).toBeNull();
    expect(compiled.querySelector('.footer')).not.toBeNull();
  });

  it('should open the collection and reset its filters', async () => {
    const fixture = TestBed.createComponent(App);
    const router = TestBed.inject(Router);
    await router.navigateByUrl('/coleccion');
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toBe('THECOLLECTION.');
    expect(compiled.querySelector('nav .active')?.textContent).toBe('Colección');
    expect(compiled.querySelector('.empty-state')?.textContent).toContain('No hay productos disponibles');

    const input = compiled.querySelector<HTMLInputElement>('#buscar')!;
    input.value = 'Air';
    input.dispatchEvent(new Event('input'));
    compiled.querySelector('form')!.dispatchEvent(new Event('submit', { cancelable: true }));
    await fixture.whenStable();
    expect(compiled.querySelector('.empty-state')?.textContent).toContain('Prueba con otra búsqueda');

    compiled.querySelector<HTMLButtonElement>('.empty-state button')!.click();
    await fixture.whenStable();
    expect(input.value).toBe('');
    expect(compiled.querySelector('.empty-state')?.textContent).toContain('Estamos preparando');
  });
});
