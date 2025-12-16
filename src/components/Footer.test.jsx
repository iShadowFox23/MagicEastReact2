import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Footer from './Footer';

describe('Footer Component', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
  });

  test('renderiza los títulos principales del footer', () => {
    // Busca los encabezados <h3>
    const headings = screen.getAllByRole('heading', { level: 3 });
    const texts = headings.map(h => h.textContent);

    expect(texts).toContain('Sobre Nosotros');
    expect(texts).toContain('Categorías');
    expect(texts).toContain('Información');
    expect(texts).toContain('Servicios');
  });

  test('muestra la información de contacto', () => {
    expect(screen.getByText(/Seminario 505/i)).toBeInTheDocument();
    expect(screen.getByText(/\+56 9 0303 4567/i)).toBeInTheDocument();
    expect(screen.getByText(/contacto@magiceast.cl/i)).toBeInTheDocument();
  });

  test('tiene enlaces de categorías', () => {
    const categories = ['Ofertas', 'Mazos', 'Sobres', 'Eventos', 'Accesorios'];
    categories.forEach(cat => {
      expect(screen.getByText(cat)).toBeInTheDocument();
    });
  });

  test('contiene enlaces de navegación con react-router', () => {
    const aboutLink = screen.getByRole('link', { name: /Sobre nosotros/i });
    const blogLink = screen.getByRole('link', { name: /Blog/i });
    const loginLink = screen.getByRole('link', { name: /Mi cuenta/i });

    expect(aboutLink).toHaveAttribute('href', '/about');
    expect(blogLink).toHaveAttribute('href', '/blog');
    expect(loginLink).toHaveAttribute('href', '/login');
  });

  test('renderiza el texto promocional', () => {
    const promoText = screen.getByText(/En Magic East tenemos los mejores productos al mejor precio/i);
    expect(promoText).toBeInTheDocument();
  });
});
