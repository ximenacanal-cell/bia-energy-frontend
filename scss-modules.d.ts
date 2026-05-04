import React, { useState, useEffect, useCallback } from 'react';
import {
  clientesApi,
  productosApi,
  Cliente,
  Producto,
  NuevoCliente,
  NuevoProducto,
} from '../../../../services/api';
import styles from './NotificationsPage.module.scss';

// ─── Tipos locales ────────────────────────────────────────────────────────────

type Tab = 'clientes' | 'productos';
type Status = 'idle' | 'loading' | 'success' | 'error';

// ─── Componentes pequeños ──────────────────────────────────────────────────────

const Badge: React.FC<{ label: string; color: 'green' | 'blue' | 'red' | 'gray' | 'orange' }> = ({
  label,
  color,
}) => {
  const colors = {
    green: { bg: '#dff9ed', text: '#00a86c' },
    blue: { bg: '#dce8fb', text: '#1662e5' },
    red: { bg: '#ffe3e3', text: '#c43333' },
    gray: { bg: '#f0f1fa', text: '#6d7193' },
    orange: { bg: '#ffede3', text: '#c46833' },
  };
  const c = colors[color];
  return (
    <span
      style={{
        display: 'inline-block',
        padding: '2px 10px',
        borderRadius: 99,
        fontSize: 12,
        fontWeight: 600,
        background: c.bg,
        color: c.text,
        letterSpacing: '0.01em',
      }}
    >
      {label}
    </span>
  );
};

const Skeleton: React.FC<{ rows?: number }> = ({ rows = 5 }) => (
  <div style={{ padding: '0 24px' }}>
    {Array.from({ length: rows }).map((_, i) => (
      <div
        key={i}
        style={{
          height: 56,
          borderRadius: 8,
          background: 'linear-gradient(90deg, #f0f1fa 25%, #e8e9f5 50%, #f0f1fa 75%)',
          backgroundSize: '200% 100%',
          animation: 'shimmer 1.4s infinite',
          marginBottom: 8,
          opacity: 1 - i * 0.15,
        }}
      />
    ))}
  </div>
);

const EmptyState: React.FC<{ onAdd: () => void; tipo: string }> = ({ onAdd, tipo }) => (
  <div
    style={{
      textAlign: 'center',
      padding: '60px 24px',
      color: '#6d7193',
    }}
  >
    <div style={{ fontSize: 48, marginBottom: 12 }}>📭</div>
    <p style={{ margin: '0 0 4px', fontSize: 16, fontWeight: 600, color: '#20222e' }}>
      Sin {tipo} todavía
    </p>
    <p style={{ margin: '0 0 20px', fontSize: 14 }}>
      Agrega el primer registro para empezar.
    </p>
    <button className={styles.btnPrimary} onClick={onAdd}>
      + Agregar {tipo.slice(0, -1)}
    </button>
  </div>
);

const ErrorBanner: React.FC<{ message: string; onRetry: () => void }> = ({ message, onRetry }) => (
  <div
    style={{
      margin: '16px 24px',
      padding: '14px 16px',
      background: '#ffe3e3',
      borderRadius: 8,
      borderLeft: '4px solid #ff4242',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 12,
    }}
  >
    <span style={{ color: '#661a1a', fontSize: 14, fontWeight: 500 }}>⚠️ {message}</span>
    <button
      onClick={onRetry}
      style={{
        background: 'none',
        border: '1px solid #ff4242',
        borderRadius: 6,
        padding: '4px 12px',
        color: '#c43333',
        fontSize: 13,
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        fontWeight: 600,
      }}
    >
      Reintentar
    </button>
  </div>
);

// ─── Modal Crear Cliente ───────────────────────────────────────────────────────

