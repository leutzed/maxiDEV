import api from '../services/api';
import xmlToJson from '../services/xmlToJson';

class LoginController {
    async index(request, response) {
        const { user, scode } = request.body;
        if (!user || !scode) {
            return response.json({ error: 'User or Code is null' });
        }
        const apiResponse = await api.get('login.php', {
            params: {
                user,
                scode,
            },
        });

        const dados = Object.values(apiResponse.headers);
        const str = dados[7];
        const string = str[0];
        const cookie = string.split(';');
        const key = cookie[0].split('=');

        const data = await xmlToJson(apiResponse.data);
        data.xml = key[1];

        return response.json(data);
    }
}

export default new LoginController();