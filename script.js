document.addEventListener('DOMContentLoaded', function() {
    const ipv4Element = document.getElementById('ipv4-address');
    const ipv6Element = document.getElementById('ipv6-address');
    const ipv4Indicator = document.getElementById('ipv4-indicator');
    const ipv6Indicator = document.getElementById('ipv6-indicator');
    const userAgentElement = document.getElementById('user-agent');
    const locationElement = document.getElementById('location');
    const ispElement = document.getElementById('isp');
    const refreshButton = document.getElementById('refresh-button');
    const refreshCatsButton = document.getElementById('refresh-cats');
    const cat1 = document.getElementById('cat1');
    const cat2 = document.getElementById('cat2');
    const cat3 = document.getElementById('cat3');

    async function getIpInfo() {
        try {
            const ipv4Response = await fetch('https://api.ipify.org?format=json');
            const ipv4Data = await ipv4Response.json();
            ipv4Element.textContent = ipv4Data.ip || 'Not available';
            ipv4Indicator.className = 'indicator active';
        } catch (error) {
            ipv4Element.textContent = 'Not available';
            ipv4Indicator.className = 'indicator inactive';
        }

        try {
            const ipv6Response = await fetch('https://api64.ipify.org?format=json');
            const ipv6Data = await ipv6Response.json();
            
            if (ipv6Data.ip && ipv6Data.ip.includes(':')) {
                ipv6Element.textContent = ipv6Data.ip;
                ipv6Indicator.className = 'indicator active';
            } else {
                ipv6Element.textContent = 'Not available';
                ipv6Indicator.className = 'indicator inactive';
            }
        } catch (error) {
            ipv6Element.textContent = 'Not available';
            ipv6Indicator.className = 'indicator inactive';
        }

        userAgentElement.textContent = `User Agent: ${navigator.userAgent}`;

        try {
            const detailsResponse = await fetch('https://ipinfo.io/json');
            const detailsData = await detailsResponse.json();
            
            if (detailsData.city && detailsData.country) {
                locationElement.textContent = `Location: ${detailsData.city}, ${detailsData.region}, ${detailsData.country}`;
            } else {
                locationElement.textContent = 'Location: Not available';
            }
            
            if (detailsData.org) {
                ispElement.textContent = `ISP: ${detailsData.org}`;
            } else {
                ispElement.textContent = 'ISP: Not available';
            }
        } catch (error) {
            locationElement.textContent = 'Location: Not available';
            ispElement.textContent = 'ISP: Not available';
        }
    }

    async function getRandomCats() {
        const catElements = [cat1, cat2, cat3];
        
        for (const element of catElements) {
            element.src = "loading.gif";
        }
        
        try {
            for (const element of catElements) {
                const response = await fetch('https://api.thecatapi.com/v1/images/search');
                const data = await response.json();
                if (data && data[0] && data[0].url) {
                    element.src = data[0].url;
                }
            }
        } catch (error) {
            for (const element of catElements) {
                if (!element.src || element.src === "loading.gif") {
                    element.src = "error.png";
                }
            }
        }
    }

    getIpInfo();
    getRandomCats();

    refreshButton.addEventListener('click', function() {
        ipv4Element.textContent = 'Checking...';
        ipv6Element.textContent = 'Checking...';
        userAgentElement.textContent = 'User Agent: Checking...';
        locationElement.textContent = 'Location: Checking...';
        ispElement.textContent = 'ISP: Checking...';
        
        ipv4Indicator.className = 'indicator';
        ipv6Indicator.className = 'indicator';
        
        getIpInfo();
    });

    refreshCatsButton.addEventListener('click', getRandomCats);
});
