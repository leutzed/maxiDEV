import api from '../services/api';
import convertJson from '../services/xmlToJson';

class HomeController {
    async index(req, res) {
        const { xml } = req.headers;
        const requests = ['team', 'athletes'];
        const content = {};

        for (let i = 0; i < requests.length; i++) {
            if (requests[i] === 'athletes') {
                const { teamId } = await content.team;

                const response = await api.get(`${requests[i]}.php`, {
                    headers: {
                        Cookie: `xml=${xml}`,
                    },
                    params: {
                        teamid: teamId[0],
                    },
                });

                const data = await convertJson(response.data);

                content[requests[i]] = data;

                break;
            }
            const response = await api.get(`${requests[i]}.php`, {
                headers: {
                    Cookie: `xml=${xml}`,
                },
            });

            const data = await convertJson(response.data);

            content[requests[i]] = data;
        }

        return res.json(content);
    }
}

export default new HomeController();