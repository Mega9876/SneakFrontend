import { Component, ElementRef, computed, inject, signal, viewChild } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface AdminSection {
  title: string;
  eyebrow: string;
  description: string;
  action: string;
  table: string;
  columns: string[];
  empty: string;
  formTitle: string;
  fields: { label: string; type: string }[];
}

const productFields = [
  { label: 'Nombre del producto', type: 'text' },
  { label: 'Marca', type: 'text' },
  { label: 'Precio (Bs)', type: 'number' },
  { label: 'Descripción', type: 'text' }
];

const sections: Record<string, AdminSection> = {
  resumen: {
    title: 'Vista general', eyebrow: 'Panel general / Sneakzone',
    description: 'Todo lo que pasa en tu tienda, en un solo lugar.',
    action: '+ Agregar producto', table: '', columns: [], empty: '',
    formTitle: 'Nuevo producto', fields: productFields
  },
  productos: {
    title: 'Productos', eyebrow: 'Catálogo / Gestión', description: 'Gestiona los modelos de tu colección.',
    action: '+ Nuevo producto', table: 'Todos los productos',
    columns: ['Producto', 'Marca', 'Precio', 'Stock', 'Estado', 'Acciones'],
    empty: 'No hay productos registrados.', formTitle: 'Nuevo producto', fields: productFields
  },
  marcas: {
    title: 'Marcas', eyebrow: 'Catálogo / Marcas', description: 'Organiza las marcas que dan identidad a tu tienda.',
    action: '+ Nueva marca', table: 'Marcas registradas', columns: ['ID', 'Marca', 'Descripción', 'Acciones'],
    empty: 'No hay marcas.', formTitle: 'Nueva marca',
    fields: [{ label: 'Nombre de la marca', type: 'text' }, { label: 'Descripción', type: 'text' }]
  },
  inventario: {
    title: 'Inventario', eyebrow: 'Almacén / Stock', description: 'Controla tus tallas y existencias en tiempo real.',
    action: '+ Registrar talla', table: 'Existencias', columns: ['Producto', 'Talla', 'Stock', 'Estado', 'Acciones'],
    empty: 'No hay registros.', formTitle: 'Registrar talla',
    fields: [{ label: 'Producto', type: 'text' }, { label: 'Talla', type: 'number' }, { label: 'Stock', type: 'number' }]
  },
  clientes: {
    title: 'Clientes', eyebrow: 'Comunidad / Clientes', description: 'Gestiona la comunidad que mueve SneakZone.',
    action: '+ Nuevo cliente', table: 'Clientes registrados', columns: ['Cliente', 'Correo', 'Teléfono', 'Dirección', 'Acciones'],
    empty: 'No hay clientes.', formTitle: 'Nuevo cliente',
    fields: [{ label: 'Nombre completo', type: 'text' }, { label: 'Correo', type: 'email' }, { label: 'Teléfono', type: 'tel' }, { label: 'Dirección', type: 'text' }]
  },
  pedidos: {
    title: 'Pedidos', eyebrow: 'Ventas / Pedidos', description: 'Revisa las ventas y gestiona las cancelaciones.',
    action: '↻ Actualizar', table: 'Historial de pedidos',
    columns: ['Pedido', 'Cliente', 'Fecha', 'Productos', 'Total', 'Estado', 'Acciones'],
    empty: 'No hay pedidos para mostrar.', formTitle: '', fields: []
  }
};

@Component({
  selector: 'app-admin-page',
  imports: [FormsModule],
  templateUrl: './admin-page.html',
  styleUrl: './admin-page.css'
})
export class AdminPage {
  private readonly route = inject(ActivatedRoute);
  private readonly data = toSignal(this.route.data, { initialValue: this.route.snapshot.data });
  protected readonly section = computed(() => this.data()['section'] as string);
  protected readonly page = computed(() => sections[this.section()]);
  protected readonly dialog = viewChild<ElementRef<HTMLDialogElement>>('editor');
  protected readonly refreshed = signal(false);
  protected query = '';
  protected filter = '';
  protected readonly stats = ['Total de variantes', 'Unidades disponibles', 'Con stock bajo (≤ 3)'];

  protected action(): void {
    if (this.section() === 'pedidos') {
      this.refreshed.set(true);
    } else {
      this.dialog()?.nativeElement.showModal();
    }
  }

  protected closeDialog(): void {
    this.dialog()?.nativeElement.close();
  }
}
