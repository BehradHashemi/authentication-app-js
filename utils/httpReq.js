const base_url = 'https://fakestoreapi.com';

const postData = async (path, data) => {
    try {
        const response = await fetch(`${base_url}/${path}`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const json = await response.json();
        return json;
    } catch (error) {
        alert('An error occur!')
    }
};

const getData = async (path) => {
    try {
        const response = await fetch(`${base_url}/${path}`)

        const json = await response.json();

        return json;
    } catch (error) {
        alert('Please reload site <3')
    }
}


export { postData, getData };
