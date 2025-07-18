// Cenová data
const pricingData = {
    monthly: {
        prices: [99, 199, 500],
        period: " / měsíc"
    },
    yearly: {
        prices: [950, 1900, 4800],
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
            
            setTimeout(() => {
                priceElement.classList.remove('price-animation');
            }, 600);
        });
        
        if (isYearly) {
            monthlyLabel.classList.remove('active');
            yearlyLabel.classList.add('active');
        } else {
            monthlyLabel.classList.add('active');
            yearlyLabel.classList.remove('active');
        }
    }
    
    toggle.addEventListener('change', function() {
        updatePrices(this.checked);
    });
    
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

// Add scroll effect to navbar
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    }
});

// AJAX odeslání formuláře
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const form = this;
    const formData = new FormData(form);
    const messageDiv = document.getElementById('form-message');

    fetch('https://formsubmit.co/ai.auto.masta@gmail.com', {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            messageDiv.style.display = 'block';
            messageDiv.style.color = '#10b981';
            messageDiv.textContent = 'Děkujeme za vaši zprávu! Ozveme se vám do 24 hodin.';
            form.reset();
            setTimeout(() => {
                messageDiv.style.display = 'none';
            }, 5000);
        } else {
            throw new Error('Chyba při odesílání formuláře');
        }
    })
    .catch(error => {
        console.error('Chyba:', error);
        messageDiv.style.display = 'block';
        messageDiv.style.color = '#e53e3e';
        messageDiv.textContent = 'Došlo k chybě při odesílání formuláře. Zkuste to znovu.';
        setTimeout(() => {
            messageDiv.style.display = 'none';
        }, 5000);
    });
});
