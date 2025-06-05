import axios from 'axios';

export const fetchGraphQL = async (query, variables = {}) => {
    try {
        // const response = await axios.post('http://localhost/asd/public/index.php/graphql', {
        const response = await axios.post('http://ikageo.atwebpages.com/asd/public/index.php/graphql', {
            query,
            variables,
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const result = response.data;

        // not mine, tabnine
        if (result.errors) {
            throw new Error(result.errors.map(error => error.message).join('\n'));
        }
        return result.data;
    } catch (error) {
        throw new Error(error.message);
    }
};
