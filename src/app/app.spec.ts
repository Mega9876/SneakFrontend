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
