// Dados
const salesData = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul'],
    datasets: [
        {
            label: 'Cookies',
            data: [400, 300, 200, 278, 189, 239, 349],
            borderColor: '#D4A5A5',
            backgroundColor: 'rgba(212, 165, 165, 0.5)',
            fill: true,
            tension: 0.4
        },
        {
            label: 'Bolos',
            data: [240, 139, 980, 390, 480, 380, 430],
            borderColor: '#8FBC8F',
            backgroundColor: 'rgba(143, 188, 143, 0.5)',
            fill: true,
            tension: 0.4
        }
    ]
};

const flavorData = {
    labels: ['Chocolate', 'Baunilha', 'Morango', 'Limão'],
    datasets: [{
        data: [400, 300, 300, 200],
        backgroundColor: ['#5D4037', '#FFFDD0', '#D4A5A5', '#8FBC8F'],
        borderWidth: 0
    }]
};

// Configuração comum
const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: 'top',
            labels: {
                font: {
                    family: "'Nunito', sans-serif"
                },
                color: '#5D4037'
            }
        },
        tooltip: {
            backgroundColor: '#fff',
            titleColor: '#5D4037',
            bodyColor: '#5D4037',
            borderColor: '#E6DCC8',
            borderWidth: 1,
            padding: 10,
            displayColors: true,
            boxPadding: 4
        }
    }
};

let currentChart = null;

function initChart(type = 'line') {
    const ctx = document.getElementById('myChart').getContext('2d');

    if (currentChart) {
        currentChart.destroy();
    }

    let config;

    if (type === 'line') {
        config = {
            type: 'line',
            data: salesData,
            options: {
                ...commonOptions,
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { color: '#f0f0f0' },
                        ticks: { color: '#888' }
                    },
                    x: {
                        grid: { display: false },
                        ticks: { color: '#888' }
                    }
                }
            }
        };
    } else if (type === 'pie') {
        config = {
            type: 'pie',
            data: flavorData,
            options: commonOptions
        };
    } else if (type === 'bar') {
        config = {
            type: 'bar',
            data: {
                labels: salesData.labels,
                datasets: [
                    {
                        label: 'Cookies',
                        data: salesData.datasets[0].data,
                        backgroundColor: '#D4A5A5'
                    },
                    {
                        label: 'Bolos',
                        data: salesData.datasets[1].data,
                        backgroundColor: '#8FBC8F'
                    },
                    {
                        label: 'Tortas',
                        data: [240, 221, 229, 200, 218, 250, 210],
                        backgroundColor: '#5D4037'
                    }
                ]
            },
            options: {
                ...commonOptions,
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { color: '#f0f0f0' }
                    },
                    x: {
                        grid: { display: false }
                    }
                }
            }
        };
    }

    currentChart = new Chart(ctx, config);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar gráfico padrão
    initChart('line');

    // Controles do gráfico
    const buttons = document.querySelectorAll('.btn-control');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Atualizar estado ativo
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Mudar gráfico
            const type = btn.dataset.chart;
            initChart(type);
        });
    });

    // Smooth scroll para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