const ModalCliente: React.FC<{
  onClose: () => void;
  onCreated: (c: Cliente) => void;
}> = ({ onClose, onCreated }) => {
  const [form, setForm] = useState({ nombre: '', email: '', telefono: '', ciudad: '' });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nombre.trim() || !form.email.trim()) {
      setError('Nombre y email son obligatorios');
      return;
    }
    setSaving(true);
    setError('');
    try {
      const nuevo = await clientesApi.create(form);
      onCreated(nuevo);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Error al crear cliente');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <span>Nuevo cliente</span>
          <button className={styles.closeBtn} onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className={styles.modalBody}>
          {error && (
            <div className={styles.formError}>{error}</div>
          )}

          <label className={styles.label}>
            Nombre <span style={{ color: '#ff4242' }}>*</span>
            <input
              className={styles.input}
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              placeholder="Ej: Empresa Solar S.A."
              autoFocus
            />
          </label>

          <label className={styles.label}>
            Email <span style={{ color: '#ff4242' }}>*</span>
            <input
              className={styles.input}
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="contacto@empresa.com"
            />
          </label>

          <div className={styles.row2}>
            <label className={styles.label}>
              Teléfono
              <input
                className={styles.input}
                name="telefono"
                value={form.telefono}
                onChange={handleChange}
                placeholder="+57 300 000 0000"
              />
            </label>
            <label className={styles.label}>
              Ciudad
              <input
                className={styles.input}
                name="ciudad"
                value={form.ciudad}
                onChange={handleChange}
                placeholder="Bogotá"
              />
            </label>
          </div>

          <div className={styles.modalFooter}>
            <button type="button" className={styles.btnSecondary} onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className={styles.btnPrimary} disabled={saving}>
              {saving ? 'Guardando...' : 'Crear cliente'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ─── Modal Crear Producto ──────────────────────────────────────────────────────

const ModalProducto: React.FC<{
  onClose: () => void;
  onCreated: (p: Producto) => void;
}> = ({ onClose, onCreated }) => {
  const [form, setForm] = useState({ nombre: '', precio: '', stock: '', categoria: '' });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nombre.trim() || !form.precio) {
      setError('Nombre y precio son obligatorios');
      return;
    }
    setSaving(true);
    setError('');
    try {
      const payload: NuevoProducto = {
        nombre: form.nombre,
        precio: parseFloat(form.precio),
        stock: parseInt(form.stock) || 0,
        categoria: form.categoria || undefined,
      };
      const nuevo = await productosApi.create(payload);
      onCreated(nuevo);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Error al crear producto');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <span>Nuevo producto</span>
          <button className={styles.closeBtn} onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className={styles.modalBody}>
          {error && <div className={styles.formError}>{error}</div>}

          <label className={styles.label}>
            Nombre <span style={{ color: '#ff4242' }}>*</span>
            <input
              className={styles.input}
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              placeholder="Ej: Panel Solar 400W"
              autoFocus
            />
          </label>

          <label className={styles.label}>
            Categoría
            <input
              className={styles.input}
              name="categoria"
              value={form.categoria}
              onChange={handleChange}
              placeholder="Ej: Equipos, Servicios..."
            />
          </label>

          <div className={styles.row2}>
            <label className={styles.label}>
              Precio (COP) <span style={{ color: '#ff4242' }}>*</span>
              <input
                className={styles.input}
                name="precio"
                type="number"
                min="0"
                step="0.01"
                value={form.precio}
                onChange={handleChange}
                placeholder="0.00"
              />
            </label>
            <label className={styles.label}>
              Stock
              <input
                className={styles.input}
                name="stock"
                type="number"
                min="0"
                value={form.stock}
                onChange={handleChange}
                placeholder="0"
              />
            </label>
          </div>

          <div className={styles.modalFooter}>
            <button type="button" className={styles.btnSecondary} onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className={styles.btnPrimary} disabled={saving}>
              {saving ? 'Guardando...' : 'Crear producto'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ─── Tabla Clientes ────────────────────────────────────────────────────────────

const TablaClientes: React.FC<{
  clientes: Cliente[];
  onDelete: (id: number) => void;
}> = ({ clientes, onDelete }) => (
  <div className={styles.tableWrapper}>
    <table className={styles.table}>
      <thead>
        <tr>
          <th>#</th>
          <th>Nombre</th>
          <th>Email</th>
          <th>Teléfono</th>
          <th>Ciudad</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {clientes.map((c) => (
          <tr key={c.id}>
            <td className={styles.tdMuted}>{c.id}</td>
            <td className={styles.tdStrong}>{c.nombre}</td>
            <td>{c.email}</td>
            <td className={styles.tdMuted}>{c.telefono || '—'}</td>
            <td>
              {c.ciudad ? (
                <Badge label={c.ciudad} color="blue" />
              ) : (
                <span className={styles.tdMuted}>—</span>
              )}
            </td>
            <td>
              <button
                className={styles.btnDanger}
                onClick={() => onDelete(c.id)}
                title="Eliminar"
              >
                🗑
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// ─── Tarjetas Productos ────────────────────────────────────────────────────────

const TarjetasProductos: React.FC<{
  productos: Producto[];
  onDelete: (id: number) => void;
}> = ({ productos, onDelete }) => {
  const formatPrice = (n: number) =>
    new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(n);

  const stockColor = (s: number): 'green' | 'orange' | 'red' =>
    s > 20 ? 'green' : s > 5 ? 'orange' : 'red';

  return (
    <div className={styles.cardsGrid}>
      {productos.map((p) => (
        <div key={p.id} className={styles.card}>
          <div className={styles.cardHeader}>
            <span className={styles.cardCategory}>{p.categoria || 'General'}</span>
            <button
              className={styles.btnDanger}
              onClick={() => onDelete(p.id)}
              title="Eliminar"
              style={{ fontSize: 13 }}
            >
              🗑
            </button>
          </div>
          <p className={styles.cardName}>{p.nombre}</p>
          <p className={styles.cardPrice}>{formatPrice(p.precio)}</p>
          <div className={styles.cardFooter}>
            <Badge label={`Stock: ${p.stock}`} color={stockColor(p.stock)} />
            {p.activo === false && <Badge label="Inactivo" color="gray" />}
          </div>
        </div>
      ))}
    </div>
  );
};

// ─── Página principal ──────────────────────────────────────────────────────────

const NotificationsPage: React.FC = () => {
  const [tab, setTab] = useState<Tab>('clientes');
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);

  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [productos, setProductos] = useState<Producto[]>([]);
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const fetchData = useCallback(async () => {
    setStatus('loading');
    setErrorMsg('');
    try {
      if (tab === 'clientes') {
        const data = await clientesApi.getAll();
        setClientes(data);
      } else {
        const data = await productosApi.getAll();
        setProductos(data);
      }
      setStatus('success');
    } catch (err: any) {
      setErrorMsg(err.message || 'No se pudo conectar con el servidor');
      setStatus('error');
    }
  }, [tab]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Filtrado en cliente (sin llamada extra al servidor)
  const clientesFiltrados = clientes.filter(
    (c) =>
      c.nombre.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      (c.ciudad || '').toLowerCase().includes(search.toLowerCase())
  );

  const productosFiltrados = productos.filter(
    (p) =>
      p.nombre.toLowerCase().includes(search.toLowerCase()) ||
      (p.categoria || '').toLowerCase().includes(search.toLowerCase())
  );

  const handleDeleteCliente = async (id: number) => {
    if (!window.confirm('¿Eliminar este cliente?')) return;
    try {
      await clientesApi.delete(id);
      setClientes((prev) => prev.filter((c) => c.id !== id));
    } catch (err: any) {
      alert(err.message || 'Error al eliminar');
    }
  };

  const handleDeleteProducto = async (id: number) => {
    if (!window.confirm('¿Eliminar este producto?')) return;
    try {
      await productosApi.delete(id);
      setProductos((prev) => prev.filter((p) => p.id !== id));
    } catch (err: any) {
      alert(err.message || 'Error al eliminar');
    }
  };

  const totalItems = tab === 'clientes' ? clientes.length : productos.length;
  const filteredItems =
    tab === 'clientes' ? clientesFiltrados.length : productosFiltrados.length;

  return (
    <div className={styles.page}>
      {/* ── Header ── */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.logoBox}>
            <span className={styles.logoBolt}>⚡</span>
          </div>
          <div>
            <h1 className={styles.headerTitle}>Bia Energy</h1>
            <p className={styles.headerSub}>Panel de gestión</p>
          </div>
        </div>
        <div className={styles.headerStats}>
          <div className={styles.stat}>
            <span className={styles.statNum}>{clientes.length}</span>
            <span className={styles.statLabel}>Clientes</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <span className={styles.statNum}>{productos.length}</span>
            <span className={styles.statLabel}>Productos</span>
          </div>
        </div>
      </header>

      {/* ── Contenido ── */}
      <main className={styles.main}>
        {/* Toolbar */}
        <div className={styles.toolbar}>
          {/* Tabs */}
          <div className={styles.tabs}>
            <button
              className={tab === 'clientes' ? styles.tabActive : styles.tab}
              onClick={() => { setTab('clientes'); setSearch(''); }}
            >
              👥 Clientes
              {clientes.length > 0 && (
                <span className={styles.tabBadge}>{clientes.length}</span>
              )}
            </button>
            <button
              className={tab === 'productos' ? styles.tabActive : styles.tab}
              onClick={() => { setTab('productos'); setSearch(''); }}
            >
              📦 Productos
              {productos.length > 0 && (
                <span className={styles.tabBadge}>{productos.length}</span>
              )}
            </button>
          </div>

          {/* Search + Add */}
          <div className={styles.actions}>
            <div className={styles.searchBox}>
              <span className={styles.searchIcon}>🔍</span>
              <input
                className={styles.searchInput}
                placeholder={`Buscar ${tab}...`}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {search && (
                <button className={styles.clearSearch} onClick={() => setSearch('')}>
                  ✕
                </button>
              )}
            </div>
            <button className={styles.btnPrimary} onClick={() => setShowModal(true)}>
              + Agregar
            </button>
          </div>
        </div>

        {/* Resultado búsqueda */}
        {search && status === 'success' && (
          <div className={styles.searchResult}>
            {filteredItems} de {totalItems} {tab}
          </div>
        )}

        {/* Estados */}
        {status === 'loading' && <Skeleton rows={6} />}

        {status === 'error' && (
          <ErrorBanner message={errorMsg} onRetry={fetchData} />
        )}

        {/* Datos */}
        {status === 'success' && tab === 'clientes' && (
          clientesFiltrados.length === 0 ? (
            search ? (
              <div className={styles.noResults}>Sin resultados para "{search}"</div>
            ) : (
              <EmptyState onAdd={() => setShowModal(true)} tipo="clientes" />
            )
          ) : (
            <TablaClientes clientes={clientesFiltrados} onDelete={handleDeleteCliente} />
          )
        )}

        {status === 'success' && tab === 'productos' && (
          productosFiltrados.length === 0 ? (
            search ? (
              <div className={styles.noResults}>Sin resultados para "{search}"</div>
            ) : (
              <EmptyState onAdd={() => setShowModal(true)} tipo="productos" />
            )
          ) : (
            <TarjetasProductos productos={productosFiltrados} onDelete={handleDeleteProducto} />
          )
        )}
      </main>

      {/* ── Modales ── */}
      {showModal && tab === 'clientes' && (
        <ModalCliente
          onClose={() => setShowModal(false)}
          onCreated={(c) => setClientes((prev) => [c, ...prev])}
        />
      )}
      {showModal && tab === 'productos' && (
        <ModalProducto
          onClose={() => setShowModal(false)}
          onCreated={(p) => setProductos((prev) => [p, ...prev])}
        />
      )}
    </div>
  );
};

export default NotificationsPage;
