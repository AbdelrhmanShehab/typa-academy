interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumb?: string;
}

export default function PageHeader({
  title,
  subtitle,
  breadcrumb,
}: PageHeaderProps) {
  return (
    <section
      className="geometric-bg py-16 px-4"
      style={{
        background: 'linear-gradient(135deg, #1b4332 0%, #2d6a4f 50%, #1b4332 100%)',
      }}
    >
      <div className="max-w-7xl mx-auto">
        {breadcrumb && (
          <p style={{ color: '#e8c24f', fontSize: '0.875rem', marginBottom: '0.75rem', opacity: 0.9 }}>
            {breadcrumb}
          </p>
        )}
        <h1
          style={{
            fontSize: 'clamp(1.75rem, 5vw, 2.5rem)',
            fontWeight: 800,
            color: '#ffffff',
            marginBottom: '0.75rem',
            textShadow: '0 2px 8px rgba(0,0,0,0.25)',
          }}
        >
          {title}
        </h1>
        {subtitle && (
          <p style={{ color: '#a8d5bb', fontSize: '1.1rem', maxWidth: '42rem', lineHeight: 1.8 }}>
            {subtitle}
          </p>
        )}
        {/* Gold accent */}
        <div style={{ display: 'flex', marginTop: '1.25rem', gap: '4px' }}>
          <div style={{ height: 4, width: 64, background: '#e8c24f', borderRadius: 9999 }} />
          <div style={{ height: 4, width: 20, background: '#ffffff', opacity: 0.4, borderRadius: 9999 }} />
        </div>
      </div>
    </section>
  );
}
