// Cenová data
const pricingData = {
    monthly: {
        prices: [99, 199, 500],
        period: " / měsíc"
    },
    yearly: {
        prices: [950, 1900, 4800], // 20% sleva z (99*12, 199*12, 500*12)
        period: " / rok"
    }
};

// Inicializace přepínače
document.addEventListener('DOMContentLoaded', function() {
    const toggle = document.getElementById('pricing-toggle');
    const monthlyLabel = document.getElementById('monthly-label');
    const yearlyLabel = document.getElementById('yearly-label');
    const priceElements = document.querySelectorAll('.price');
    
    function updatePrices(isYearly) {
        const currentData = isYearly ? pricingData.yearly : pricingData.monthly;
        
        priceElements.forEach((priceElement, index) => {
            const monthlySpan = priceElement.querySelector('.price-monthly');
            const yearlySpan = priceElement.querySelector('.price-yearly');
            const periodSpan = priceElement.querySelector('.price-period');
            
            // Animace změny ceny
            priceElement.classList.add('price-animation');
            
            if (isYearly) {
                monthlySpan.style.display = 'none';
                yearlySpan.style.display = 'inline';
                yearlySpan.textContent = currentData.prices[index].toLocaleString();
            } else {
                monthlySpan.style.display = 'inline';
                yearlySpan.style.display = 'none';
                monthlySpan.textContent = currentData.prices[index];
            }
            
            periodSpan.textContent = currentData.period;
            
            // Odstranění animace po dokončení
            setTimeout(() => {
                priceElement.classList.remove('price-animation');
            }, 600);
        });
        
        // Aktualizace labelů
        if (isYearly) {
            monthlyLabel.classList.remove('active');
            yearlyLabel.classList.add('active');
        } else {
            monthlyLabel.classList.add('active');
            yearlyLabel.classList.remove('active');
        }
    }
    
    // Event listener pro přepínač
    toggle.addEventListener('change', function() {
        updatePrices(this.checked);
    });
    
    // Možnost kliknutí na labely
    monthlyLabel.addEventListener('click', function() {
        if (toggle.checked) {
            toggle.checked = false;
            updatePrices(false);
        }
    });
    
    yearlyLabel.addEventListener('click', function() {
        if (!toggle.checked) {
            toggle.checked = true;
            updatePrices(true);
        }
    });
    
    // Nastavení výchozího stavu
    updatePrices(false);
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form submission
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Děkujeme za vaši zprávu! Ozveme se vám co nejdříve.');
    this.reset();
});

// Add scroll effect to navbar
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    }
});