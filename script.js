document.addEventListener('DOMContentLoaded', () => {
    const hotelSelect = document.getElementById('hotel-select');
    const trailItemsDiv = document.getElementById('trail-items');

    const trailTitleMap = {
        'bubble_tea_trail': 'Bubble Tea Trail',
        'happy_hour_trail': 'Happy Hour Trail',
        'scenes_trail': 'Scenes Trail'
    };

    fetch('../nearest_items.json')
        .then(response => response.json())
        .then(data => {
            populateHotelSelect(data);
            hotelSelect.addEventListener('change', () => displayTrailItems(data));
        });

    function populateHotelSelect(data) {
        data.forEach(hotel => {
            const option = document.createElement('option');
            option.value = hotel.Hotel;
            option.textContent = hotel.Hotel;
            hotelSelect.appendChild(option);
        });
    }

    function displayTrailItems(data) {
        const selectedHotel = hotelSelect.value;
        const hotelData = data.find(hotel => hotel.Hotel === selectedHotel);

        trailItemsDiv.innerHTML = '';

        if (hotelData) {
            hotelData.NearestItems.forEach(trail => {
                const trailDiv = document.createElement('div');
                trailDiv.classList.add('trail');

                const trailTitle = document.createElement('h2');
                trailTitle.textContent = trailTitleMap[trail.Trail] || trail.Trail;
                trailDiv.appendChild(trailTitle);

                trail.Items.forEach(item => {
                    const itemDiv = document.createElement('div');
                    itemDiv.classList.add('trail-item');

                    const itemTitle = document.createElement('h3');
                    itemTitle.textContent = `${item.Name} (${item.Distance.toFixed(2)} miles)`;
                    itemDiv.appendChild(itemTitle);

                    const itemDescription = document.createElement('p');
                    itemDescription.textContent = item.Description;
                    itemDiv.appendChild(itemDescription);

                    const itemLink = document.createElement('a');
                    itemLink.href = item.Website;
                    itemLink.textContent = 'Visit Website';
                    itemLink.target = '_blank';
                    itemDiv.appendChild(itemLink);

                    trailDiv.appendChild(itemDiv);
                });

                trailItemsDiv.appendChild(trailDiv);
            });
        }
    }
});