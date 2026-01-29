const WorkMethodology = () => {
    const methods = [
        {
            title: "De la Idea al Producto Final",
            desc: "Desarrollo soluciones intuitivas y atractivas, priorizando la experiencia del usuario en cada decisión de diseño."
        },
        {
            title: "Metodología Ágil",
            desc: "Trabajo con sprints iterativos, adaptándome rápidamente a cambios y nuevos requerimientos."
        },
        {
            title: "Código Limpio",
            desc: "Escribo código mantenible y escalable, siguiendo las mejores prácticas y patrones de diseño modernos."
        },
        {
            title: "Colaboración Efectiva",
            desc: "Comunicación clara y constante con el equipo y stakeholders para garantizar resultados óptimos."
        }
    ];

    return (
        <section>
            <div className="container">
                <h2 style={{ fontSize: '2.5rem', marginBottom: '3rem', textAlign: 'center' }}>
                    ¿Cómo <span className="text-gradient">trabajo?</span>
                </h2>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '2rem'
                }}>
                    {methods.map((item, index) => (
                        <div key={index} style={{
                            padding: '2rem',
                            borderLeft: '2px solid var(--accent-color)',
                            background: 'linear-gradient(to right, rgba(59,130,246,0.05), transparent)'
                        }}>
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>{item.title}</h3>
                            <p style={{ color: '#aaa' }}>{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WorkMethodology;
