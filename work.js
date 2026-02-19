// Smart Event Dashboard - Complete Vanilla JS Solution
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('event-form');
    const container = document.getElementById('events-container');
    const titleInput = document.getElementById('title');
    const dateInput = document.getElementById('date');
    const descInput = document.getElementById('description');

    // 1. Event Creation Form Handler
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data using different DOM methods
        const title = titleInput.textContent || titleInput.value;  // Demo textContent vs value
        const date = dateInput.value;
        const description = descInput.value;

        if (!title || !date || !description) {
            alert('Please fill all fields');
            return;
        }

        // 2. Dynamic Event Card Creation (DOM Traversal & Manipulation)
        const card = createEventCard(title, date, description);
        container.appendChild(card);  // DOM appendChild method
        
        // Clear form
        form.reset();
        titleInput.focus();
    });

    // 3. Event Delegation - Single listener for ALL future cards
    container.addEventListener('click', function(e) {
        const card = e.target.closest('.event-card');
        if (!card) return;

        // Stop event bubbling if needed
        // e.stopPropagation();

        // 4. Different button interactions
        if (e.target.classList.contains('delete-btn')) {
            if (confirm('Delete this event?')) {
                card.remove();  // Modern remove() method
            }
        } 
        else if (e.target.classList.contains('edit-btn')) {
            editEvent(card);
        } 
        else {
            // 5. Card Selection (DOM Traversal)
            selectCard(card);
        }
    });

    // Utility Functions (Clean Code)
    function createEventCard(title, date, desc) {
        const card = document.createElement('div');
        card.className = 'event-card';
        
        // Using innerHTML vs textContent demo
        card.innerHTML = `
            <h3 id="title-${Date.now()}">${escapeHtml(title)}</h3>
            <p><strong>Date:</strong> <span class="date">${date}</span></p>
            <p class="description">${escapeHtml(desc)}</p>
            <div class="event-actions">
                <button class="edit-btn">✏️ Edit</button>
                <button class="delete-btn">🗑️ Delete</button>
            </div>
        `;
        return card;
    }

    function selectCard(card) {
        // Remove all selections first (querySelectorAll traversal)
        document.querySelectorAll('.event-card').forEach(c => {
            c.classList.remove('selected');
        });
        card.classList.add('selected');
        
        // Demo innerText vs textContent
        console.log('innerText:', card.querySelector('h3').innerText);
        console.log('textContent:', card.querySelector('h3').textContent);
    }

    function editEvent(card) {
        const titleEl = card.querySelector('h3');
        const descEl = card.querySelector('.description');
        
        const newTitle = prompt('Edit title:', titleEl.textContent);
        const newDesc = prompt('Edit description:', descEl.textContent);
        
        if (newTitle !== null) {
            titleEl.textContent = newTitle;  // Safe textContent update
        }
        if (newDesc !== null) {
            descEl.innerHTML = escapeHtml(newDesc);  // Safe HTML update
        }
    }

    // Security helper (for assignment completeness)
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Bonus: Keyboard navigation (extra credit)
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            document.querySelectorAll('.event-card.selected')
                .forEach(c => c.classList.remove('selected'));
        }
    });
});